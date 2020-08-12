import { Transforms } from 'slate';
import { getActiveMention } from './utils';
import { MENTION } from './constants';

export function backspaceInMention({ editor, event }) {
  const mention = getActiveMention(editor, 'backward');
  const [, path] = mention || [];
  if (!path) return false;
  Transforms.removeNodes(editor, {
    match: (n) => n.type === MENTION,
    at: path,
  });
}

export function deleteInMention({ editor, event }) {
  const [, path] = getActiveMention(editor, 'forward') || [];
  if (!path) return false;
  Transforms.removeNodes(editor, {
    match: (n) => n.type === MENTION,
    at: path,
  });
}
