import React from 'react';
import { useSlate } from 'slate-react';
import { Editor, Range, Transforms } from 'slate';
import { MentionsSchema } from './schema';
import { ToolbarButton } from 'volto-slate/editor/ui';
import { useSelector } from 'react-redux'
import { SidebarPortal } from '@plone/volto/components';

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
    type: "mention",
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
  Transforms.unwrapNodes(editor, { match: (n) => n.type === "mention" });
}


export const isActiveMention = (editor) => {
  const [mention] = Editor.nodes(editor, { match: (n) => n.type === "mention" });
  return !!mention;
};

export const getActiveMentions = (editor) => {
  const [mention] = Editor.nodes(editor, { match: (n) => n.type === "mention" });
  return mention;
};


const MentionsButton = () => {
  const editor = useSlate();
  const [showForm, setShowForm] = React.useState(false);
  const [selection, setSelection] = React.useState(null);
  const [formData, setFormdata] = React.useState({});

  // Get Object metadata from global state
  const properties = useSelector(state => state?.schema?.schema?.properties || {});
  const Schema = {
    ...MentionsSchema,
    properties: {
      ...MentionsSchema.properties,
      mention: {
        ...MentionsSchema.properties.mention,
        choices: Object.keys(properties).map((key) => {
          const val = properties[key];
          if(val?.type !== 'dict') {
            return [key, val?.title || key];
          }
        }).filter(val => val)
      }
    }
  };

  const submitHandler = React.useCallback(
    (formData) => {
      // TODO: have an algorithm that decides which one is used
      const { mention } = formData;
      if (mention) {
        Transforms.select(editor, selection);
        insertMention(editor, { ...formData });
      } else {
        unwrapMention(editor);
      }
    },
    [editor, selection],
  );

  const isMention = isActiveMention(editor);

  return (
    <>
      <SidebarPortal selected={showForm} tab="sidebar-properties">
        <InlineForm
          schema={Schema}
          title={Schema.title}
          onChangeField={(id, value) => {
            const formData = {
              ...formData,
              [id]: value,
              properties: properties[value]
            };
            setFormdata(formData);
            if(!value) {
              unwrapMention(editor);
            } else {
              submitHandler(formData);
            }
          }}
          formData={formData}
        />
      </SidebarPortal>
      <ToolbarButton
        active={isMention}
        onMouseDown={() => {
          if (!showForm) {
            console.log(editor);
            setSelection(editor.selection);
            const mention = getActiveMentions(editor);
            if (mention) {
              const [ node ] = mention;
              const { data } = node;
              setFormdata(data);
            }

            setShowForm(true);
          }
        }}
        icon={mentionsSVG}
      />
    </>
  );
};

export default MentionsButton;
