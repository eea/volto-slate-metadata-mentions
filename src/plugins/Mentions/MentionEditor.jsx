import { Icon as VoltoIcon, InlineForm } from '@plone/volto/components';
import briefcaseSVG from '@plone/volto/icons/briefcase.svg';
import checkSVG from '@plone/volto/icons/check.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import { isEqual } from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactEditor } from 'slate-react';
import { setPluginOptions } from '@plone/volto-slate/actions';
import { MentionSchema } from './schema';
import { getMentionWidget } from './utils';

import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  metadataValue: {
    id: 'Metadata value',
    defaultMessage: 'Metadata value',
  },
});

const MentionEditor = (props) => {
  const {
    editor,
    pluginId,
    getActiveElement,
    isActiveElement,
    insertElement,
    unwrapElement,
    hasValue,
  } = props;

  // Get Object metadata from global state
  const properties = useSelector(
    (state) => state?.schema?.schema?.properties || {},
  );

  const intl = useIntl();

  const pid = `${editor.uid}-${pluginId}`;

  // Get formData
  // const context = useFormStateContext();
  // const { contextData, setContextData } = context;
  // const metaData = contextData.formData;
  const metaData = editor.getBlockProps
    ? editor.getBlockProps().metadata || editor.getBlockProps().properties
    : {};

  const dispatch = useDispatch();
  const [formData, setFormData] = React.useState({});

  const active = getActiveElement(editor);
  const [elementNode] = active;
  const isElement = isActiveElement(editor);
  const id = elementNode?.data?.metadata || elementNode?.data?.id;
  const [editSchema, setEditSchema] = React.useState(
    MentionSchema({ metadata: id, intl }),
  );

  // Update the form data based on the current footnote
  const elRef = React.useRef(null);

  if (isElement && !isEqual(elementNode, elRef.current)) {
    elRef.current = elementNode;
    const data = elementNode.data
      ? {
          ...elementNode.data,
          [id]: metaData?.[id],
        }
      : {};
    setFormData(data);
  } else if (!isElement) {
    elRef.current = null;
  }

  const saveDataToEditor = React.useCallback(
    (formData) => {
      const { onChangeField } = editor.getBlockProps
        ? editor.getBlockProps()
        : {}; // TODO: provide fake block props in volto-slate. onChangeField is onChange
      if (hasValue(formData)) {
        // hasValue(formData) = !!formData.footnote
        insertElement(editor, {
          metadata: formData?.metadata,
          widget: formData?.widget,
          ...formData,
        });

        // Update document metadata
        onChangeField &&
          onChangeField(formData?.metadata, formData?.[formData?.metadata]);
      } else {
        unwrapElement(editor);
      }
    },
    [
      editor,
      insertElement,
      unwrapElement,
      hasValue,
      // setContextData,
      // contextData,
      // metaData,
    ],
  );

  const updateSchema = React.useCallback(
    (metaId) => {
      const extendedFields = metaId ? [metaId] : [];
      const extendedProperties = metaId ? { [metaId]: properties[metaId] } : {};

      const baseSchema = MentionSchema({ metadata: metaId, intl });

      setEditSchema({
        ...baseSchema,
        fieldsets: [
          ...baseSchema.fieldsets,
          {
            id: 'metadata',
            title: intl.formatMessage(messages.metadataValue),
            fields: extendedFields,
          },
        ],
        properties: {
          ...baseSchema.properties,
          metadata: {
            ...baseSchema.properties.metadata,
            choices: Object.keys(properties)
              .map((key) => {
                const val = properties[key];
                return [key, val?.title || key];
              })
              .filter((val) => !!val),
          },
          ...extendedProperties,
        },
      });
    },
    [properties, intl],
  );

  React.useEffect(() => {
    updateSchema(id);
  }, [updateSchema, id]);

  const onChangeValues = React.useCallback(
    (id, value) => {
      const metaData = editor.getBlockProps
        ? editor.getBlockProps().metadata || editor.getBlockProps().properties
        : {};
      if (id === 'metadata') {
        setFormData({
          ...formData,
          [id]: value,
          widget: getMentionWidget(value, properties[value]),
          [value]: metaData?.[value],
        });
        updateSchema(value);
      } else {
        setFormData({
          ...formData,
          [id]: value,
        });
      }
    },
    [editor, properties, updateSchema, formData],
  );

  const checkForCancel = () => {
    if (!id) {
      unwrapElement(editor);
    }
  };

  return (
    <InlineForm
      schema={editSchema}
      title={editSchema.title}
      icon={<VoltoIcon size="24px" name={briefcaseSVG} />}
      onChangeField={(id, value) => {
        onChangeValues(id, value);
      }}
      formData={formData}
      headerActions={
        <>
          <button
            onClick={() => {
              saveDataToEditor(formData);
              dispatch(setPluginOptions(pid, { show_sidebar_editor: false }));
              ReactEditor.focus(editor);
            }}
          >
            <VoltoIcon size="24px" name={checkSVG} />
          </button>
          <button
            onClick={() => {
              checkForCancel();
              dispatch(setPluginOptions(pid, { show_sidebar_editor: false }));
              setFormData({});
              ReactEditor.focus(editor);
            }}
          >
            <VoltoIcon size="24px" name={clearSVG} />
          </button>
        </>
      }
    />
  );
};

export default MentionEditor;
