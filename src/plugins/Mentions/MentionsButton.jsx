import React from 'react';
import { useSlate } from 'slate-react';
import mentionsSVG from '@plone/volto/icons/connector.svg';

import { ToolbarButton } from 'volto-slate/editor/ui';

const MentionsButton = () => {
  const editor = useSlate();
  const [showForm, setShowForm] = React.useState(false);
  const [selection, setSelection] = React.useState(null);
  const [formData, setFormdata] = React.useState({});

  return (
    <>
      <ToolbarButton
        active={false}
        onMouseDown={() => {
          console.log(editor);
        }}
        icon={mentionsSVG}
      />
    </>
  );
};

export default MentionsButton;
