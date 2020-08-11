import React from 'react';
import { useSelector } from 'react-redux';
import { widgets } from '~/config';
import { FormStateContext } from '@plone/volto/components/manage/Form/FormContext';
import { Leaf, Element } from 'volto-slate/editor/render';

export const MentionElement = ({ attributes, children, element, mode }) => {
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

  if (!output && context) {
    className += ' empty';
    output = data?.id;
    Widget = views.getWidget({ widget: 'text' });
  }

  // console.log(attributes);
  // console.log(children);
  // console.log(element);
  // console.log(mode);

  return (
    <>
      {mode === 'view' ? (
        <Widget className={className}>{output}</Widget>
      ) : (
        <span {...attributes} className="metadata mention edit">
          {children}
        </span>
      )}
    </>
  );
};

// const serializeNodes = (nodes) => {
//   let index = 0;

//   const _serializeNodes = (nodes) =>
//     (nodes || []).map((node, i) => {
//       const id = index++;

//       if (Text.isText(node)) {
//         return (
//           <Leaf
//             leaf={node}
//             text={node}
//             attributes={{ 'data-slate-leaf': true }}
//             mode="view"
//             key={id}
//           >
//             {node.text}
//           </Leaf>
//         );
//       }
//       return (
//         <Element
//           element={node}
//           attributes={{ 'data-slate-node': 'element', ref: null }}
//           mode="view"
//           key={id}
//         >
//           {_serializeNodes(node.children)}
//         </Element>
//       );
//     });

//   return _serializeNodes(nodes);
// };
