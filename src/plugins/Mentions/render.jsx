import React from 'react';
import { useSelector } from 'react-redux';
import { widgets } from '~/config';

export const MentionsElement = ({ children, element, mode }) => {
  const { views } = widgets;
  const { data = {} } = element;
  const metadata = useSelector((state) => state?.content?.data || {});

  const schema = { id: data.mention, ...data.properties };
  const Widget = views.getWidget(schema);
  const output = metadata[data.mention];
  const className = 'metadata mention ' + data.mention;

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
