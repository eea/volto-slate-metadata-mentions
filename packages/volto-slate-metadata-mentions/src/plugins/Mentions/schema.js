import { defineMessages } from 'react-intl';

const messages = defineMessages({
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  title: {
    id: 'Metadata entry',
    defaultMessage: 'Metadata entry',
  },
  metadata: {
    id: 'Metadata',
    defaultMessage: 'Metadata',
  },
  metadataDescription: {
    id: 'Select metadata to be used',
    defaultMessage: 'Select metadata to be used',
  },
  display: {
    id: 'Display',
    defaultMessage: 'Display',
  },
  dateOnly: {
    id: 'Show only date',
    defaultMessage: 'Show only date',
  },
  dateOnlyDescription: {
    id: 'Display only date without time',
    defaultMessage: 'Display only date without time',
  },
  addLinkToDownload: {
    id: 'Add link to download',
    defaultMessage: 'Add link to download',
  },
  addLinkToDownloadDescription: {
    id: 'Wrap image in a link to download the original image',
    defaultMessage: 'Wrap image in a link to download the original image',
  },
});

export const MentionSchema = function ({ metadata, intl }) {
  return {
    title: intl.formatMessage(messages.title),
    fieldsets: [
      {
        id: 'default',
        title: intl.formatMessage(messages.default),
        fields: [
          'metadata',
          'widget',
          ...(metadata === 'image' ? ['addLinkToDownload'] : []),
          ...(metadata === 'effective' ? ['dateOnly'] : []),
        ],
      },
    ],
    properties: {
      metadata: {
        title: intl.formatMessage(messages.metadata),
        description: intl.formatMessage(messages.metadataDescription),
        choices: [
          ['title', 'Title'],
          ['description', 'Description'],
        ],
      },
      widget: {
        title: intl.formatMessage(messages.display),
        type: 'string',
      },
      ...(metadata === 'image'
        ? {
            addLinkToDownload: {
              title: intl.formatMessage(messages.addLinkToDownload),
              description: intl.formatMessage(
                messages.addLinkToDownloadDescription,
              ),
              type: 'boolean',
            },
          }
        : {}),
      ...(metadata === 'effective'
        ? {
            dateOnly: {
              title: intl.formatMessage(messages.dateOnly),
              description: intl.formatMessage(messages.dateOnlyDescription),
              type: 'boolean',
            },
          }
        : {}),
    },
    required: ['metadata'],
  };
};
