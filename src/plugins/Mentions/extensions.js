import { Transforms } from 'slate';
import { nanoid } from 'volto-slate/utils';

export const withMentions = (editor) => {
  const { isInline, normalizeNode } = editor;

  editor.isInline = (element) => {
    return element.type === "mention" ? true : isInline(element);
  };

  editor.normalizeNode = (entry) => {
    const [node, path] = entry;
    if (node.type === "mention" && !node.data?.uid) {
      Transforms.setNodes(
        editor,
        {
          data: {
            ...node.data,
            uid: nanoid(5)
          },
        },
        {
          at: path,
        },
      );
    }
    return normalizeNode(entry);
  };

  return editor;
};
