import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl, defineMessages } from 'react-intl';
import { setSidebarTab } from '@plone/volto/actions';
import { ToolbarButton } from 'volto-slate/editor/ui';
import { getActiveMention, unwrapMention } from './utils';
import { EDITOR } from './constants';
import clearSVG from '@plone/volto/icons/delete.svg';
import editingSVG from '@plone/volto/icons/pen.svg';
import mentionsSVG from '@plone/volto/icons/connector.svg';

const messages = defineMessages({
  edit: {
    id: 'Edit metadata',
    defaultMessage: 'Edit metadata',
  },
  insert: {
    id: 'Insert metadata',
    defaultMessage: 'Insert metadata',
  },
  delete: {
    id: 'Delete metadata',
    defaultMessage: 'Delete metadata',
  },
});

function scrollIntoView(id) {
  const field = document.getElementById('field-' + id);
  if (field) {
    setTimeout(() => field.scrollIntoView(), 0);
  }
}

export default (editor) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const showEditor = useSelector((state) => state['mention_editor']?.show);
  const active = getActiveMention(editor);
  const isActive = !!(active && active.length);

  return isActive ? (
    <React.Fragment key="mention">
      <ToolbarButton
        icon={editingSVG}
        aria-label={intl.formatMessage(messages.edit)}
        onMouseDown={() => {
          dispatch({ type: EDITOR, show: false });
          dispatch(setSidebarTab(0));

          const [mentionNode] = active;
          const { data } = mentionNode;
          scrollIntoView(data.id);
        }}
      />
      <ToolbarButton
        icon={mentionsSVG}
        active={showEditor}
        aria-label={intl.formatMessage(messages.insert)}
        onMouseDown={() => {
          dispatch({ type: EDITOR, show: true });
        }}
      />
      <ToolbarButton
        icon={clearSVG}
        aria-label={intl.formatMessage(messages.delete)}
        alt={intl.formatMessage(messages.delete)}
        onMouseDown={() => {
          unwrapMention(editor);
        }}
      />
    </React.Fragment>
  ) : (
    ''
  );
};
