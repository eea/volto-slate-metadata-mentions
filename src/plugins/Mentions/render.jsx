import React from 'react';
import { useSelector } from 'react-redux';
import { widgets } from '~/config';

export const MentionsElement = ({ children, element, mode }) => {
  const { views } = widgets;
  const { data = {} } = element;
  const metadata = useSelector((state) => state?.content?.data || {});

  const Widget = views.getWidget(data);
  const output = metadata[data.id];
  const className = 'metadata mention ' + data?.id;

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
