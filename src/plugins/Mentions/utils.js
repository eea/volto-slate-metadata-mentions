import { Editor, Transforms, Range } from 'slate'; // Range,
import { MENTION } from './constants';

export function insertMention(editor, data) {
  if (editor.savedSelection) {
    const selection = editor.savedSelection;

    const selPathRef = Editor.pathRef(editor, selection.anchor.path);

    const res = Array.from(
      Editor.nodes(editor, {
        match: (n) => n.type === MENTION,
        mode: 'highest',
        at: selection,
      }),
    );

    if (res.length) {
      const [, path] = res[0];
      Transforms.setNodes(
        editor,
        { data },
        {
          at: path ? path : null,
          match: path ? (n) => n.type === MENTION : null,
        },
      );
    } else {
      Transforms.wrapNodes(
        editor,
        { type: MENTION, data },
        { split: true, at: selection },
      );
    }

    if (data) {
      // If there's data, the mention has been edited, otherwise it's a new mention and we want to edit it
      Transforms.select(editor, selPathRef.current);
      Transforms.collapse(editor); // TODO; collapse to original offset
    }
  }
}
export const unwrapMention = (editor) => {
  const selection = editor.selection || editor.savedSelection;
  Transforms.select(editor, selection);
  Transforms.unwrapNodes(editor, {
    match: (n) => n.type === MENTION,
    at: selection,
  });
};

export const isActiveMention = (editor) => {
  const selection = editor.selection || editor.savedSelection;
  const [note] = Editor.nodes(editor, {
    match: (n) => n.type === MENTION,
    at: selection,
  });

  return !!note;
};

export const getActiveMention = (editor) => {
  const selection = editor.selection || editor.savedSelection;
  const [node] = Editor.nodes(editor, {
    match: (n) => n.type === MENTION,
    at: selection,
  });
  return node;
};

export const getMentionWidget = (id, schema) => {
  if (id === 'subjects') {
    return 'tags';
  }
  if (schema?.factory === 'Choice') {
    return 'choices';
  }
  return schema?.widget || schema?.type || id;
};

export function isCursorInMention(editor) {
  //
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
