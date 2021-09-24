// import { useFormStateContext } from '@plone/volto/components/manage/Form/FormContext';
import { Icon as VoltoIcon, InlineForm } from '@plone/volto/components';
import briefcaseSVG from '@plone/volto/icons/briefcase.svg';
import checkSVG from '@plone/volto/icons/check.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import { isEqual } from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactEditor } from 'slate-react';
import { setPluginOptions } from 'volto-slate/actions';
import { MentionSchema } from './schema';
import { getMentionWidget } from './utils';

export default (props) => {
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
  const [editSchema, setEditSchema] = React.useState(MentionSchema);

  const active = getActiveElement(editor);
  const [elementNode] = active;
  const isElement = isActiveElement(editor);

  // Update the form data based on the current footnote
  const elRef = React.useRef(null);

  if (isElement && !isEqual(elementNode, elRef.current)) {
    elRef.current = elementNode;
    const data = elementNode.data
      ? {
          ...elementNode.data,
          [elementNode.data.id]: metaData?.[elementNode.data.id],
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
        insertElement(editor, { id: formData?.id, widget: formData?.widget });

        // Update document metadata
        onChangeField && onChangeField(formData?.id, formData[formData?.id]);
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

      setEditSchema({
        ...MentionSchema,
        fieldsets: [
          ...MentionSchema.fieldsets,
          {
            id: 'metadata',
            title: 'Metadata value',
            fields: extendedFields,
          },
        ],
        properties: {
          ...MentionSchema.properties,
          id: {
            ...MentionSchema.properties.id,
            choices: Object.keys(properties)
              .map((key) => {
                const val = properties[key];
                if (key !== 'id' && val?.type !== 'dict') {
                  return [key, val?.title || key];
                }
                return false;
              })
              .filter((val) => !!val),
          },
          ...extendedProperties,
        },
      });
    },
    [properties],
  );

  React.useEffect(() => {
    const metaId = elementNode?.data?.id;
    updateSchema(metaId);
  }, [updateSchema, elementNode?.data?.id]);

  const onChangeValues = React.useCallback(
    (id, value) => {
      const metaData = editor.getBlockProps
        ? editor.getBlockProps().metadata || editor.getBlockProps().properties
        : {};
      if (id === 'id') {
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
    if (!elementNode.data.id) {
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
