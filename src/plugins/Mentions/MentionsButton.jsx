import React from 'react';
import { useSlate } from 'slate-react';
import { Editor, Range, Transforms } from 'slate';
import { MentionsSchema } from './schema';
import { ToolbarButton } from 'volto-slate/editor/ui';
import { useSelector } from 'react-redux';
import { SidebarPortal } from '@plone/volto/components';
import { setSidebarTab } from '@plone/volto/actions';
import mentionsSVG from '@plone/volto/icons/connector.svg';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';

import './less/editor.less';

export const wrapMention = (editor, data) => {
  if (isActiveMention(editor)) {
    unwrapMention(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const mention = {
    type: 'mention',
    data,
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, mention);
  } else {
    Transforms.wrapNodes(editor, mention, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};

function insertMention(editor, data) {
  if (editor.selection) {
    wrapMention(editor, data);
  }
}

function unwrapMention(editor) {
  Transforms.unwrapNodes(editor, { match: (n) => n.type === 'mention' });
}

export const isActiveMention = (editor) => {
  const [mention] = Editor.nodes(editor, {
    match: (n) => n.type === 'mention',
  });
  return !!mention;
};

export const getActiveMentions = (editor) => {
  const [mention] = Editor.nodes(editor, {
    match: (n) => n.type === 'mention',
  });
  return mention;
};

export const getWidget = (id, schema) => {
  if (id === 'subjects') {
    return id;
  }
  if (schema?.factory === 'Choice') {
    return 'choices';
  }
  return schema?.widget || schema?.type || id;
};

const MentionsButton = () => {
  const editor = useSlate();
  const [showForm, setShowForm] = React.useState(false);
  const [selection, setSelection] = React.useState(null);
  const [formData, setFormdata] = React.useState({
    id: undefined,
    widget: undefined,
  });

  // Get Object metadata from global state
  const properties = useSelector(
    (state) => state?.schema?.schema?.properties || {},
  );
  const Schema = {
    ...MentionsSchema,
    properties: {
      ...MentionsSchema.properties,
      id: {
        ...MentionsSchema.properties.id,
        choices: Object.keys(properties)
          .map((key) => {
            const val = properties[key];
            if (val?.type !== 'dict') {
              return [key, val?.title || key];
            }
            return false;
          })
          .filter((val) => !!val),
      },
    },
  };

  const submitHandler = React.useCallback(
    (data) => {
      setFormdata(data);
      // TODO: have an algorithm that decides which one is used
      const { id } = data;
      if (!!id) {
        Transforms.select(editor, selection);
        insertMention(editor, { ...data });
      } else {
        Transforms.select(editor, selection);
        unwrapMention(editor);
      }
    },
    [editor, selection],
  );

  const isMention = isActiveMention(editor);

  return (
    <>
      <SidebarPortal selected={showForm}>
        <InlineForm
          schema={Schema}
          title={Schema.title}
          formData={formData}
          onChangeField={(id, value) => {
            submitHandler({
              ...formData,
              [id]: value,
              widget: getWidget(value, properties[value]),
            });
          }}
        />
      </SidebarPortal>
      <ToolbarButton
        active={isMention}
        onMouseDown={() => {
          if (!showForm) {
            setSelection(editor.selection);
            const mention = getActiveMentions(editor);
            if (mention) {
              const [node] = mention;
              const { data } = node;
              setFormdata(data);
            }
            setSidebarTab(1);
            setShowForm(true);
          }
        }}
        icon={mentionsSVG}
      />
    </>
  );
};

export default MentionsButton;
