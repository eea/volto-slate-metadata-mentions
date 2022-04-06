export const MentionSchema = {
  title: 'Metadata entry',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['metadata', 'widget'],
    },
  ],
  properties: {
    metadata: {
      title: 'Metadata',
      description: 'Select metadata to be used',
      choices: [
        ['title', 'Title'],
        ['description', 'Description'],
      ],
    },
    widget: {
      title: 'Display',
      type: 'string',
    },
  },
  required: ['metadata'],
};
