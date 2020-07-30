import { Editor, Transforms, Range } from 'slate';

export const withMentions = (editor) => {
  const { insertText } = editor;

  editor.insertText = (text) => {
    const { selection } = editor;
    if( text === '@' ) {
      text += 'mention-here';
    }
    insertText(text);
  }

  return editor;
};
