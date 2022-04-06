import React from 'react';
import { defineMessages } from 'react-intl';
import { MENTION } from './constants';
import { MentionElement } from './render';
import { withMention } from './extensions';
import { MentionSchema } from './schema';
import MentionEditor from './MentionEditor';
import ToolbarButton from './ToolbarButton';
import mentionsSVG from '@plone/volto/icons/connector.svg';
import { makeInlineElementPlugin } from 'volto-slate/components/ElementEditor';
import { omit } from 'lodash';

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

const omittedProps = [
  'pluginEditor',
  'getActiveElement',
  'unwrapElement',
  'schemaProvider',
  'hasValue',
  'elementType',
  'isInlineElement',
  'editSchema',
  'element',
  'persistentHelper',
];

const btnFactory = (options) => (props) => (
  <ToolbarButton {...props} {...options} title="Metadata" />
);

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
    hasValue: (formData) => !!(formData.metadata || formData.id),
    toolbarButtonIcon: mentionsSVG,
    messages,
  };
  const [installMentionsEditor, , , pluginOptions] = makeInlineElementPlugin(
    opts,
  );
  config = installMentionsEditor(config);

  const { slate } = config.settings;
  slate.toolbarButtons = [...(slate.toolbarButtons || []), 'mention'];
  slate.expandedToolbarButtons = [
    ...(slate.expandedToolbarButtons || []),
    'mention',
  ];

  // Custom mention Toolbar Button
  slate.buttons['mention'] = btnFactory(omit(pluginOptions, omittedProps));

  return config;
};
