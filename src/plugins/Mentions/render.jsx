import React from 'react';
import { useSelector } from 'react-redux'
import { ViewHTMLBlock } from "@plone/volto/components";

export const MentionsElement = ({ attributes, children, element, mode }) => {
  const { data = {} } = element;
  const metadata = useSelector(state => state?.content?.data || {});

  // RichText
  let output = metadata[data.mention]?.data;
  if(output) {
    output = ViewHTMLBlock({ data: { html: output }});
  } else {
    output = metadata[data.mention]?.title || metadata[data.mention];
  }

  return (
    <>
      {mode === 'view' ? (
          <span>{output}</span>
      ) : (
          <span {...attributes} className="mention">@{data.mention}</span>
      )}
    </>
  );
};
