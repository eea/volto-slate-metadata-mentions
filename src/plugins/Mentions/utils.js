import { Editor, Range } from 'slate'; // Range,
import { MENTION } from './constants';

export const getMentionWidget = (id, schema) => {
  if (id === 'subjects') {
    return 'tags';
  }
  if (schema?.factory === 'Choice') {
    return 'choices';
  }
  if (schema?.factory === 'Relation Choice') {
    return 'relation';
  }
  if (schema?.factory === 'Relation List') {
    return 'relations';
  }
  if (schema?.factory === 'Image') {
    return 'image';
  }
  if (schema?.factory === 'File') {
    return 'file';
  }
  return schema?.widget || schema?.type || id;
};

export function isCursorInMention(editor) {
  // TODO: this function is not that great. Better use getActiveMention instead
  const result = Editor.above(editor, {
    match: (n) => n.type === MENTION,
  });

  if (!result) {
    return false;
  }

  const [mentionWithSelection] = result;

  // whether the selection is inside a mention
  const mentionCase =
    Range.isCollapsed(editor.selection) && mentionWithSelection;

  return mentionCase;
}
