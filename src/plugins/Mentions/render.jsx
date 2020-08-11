import React from 'react';
import { useSelector } from 'react-redux';
import { widgets } from '~/config';
import { FormStateContext } from '@plone/volto/components/manage/Form/FormContext';
import { Leaf, Element } from 'volto-slate/editor/render';
import { Text } from 'slate';

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

  return (
    <>
      {mode === 'view' ? (
        <Widget className={className}>
          {children.map((child) =>
            React.cloneElement(child, child.props, output),
          )}
        </Widget>
      ) : (
        <span {...attributes} className="metadata mention edit">
          {children}
        </span>
      )}
    </>
  );
};
// {/* {serializeNodes(children, output)} */}
//
// const serializeNodes = (nodes, output) => {
//   // console.log('serialize', nodes, output);
//   let index = 0;
//
//   const _serializeNodes = (nodes) =>
//     (nodes || []).map((node, i) => {
//       const id = index++;
//
//       console.log('text node', node);
//       if (Text.isText(node)) {
//         return (
//           <Leaf
//             leaf={node}
//             text={node}
//             attributes={{ 'data-slate-leaf': true }}
//             mode="view"
//             key={id}
//           >
//             {output}
//           </Leaf>
//         );
//       }
//       // return _serializeNodes(node.children);
//       // console.log('node.children', node.children, node);
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
//
//   return _serializeNodes(nodes);
// };
