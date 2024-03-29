/**
 * This is the main toolbar button.
 */
import React from 'react';
import { useSlate } from 'slate-react';
import { useDispatch } from 'react-redux';
import { omit } from 'lodash';

import { ToolbarButton } from '@plone/volto-slate/editor/ui';
import { hasRangeSelection } from '@plone/volto-slate/utils';
import { setPluginOptions } from '@plone/volto-slate/actions';
import config from '@plone/volto/registry';

const ElementToolbarButton = (props) => {
  const { isActiveElement, insertElement, pluginId, toolbarButtonIcon } = props;
  const editor = useSlate();
  const isElement = isActiveElement(editor);
  const dispatch = useDispatch();

  const omittedProps = [
    'insertElement',
    'pluginId',
    'toolbarButtonIcon',
    'isActiveElement',
  ];

  const properties = editor?.getBlockProps?.() || {};
  const pid = `${editor.uid}-${pluginId}`;
  const visible = config.settings.layoutOnlySlateMetadataMentions
    ? properties?.manage
    : true;

  return (
    <>
      {visible && hasRangeSelection(editor) && (
        <ToolbarButton
          {...omit(props, ...omittedProps)}
          active={isElement}
          onMouseDown={() => {
            if (!isElement) insertElement(editor, {});
            dispatch(setPluginOptions(pid, { show_sidebar_editor: true }));
          }}
          icon={toolbarButtonIcon}
        />
      )}
    </>
  );
};

export default ElementToolbarButton;
