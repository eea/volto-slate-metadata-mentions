import React from 'react';
import { useSelector } from 'react-redux';
import { widgets } from '~/config';
import { FormStateContext } from '@plone/volto/components/manage/Form/FormContext';
// import { wrapInlineMarkupText } from 'volto-slate/utils';
import { Element, Leaf } from 'volto-slate/editor/render';

export const MentionElement = ({ attributes, children, element, mode }) => {
  // children is Slate elements
  const { views } = widgets;
  const { data = {} } = element;
  const initialFormData = useSelector((state) => state?.content?.data || {});
  let metadata = { ...initialFormData };

  const context = React.useContext(FormStateContext);
  if (context) {
    const { contextData } = context;
    const { formData } = contextData;
    metadata = { ...formData };
  }

  let output = metadata[data.id];
  let Widget = views.getWidget(data);
  let className = 'metadata mention ' + data?.id;

  // Get data from FormContext
  if (!output && context) {
    className += ' empty';
    output = data?.id;
    Widget = views.getWidget({ widget: 'text' });
  }

  const blacklist = ['children', 'data', 'type'];

  const formats = Object.fromEntries(
    Object.entries(element).filter(([n]) => !blacklist.includes(n)),
  );

  return (
    <>
      {mode === 'view' ? (
        <Widget value={output} className={className}>
          {(childValue) => {
            return (
              <Leaf
                leaf={{ text: childValue, ...formats }}
                text={childValue}
                attributes={{ 'data-slate-leaf': true }}
                {...formats}
                mode="view"
              >
                {childValue}
              </Leaf>
            );
          }}
        </Widget>
      ) : (
        <span {...attributes} className="metadata mention edit">
          <Leaf
            leaf={{ text: data.id, ...formats }}
            text={data.id}
            attributes={{ 'data-slate-leaf': true }}
            {...formats}
            mode="view"
          >
            {data.id}
          </Leaf>
          {children}
        </span>
      )}
    </>
  );
};
