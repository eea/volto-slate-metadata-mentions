import React from 'react';
import { useSelector } from 'react-redux';
import { widgets } from '~/config';
import { FormStateContext } from '@plone/volto/components/manage/Form/FormContext';

export const MentionsElement = ({ children, element, mode }) => {
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
