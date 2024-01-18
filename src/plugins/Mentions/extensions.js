import { MENTION } from './constants';

export const withMention = (editor) => {
  const { isInline } = editor;

  editor.isInline = (element) => {
    return element && element.type === MENTION ? true : isInline(element);
  };

  return editor;
};
