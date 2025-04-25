import { Editor, Range } from 'slate';
import { getMentionWidget, isCursorInMention } from './utils';

jest.mock('slate', () => ({
  Editor: {
    above: jest.fn(),
  },
  Range: {
    isCollapsed: jest.fn(),
  },
}));

jest.mock('@plone/volto/registry', () => ({
  __esModule: true,
  config: {
    widgets: {
      views: {
        id: {
          subjects: () => <div>SubjectsWidget</div>,
        },
        widget: {
          tags: () => <div>TagsWidget</div>,
        },
      },
    },
  },
}));

describe('getMentionWidget', () => {
  it('returns correct widget for each type', () => {
    expect(getMentionWidget('subjects')).toEqual('subjects');
    expect(getMentionWidget('testId', { factory: 'Choice' })).toEqual(
      'choices',
    );
    expect(getMentionWidget('testId', { factory: 'Relation Choice' })).toEqual(
      'relation',
    );
    expect(getMentionWidget('testId', { factory: 'Relation List' })).toEqual(
      'relations',
    );
    expect(getMentionWidget('testId', { factory: 'Image' })).toEqual('image');
    expect(getMentionWidget('testId', { factory: 'File' })).toEqual('file');
    expect(
      getMentionWidget('testId', { widget: 'Widget1', type: 'Type1' }),
    ).toEqual('Widget1');
    expect(getMentionWidget('testId', { type: 'Type1' })).toEqual('Type1');
    expect(getMentionWidget('testId')).toEqual('testId');
  });
});

describe('isCursorInMention', () => {
  const editor = {};
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('returns false if no mention', () => {
    Editor.above.mockReturnValueOnce(undefined);
    expect(isCursorInMention(editor)).toEqual(false);
    expect(Editor.above).toHaveBeenCalledWith(editor, {
      match: expect.any(Function),
    });
  });

  it('returns false if selection not collapsed', () => {
    Editor.above.mockReturnValueOnce([{}]);
    Range.isCollapsed.mockReturnValueOnce(false);
    expect(isCursorInMention(editor)).toEqual(false);
    expect(Editor.above).toHaveBeenCalledWith(editor, {
      match: expect.any(Function),
    });
    expect(Range.isCollapsed).toHaveBeenCalledWith(editor.selection);
  });

  it('returns true if selection collapsed inside a mention', () => {
    const mentionNode = {};
    Editor.above.mockReturnValueOnce([mentionNode]);
    Range.isCollapsed.mockReturnValueOnce(true);
    expect(isCursorInMention(editor)).toEqual(mentionNode);
    expect(Editor.above).toHaveBeenCalledWith(editor, {
      match: expect.any(Function),
    });
    expect(Range.isCollapsed).toHaveBeenCalledWith(editor.selection);
  });
});
