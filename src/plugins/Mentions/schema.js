export const MentionsSchema = {
  title: 'Insert metadata',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['mention'],
    },
  ],
  properties: {
    mention: {
      title: 'Metadata',
      description: 'Select metadata to be used',
      factory: 'Choice',
      type: 'string',
      choices: [
        ['title', 'Title'],
        ['description', 'Description'],
      ],
    },
  },
  required: ['mention'],
};
