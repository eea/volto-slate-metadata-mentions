import { Transforms } from 'slate';
import { isCursorInMention } from './utils';
import { MENTION } from './constants';

export function backspaceInMention({ editor, event }) {
  if (!isCursorInMention(editor)) return false;
  Transforms.removeNodes(editor, { match: (n) => n.type === MENTION });
}

export function deleteInMention({ editor, event }) {
  if (!isCursorInMention(editor)) return false;
  Transforms.removeNodes(editor, { match: (n) => n.type === MENTION });
}
