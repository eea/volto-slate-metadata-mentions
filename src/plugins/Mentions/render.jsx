import React from 'react';
import { useSelector } from 'react-redux';
import { widgets } from '~/config';
// import { FormStateContext } from '@plone/volto/components/manage/Form/FormContext';
import { wrapInlineMarkupText } from 'volto-slate/utils';
import { Popup, PopupContent } from 'semantic-ui-react';
import { EditorContext } from 'slate-react/hooks/use-editor';

export const MentionElement = ({ attributes, children, element, mode }) => {
  const { views } = widgets;
  const { data = {} } = element;
  const initialFormData = useSelector((state) => state?.content?.data || {});
  let metadata = { ...initialFormData };

  // Get data from FormContext
  const editor = React.useContext(EditorContext);
  if (editor) {
    const { properties } = editor.getBlockProps();
    metadata = properties;
    // const { contextData } = context;
    // const { formData } = contextData;
    // metadata = { ...formData };
  }

  let output = metadata[data.id];
  let Widget = views.getWidget(data);
  let className = 'metadata mention ' + data?.id;

  // If edit mode and output is empty render it's id
  if (editor && !output) {
    className += ' empty';
    output = data?.id;
    Widget = views.getWidget({ widget: 'default' });
  }

  return (
    <>
      {mode === 'view' ? (
        <Widget value={output} className={className}>
          {(child) => wrapInlineMarkupText(children, (c) => child)}
        </Widget>
      ) : (
        <Popup
          wide="very"
          position="right center"
          trigger={
            <span {...attributes} className="metadata mention edit">
              {children}
            </span>
          }
        >
          <PopupContent>
            <Widget value={output} className={className} />
          </PopupContent>
        </Popup>
      )}
    </>
  );
};
