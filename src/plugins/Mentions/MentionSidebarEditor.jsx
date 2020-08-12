/**
 * A small wrapper around MentionEditor. Its purpose it to allow for clearer
 * code, otherwise it would mix too many hooks and it's not possible to render
 * a variable number of hooks in a component
 */
import React from 'react';
import SidebarPopup from 'volto-slate/futurevolto/SidebarPopup';
import { useSelector, useDispatch } from 'react-redux';
import MentionEditor from './MentionEditor';
import { getActiveMention } from './utils';
import { ReactEditor, useSlate } from 'slate-react';
import { EDITOR } from './constants';

const MentionSidebarEditor = (props) => {
  const showEditor = useSelector((state) => state['mention_editor']?.show);
  const editor = useSlate();
  const dispatch = useDispatch();

  let selected = ReactEditor.isFocused(editor);
  if (editor.getBlockProps) {
    const blockProps = editor.getBlockProps();
    selected = blockProps.selected;
  }

  const active = getActiveMention(editor) || [];
  const [activeNode] = active;

  React.useEffect(() => {
    if (!activeNode) dispatch({ type: EDITOR, show: false });
  }, [activeNode, dispatch]);

  return selected && showEditor && active ? (
    <SidebarPopup open={true}>
      <MentionEditor />
    </SidebarPopup>
  ) : (
    ''
  );
};

export default MentionSidebarEditor;
