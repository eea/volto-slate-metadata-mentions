import React from 'react';
import { Button } from 'semantic-ui-react';
import { useIntl, defineMessages } from 'react-intl';
import { useSlate } from 'slate-react';
import { Editor, Range, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import { MentionsSchema } from './schema';
import { ToolbarButton } from 'volto-slate/editor/ui';
import { useSelector } from 'react-redux';
import SidebarPopup from 'volto-slate/futurevolto/SidebarPopup';
import { setSidebarTab } from '@plone/volto/actions';
import mentionsSVG from '@plone/volto/icons/connector.svg';
import InlineForm from 'volto-slate/futurevolto/InlineForm';
import { Icon } from '@plone/volto/components';
import briefcaseSVG from '@plone/volto/icons/briefcase.svg';
import './less/editor.less';
import editingSVG from '@plone/volto/icons/editing.svg';
import checkSVG from '@plone/volto/icons/check.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import deleteSVG from '@plone/volto/icons/delete.svg';
import usePluginToolbar from 'volto-slate/editor/usePluginToolbar';

const messages = defineMessages({
  edit: {
    id: 'Edit metadata',
    defaultMessage: 'Edit metadata',
  },
  delete: {
    id: 'Delete metadata',
    defaultMessage: 'Delete metadata',
  },
});

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

export const updateMentionsContextFromActiveMention = (
  editor,
  {
    setFormData,
    setAndSaveSelection,
    saveSelection = true,
    clearIfNoActiveFootnote = true,
  },
) => {
  if (saveSelection) {
    setAndSaveSelection(editor.selection);
  }

  const note = getActiveMentions(editor);
  // debugger;
  if (note) {
    const [node] = note;
    const { data } = node;

    const r = {
      ...data,
    };

    setFormData(r);
  } else if (editor.selection && clearIfNoActiveFootnote) {
    setFormData({});
  }
};

const MentionsButton = () => {
  const editor = useSlate();
  const intl = useIntl();

  const [showForm, setShowForm] = React.useState(false);
  const [selection, setSelection] = React.useState(null);
  const [formData, setFormData] = React.useState({
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

  const setAndSaveSelection = React.useCallback((sel) => {
    setSelection(sel);
    setShowForm(false);
  }, []);

  const submitHandler = React.useCallback(
    (data) => {
      setFormData(data);
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
  let data = { ...formData };

  const PluginToolbar = React.useCallback(
    () => (
      <>
        <Button.Group>
          <Button
            icon
            basic
            aria-label={intl.formatMessage(messages.edit)}
            onMouseDown={() => {
              if (!showForm) {
                updateMentionsContextFromActiveMention(editor, {
                  setAndSaveSelection,
                  setFormData,
                });

                setShowForm(true);
              }
            }}
          >
            <Icon name={editingSVG} size="18px" />
          </Button>
          <Button
            icon
            basic
            aria-label={intl.formatMessage(messages.delete)}
            onMouseDown={() => {
              unwrapMention(editor);
              setShowForm(false);
              ReactEditor.focus(editor);
            }}
          >
            <Icon name={deleteSVG} size="18px" />
          </Button>
        </Button.Group>
      </>
    ),
    [editor, intl, setAndSaveSelection, showForm],
  );

  usePluginToolbar(editor, isActiveMention, getActiveMentions, PluginToolbar);

  return (
    <>
      <SidebarPopup open={showForm}>
        <InlineForm
          schema={Schema}
          title={Schema.title}
          icon={<Icon size="24px" name={briefcaseSVG} />}
          onChangeField={(id, value) => {
            data = {
              ...data,
              [id]: value,
              widget: getWidget(value, properties[value]),
            };
            setFormData(data);
          }}
          formData={data}
          headerActions={
            <>
              <button
                onClick={() => {
                  setShowForm(false);
                  submitHandler(data);
                  ReactEditor.focus(editor);
                }}
              >
                <Icon size="24px" name={checkSVG} />
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  ReactEditor.focus(editor);
                }}
              >
                <Icon size="24px" name={clearSVG} />
              </button>
            </>
          }
        />
      </SidebarPopup>
      <ToolbarButton
        active={isMention}
        onMouseDown={() => {
          if (!showForm) {
            setSelection(editor.selection);
            const mention = getActiveMentions(editor);
            if (mention) {
              const [node] = mention;
              const { data } = node;
              setFormData(data);
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
