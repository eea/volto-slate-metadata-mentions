import React from 'react';

import { MENTION } from './constants';
import { mention_editor } from './reducers';
import { MentionElement } from './render';
import { withMention } from './extensions';
import MentionButton from './MentionButton';
import MentionContextButton from './MentionContextButton';
import MentionSidebarEditor from './MentionSidebarEditor';
import { backspaceInMention, deleteInMention } from './keyboard';

export default (config) => {
  const { slate } = config.settings;

  config.addonReducers = {
    ...config.addonReducers,
    mention_editor,
  };

  slate.buttons.mention = (props) => (
    <MentionButton {...props} title="Insert metadata" />
  );
  slate.elements.mention = MentionElement;

  slate.extensions = [...(slate.extensions || []), withMention];
  slate.toolbarButtons = [...(slate.toolbarButtons || []), 'mention'];
  slate.expandedToolbarButtons = [
    ...(slate.expandedToolbarButtons || []),
    'mention',
  ];

  slate.contextToolbarButtons.push(MentionContextButton);
  slate.persistentHelpers.push(MentionSidebarEditor);

  slate.nodeTypesToHighlight.push(MENTION);
  slate.textblockKeyboardHandlers.Backspace.push(backspaceInMention);
  slate.textblockKeyboardHandlers.Delete.push(deleteInMention);

  return config;
};
