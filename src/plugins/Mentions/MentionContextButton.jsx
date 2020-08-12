import React from 'react';
import editingSVG from '@plone/volto/icons/editing.svg';
import mentionsSVG from '@plone/volto/icons/connector.svg';
import { useIntl, defineMessages } from 'react-intl';
import { isActiveMention, unwrapMention } from './utils';
import clearSVG from '@plone/volto/icons/delete.svg';
import { ToolbarButton } from 'volto-slate/editor/ui';
import { EDITOR } from './constants';
import { useDispatch, useSelector } from 'react-redux';
import { setSidebarTab } from '@plone/volto/actions';

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

export default (editor) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const showEditor = useSelector((state) => state['mention_editor']?.show);

  return isActiveMention(editor) ? (
    <React.Fragment key="mention">
      <ToolbarButton
        icon={editingSVG}
        aria-label={intl.formatMessage(messages.edit)}
        onMouseDown={() => {
          dispatch({ type: EDITOR, show: false });
          dispatch(setSidebarTab(0));
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
