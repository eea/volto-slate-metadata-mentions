import { MENTION } from './constants';
import { isCursorInMention } from './utils';

export const withMention = (editor) => {
  const { isInline, insertText } = editor;

  editor.isInline = (element) => {
    return element.type === MENTION ? true : isInline(element);
  };

  editor.insertText = (text) => {
    if (isCursorInMention(editor)) {
      return;
    }
    return insertText(text);
  };

  return editor;
};
