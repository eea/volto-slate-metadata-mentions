import { defineMessages } from 'react-intl';
import { MENTION } from './constants';
import { MentionElement } from './render';
import { withMention } from './extensions';
import { MentionSchema } from './schema';
import MentionEditor from './MentionEditor';
import mentionsSVG from '@plone/volto/icons/connector.svg';
import { makeInlineElementPlugin } from 'volto-slate/components/ElementEditor';

import './less/editor.less';

const messages = defineMessages({
  edit: {
    id: 'Edit metadata',
    defaultMessage: 'Edit metadata',
  },
  delete: {
    id: 'Remove metadata',
    defaultMessage: 'Remove metadata',
  },
});

export default (config) => {
  const opts = {
    title: 'Metadata',
    pluginId: MENTION,
    pluginEditor: MentionEditor,
    elementType: MENTION,
    element: MentionElement,
    isInlineElement: true,
    editSchema: MentionSchema,
    extensions: [withMention],
    hasValue: (formData) => !!formData.id,
    toolbarButtonIcon: mentionsSVG,
    messages,
  };
  const [installMentionsEditor] = makeInlineElementPlugin(opts);
  config = installMentionsEditor(config);

  const { slate } = config.settings;
  slate.toolbarButtons = [...(slate.toolbarButtons || []), 'mention'];
  slate.expandedToolbarButtons = [
    ...(slate.expandedToolbarButtons || []),
    'mention',
  ];

  return config;
};
