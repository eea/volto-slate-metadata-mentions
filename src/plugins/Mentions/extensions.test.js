import { withMention } from './extensions';
import { MENTION } from './constants';

describe('withMention', () => {
  it('marks mention elements as inline', () => {
    const originalIsInline = jest.fn(() => false);
    const editor = { isInline: originalIsInline };

    const result = withMention(editor);

    expect(result).toBe(editor);
    expect(editor.isInline({ type: MENTION })).toBe(true);
    expect(originalIsInline).not.toHaveBeenCalled();
  });

  it('falls back to the original isInline handler for other elements', () => {
    const originalIsInline = jest.fn(() => 'fallback');
    const editor = { isInline: originalIsInline };

    withMention(editor);

    expect(editor.isInline({ type: 'paragraph' })).toBe('fallback');
    expect(editor.isInline(undefined)).toBe('fallback');
    expect(originalIsInline).toHaveBeenCalledTimes(2);
  });
});
