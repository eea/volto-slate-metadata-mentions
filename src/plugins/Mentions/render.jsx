import React from 'react';
import { useSelector } from 'react-redux';
import config from '@plone/volto/registry';
import { wrapInlineMarkupText } from 'volto-slate/utils';
import { Popup, PopupContent } from 'semantic-ui-react';
import { useEditorContext } from 'volto-slate/hooks';
import ErrorBoundary from './ErrorBoundary';

export const MentionElement = ({
  attributes,
  children,
  element,
  mode,
  extras = {},
}) => {
  const { views } = config.widgets;
  const { data = {} } = element;
  const initialFormData = useSelector((state) => state?.content?.data || {});
  let metadata = { ...(extras?.metadata || initialFormData) };
  const id = data?.metadata || data?.id;

  // Get data from the editor, if it exists. The editor has up to date block
  // props
  const editor = useEditorContext();

  if (editor?.getBlockProps) {
    const blockProps = editor.getBlockProps();
    metadata = blockProps.metadata || blockProps.properties || {};
  }

  let output = metadata[id];
  let Widget = views.getWidget(data);
  let className = 'metadata mention ' + id;

  // If edit mode and output is empty render it's id
  if (editor && !output) {
    className += ' empty';
    output = id;
    Widget = views.getWidget({ widget: 'default' });
  }

  return (
    <>
      {mode === 'view' ? (
        <ErrorBoundary name={id}>
          <Widget value={output} className={className}>
            {(child) => wrapInlineMarkupText(children, (c) => child)}
          </Widget>
        </ErrorBoundary>
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
            <ErrorBoundary name={id}>
              <Widget value={output} className={className} />
            </ErrorBoundary>
          </PopupContent>
        </Popup>
      )}
    </>
  );
};
