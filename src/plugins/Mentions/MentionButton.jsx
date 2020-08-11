import React from 'react';
import { useSlate } from 'slate-react';

import mentionsSVG from '@plone/volto/icons/connector.svg';
import { ToolbarButton } from 'volto-slate/editor/ui';
import { isActiveMention, insertMention } from './utils';
import { hasRangeSelection } from 'volto-slate/utils';
import { EDITOR } from './constants';

import { useDispatch } from 'react-redux';

import './less/editor.less';

const MentionButton = () => {
  const editor = useSlate();
  const isMention = isActiveMention(editor);
  const dispatch = useDispatch();

  return (
    <>
      {hasRangeSelection(editor) && (
        <ToolbarButton
          active={isMention}
          onMouseDown={() => {
            dispatch({ type: EDITOR, show: true });
            if (!isMention) insertMention(editor, {});
          }}
          icon={mentionsSVG}
        />
      )}
    </>
  );
};

export default MentionButton;
