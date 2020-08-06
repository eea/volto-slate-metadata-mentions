export const MentionsSchema = {
  title: 'Insert metadata',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['id', 'widget'],
    },
  ],
  properties: {
    id: {
      title: 'Metadata',
      description: 'Select metadata to be used',
      factory: 'Choice',
      type: 'string',
      choices: [
        ['title', 'Title'],
        ['description', 'Description'],
      ],
      enum: ['title', 'description'],
      enumNames: ['Title', 'Description'],
    },
    widget: {
      title: 'Display',
      type: 'string',
    },
  },
  required: ['id'],
};
