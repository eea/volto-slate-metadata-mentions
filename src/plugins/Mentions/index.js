import React from 'react';
import { withMentions } from './extensions';
import MentionsButton from './MentionsButton';

export default function install(config) {
  const { slate } = config.settings;
  slate.buttons.mentions = (props) => <MentionsButton {...props} />;

  slate.extensions = [...(slate.extensions || []), withMentions];

  slate.toolbarButtons = [...(slate.toolbarButtons || []), 'mentions'];
  slate.expandedToolbarButtons = [
    ...(slate.expandedToolbarButtons || []),
    'mentions',
  ];

  return config;
}
