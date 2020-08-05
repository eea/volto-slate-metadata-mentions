import React from 'react';
import { useSelector } from 'react-redux';
// import { ViewHTMLBlock } from "@plone/volto/components";
import { widgets } from '~/config';

export const MentionsElement = ({ children, element, mode }) => {
  const { views } = widgets;
  const { data = {} } = element;
  const metadata = useSelector((state) => state?.content?.data || {});

  const schema = { id: data.mention, ...data.properties };
  const Widget = views.getWidget(schema);
  const output = metadata[data.mention];
  const className = 'metadata mention ' + data.mention;

  // // RichText
  // let output = metadata[data.mention]?.data;

  // if(output) {
  //   output = ViewHTMLBlock({ data: { html: output }});
  // } else {
  //   output = metadata[data.mention]?.title || metadata[data.mention];
  // }

  // // Array
  // if(Array.isArray(output)) {
  //   output = output.join(", ");
  // }

  return (
    <>
      {mode === 'view' ? (
        <Widget className={className}>{output}</Widget>
      ) : (
        <span className="metadata mention edit">{children}</span>
      )}
    </>
  );
};
