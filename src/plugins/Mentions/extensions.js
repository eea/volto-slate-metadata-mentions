import { MENTION } from './constants';

export const withMention = (editor) => {
  const { isInline, isVoid } = editor;

  editor.isInline = (element) => {
    return element.type === MENTION ? true : isInline(element);
  };

  editor.isVoid = (element) => {
    return element.type === MENTION ? true : isVoid(element);
  };

  return editor;
};
