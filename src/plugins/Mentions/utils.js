import { Editor, Text, Transforms, Range } from 'slate'; // Range,
import { MENTION } from './constants';

export function insertMention(editor, data) {
  if (editor.savedSelection) {
    const selection = editor.savedSelection;

    if (
      JSON.stringify(selection.anchor.path) !==
      JSON.stringify(selection.focus.path)
    ) {
      console.warn("Won't insert mention across paths", selection);
      return;
    }

    const res = Array.from(
      Editor.nodes(editor, {
        match: (n) => n.type === MENTION,
        mode: 'highest',
        at: selection,
      }),
    );
    const id = data.id || 'no-field-selected';

    if (res.length) {
      const [, path] = res[0];
      Transforms.setNodes(
        editor,
        { data },
        {
          at: path,
          match: path ? (n) => n.type === MENTION : null,
        },
      );
      Transforms.removeNodes(editor, {
        match: (n) => Text.isText(n),
        at: [...path, 0],
      });
      Transforms.insertNodes(editor, { text: id }, { at: [...path, 0] });
    } else {
      const start = Math.min(selection.focus.offset, selection.anchor.offset);
      const { path } = selection.anchor;
      const text = Array(
        Math.abs(selection.focus.offset - selection.anchor.offset),
      )
        .fill('-')
        .join('');

      Transforms.transform(editor, {
        type: 'remove_text',
        text,
        path,
        offset: start,
      });
      Transforms.transform(editor, {
        path,
        offset: start,
        type: 'insert_text',
        text: id,
      });

      Transforms.wrapNodes(
        editor,
        { type: MENTION, data },
        {
          split: true,
          at: {
            path,
            focus: {
              offset: start + id.length,
            },
          },
        },
      );
    }

    if (data) {
      // If there's data, the mention has been edited, otherwise it's a new mention and we want to edit it
      // Transforms.select(editor, selPathRef.current);
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
  let found = Array.from(
    Editor.nodes(editor, {
      match: (n) => n.type === MENTION,
      at: selection,
    }) || [],
  );
  if (found.length) return true;

  if (selection) {
    const { path } = selection.anchor;
    const isAtStart =
      selection.anchor.offset === 0 && selection.focus.offset === 0;

    if (isAtStart) {
      found = Array.from(
        Editor.previous(editor, {
          at: path,
          // match: (n) => n.type === MENTION,
        }) || [],
      );
      if (found && found[0] && found[0].type === MENTION) {
        return true;
      }
    }
  }

  return false;
};

/**
 * getActiveMention.
 *
 * @param {Object} editor
 * @param {String} direction One of 'any', 'backward', 'forward'
 */
export const getActiveMention = (editor, direction = 'any') => {
  const selection = editor.selection || editor.savedSelection;
  let found = Array.from(
    Editor.nodes(editor, {
      match: (n) => n.type === MENTION,
      at: selection,
    }),
  );
  if (found.length) return found[0];

  if (!selection) return false;

  if (direction === 'any' || direction === 'backward') {
    const { path } = selection.anchor;
    const isAtStart =
      selection.anchor.offset === 0 && selection.focus.offset === 0;

    if (isAtStart) {
      let found = Editor.previous(editor, {
        at: path,
      });
      if (found && found[0].type === MENTION) {
        return found[0];
      }
    }
  }

  if (direction === 'any' || direction === 'forward') {
    const { path } = selection.anchor;
    const isAtStart =
      selection.anchor.offset === 0 && selection.focus.offset === 0;

    if (isAtStart) {
      let found = Editor.next(editor, {
        at: path,
      });
      if (found && found[0].type === MENTION) {
        return found[0];
      }
    }
  }
};

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
