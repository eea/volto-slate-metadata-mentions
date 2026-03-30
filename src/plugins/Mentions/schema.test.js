import { MentionSchema } from './schema';

jest.mock('react-intl', () => ({
  defineMessages: (messages) => messages,
}));

describe('MentionSchema', () => {
  const intl = {
    formatMessage: jest.fn((message) => `formatted:${message.id}`),
  };

  beforeEach(() => {
    intl.formatMessage.mockClear();
  });

  it('adds the image download option for image metadata', () => {
    const schema = MentionSchema({ metadata: 'image', intl });

    expect(schema.fieldsets[0].fields).toEqual([
      'metadata',
      'widget',
      'addLinkToDownload',
    ]);
    expect(schema.properties.addLinkToDownload).toEqual({
      title: 'formatted:Add link to download',
      description:
        'formatted:Wrap image in a link to download the original image',
      type: 'boolean',
    });
    expect(schema.properties.dateOnly).toBeUndefined();
    expect(schema.required).toEqual(['metadata']);
  });

  it('adds the date-only option for effective metadata', () => {
    const schema = MentionSchema({ metadata: 'effective', intl });

    expect(schema.fieldsets[0].fields).toEqual([
      'metadata',
      'widget',
      'dateOnly',
    ]);
    expect(schema.properties.dateOnly).toEqual({
      title: 'formatted:Show only date',
      description: 'formatted:Display only date without time',
      type: 'boolean',
    });
    expect(schema.properties.addLinkToDownload).toBeUndefined();
  });
});
