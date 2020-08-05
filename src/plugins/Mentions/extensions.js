export const withMentions = (editor) => {
  const { isInline } = editor;

  editor.isInline = (element) => {
    return element.type === 'mention' ? true : isInline(element);
  };

  return editor;
};
