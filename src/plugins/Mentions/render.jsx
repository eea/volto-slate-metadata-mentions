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
        <Widget className={className}>{output}</Widget>
      ) : (
        <span className="metadata mention edit">{children}</span>
      )}
    </>
  );
};
