import React from 'react';
import { withMentions } from './extensions';
import { MentionsElement } from './render';
import MentionsButton from './MentionsButton';

export default function install(config) {
  const { slate } = config.settings;
  slate.buttons.mention = (props) => <MentionsButton {...props} />;
  slate.elements.mention = MentionsElement;

  slate.extensions = [...(slate.extensions || []), withMentions];
  slate.toolbarButtons = [...(slate.toolbarButtons || []), 'mention'];
  slate.expandedToolbarButtons = [
    ...(slate.expandedToolbarButtons || []),
    'mention',
  ];

  slate.nodeTypesToHighlight.push("mention");
  return config;
}
