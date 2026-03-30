import { Icon as VoltoIcon, InlineForm } from '@plone/volto/components';
import briefcaseSVG from '@plone/volto/icons/briefcase.svg';
import checkSVG from '@plone/volto/icons/check.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import { isEqual } from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Transforms } from 'slate';
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

const getAllowedMentionKeys = ({ metadata, intl }) => {
  const schema = MentionSchema({ metadata, intl });
  return new Set(
    [...Object.keys(schema.properties || {}), metadata].filter(Boolean),
  );
};

const normalizeMentionData = ({ formData = {}, metadata, intl }) => {
  const allowedKeys = getAllowedMentionKeys({ metadata, intl });

  return Object.fromEntries(
    Object.entries(formData).filter(
      ([key, value]) => allowedKeys.has(key) && value !== undefined,
    ),
  );
};

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

  const dispatch = useDispatch();
  const [formData, setFormData] = React.useState({});

  const active = getActiveElement(editor);
  const [elementNode, elementPath] = active || [];
  const isElement = isActiveElement(editor);
  const id = elementNode?.data?.metadata || elementNode?.data?.id;
  const [editSchema, setEditSchema] = React.useState(
    MentionSchema({ metadata: id, intl }),
  );

  // Update the form data based on the current footnote
  const elRef = React.useRef(null);
  const elementPathRef = React.useRef(null);

  React.useEffect(() => {
    if (isElement && elementNode && !isEqual(elementNode, elRef.current)) {
      const currentMetadata = editor.getBlockProps
        ? editor.getBlockProps().metadata || editor.getBlockProps().properties
        : {};
      elRef.current = elementNode;
      elementPathRef.current = elementPath;
      const data = elementNode.data
        ? {
            ...elementNode.data,
            [id]: currentMetadata?.[id],
          }
        : {};
      setFormData(data);
    } else if (!isElement) {
      elRef.current = null;
      elementPathRef.current = null;
    }
  }, [editor, elementNode, elementPath, id, isElement]);

  const saveDataToEditor = React.useCallback(
    (nextFormData) => {
      const { onChangeField } = editor.getBlockProps
        ? editor.getBlockProps()
        : {}; // TODO: provide fake block props in volto-slate. onChangeField is onChange
      if (hasValue(nextFormData)) {
        const mentionData = normalizeMentionData({
          formData: nextFormData,
          metadata: nextFormData?.metadata,
          intl,
        });
        const mentionPath =
          elementPathRef.current || getActiveElement(editor)?.[1];

        if (mentionPath) {
          Transforms.setNodes(
            editor,
            { data: mentionData },
            { at: mentionPath },
          );
        } else {
          insertElement(editor, mentionData);
        }

        // Update document metadata
        if (onChangeField) {
          setTimeout(() => {
            onChangeField(
              nextFormData?.metadata,
              nextFormData?.[nextFormData?.metadata],
            );
          }, 0);
        }
      } else {
        unwrapElement(editor);
      }
    },
    [
      editor,
      getActiveElement,
      insertElement,
      unwrapElement,
      hasValue,
      intl,
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
        setFormData((currentFormData) =>
          normalizeMentionData({
            formData: {
              ...currentFormData,
              [id]: value,
              widget: getMentionWidget(value, properties[value]),
              [value]: metaData?.[value],
            },
            metadata: value,
            intl,
          }),
        );
        updateSchema(value);
      } else {
        setFormData((currentFormData) => ({
          ...currentFormData,
          [id]: value,
        }));
      }
    },
    [editor, properties, updateSchema, intl],
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
      onChangeFormData={setFormData}
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
