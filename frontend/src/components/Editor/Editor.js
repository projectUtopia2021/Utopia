import React, {
  MouseEvent,
  ReactElement,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { EditorState,convertToRaw} from 'draft-js';
import Editor from '@draft-js-plugins/editor';

import createMentionPlugin from '@draft-js-plugins/mention';
import editorStyles from './RemoteMentionEditor.css';
//import draftToHtml from 'draftjs-to-html';
//import htmlToDraft from 'html-to-draftjs';

const mentions: MentionData[] = [
  {
    name: 'Matthew Russell',
    title: 'Senior Software Engineer',
    avatar:
      'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg',
  },
  {
    name: 'Julian Krispel-Samsel',
    title: 'United Kingdom',
    avatar: 'https://avatars2.githubusercontent.com/u/1188186?v=3&s=400',
  },
  {
    name: 'Jyoti Puri',
    title: 'New Delhi, India',
    avatar: 'https://avatars0.githubusercontent.com/u/2182307?v=3&s=400',
  },
  {
    name: 'Max Stoiber',
    title:
      'Travels around the world, brews coffee, skis mountains and makes stuff on the web.',
    avatar: 'https://avatars0.githubusercontent.com/u/7525670?s=200&v=4',
  },
  {
    name: 'Nik Graf',
    title: 'Passionate about Software Architecture, UX, Skiing & Triathlons',
    avatar: 'https://avatars0.githubusercontent.com/u/223045?v=3&s=400',
  },
  {
    name: 'Pascal Brandt',
    title: 'HeathIT hacker and researcher',
    avatar:
      'https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png',
  },
  {
    name: 'Łukasz Bąk',
    title: 'Randomly Generated User',
    avatar: 'https://randomuser.me/api/portraits/men/36.jpg',
  },
];

function MyEditor(): ReactElement {
  const ref = useRef<Editor>(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const { MentionSuggestions, plugins } = useMemo(() => {
    const mentionPlugin = createMentionPlugin();
    // eslint-disable-next-line no-shadow
    const { MentionSuggestions } = mentionPlugin;
    // eslint-disable-next-line no-shadow
    const plugins = [mentionPlugin];
    return { plugins, MentionSuggestions };
  }, []);

  const onOpenChange = useCallback((_open: boolean) => {
    setOpen(_open);
  }, []);
  const onSearchChange = useCallback(({ value }: { value: string }) => {

        setSuggestions(mentions);

  }, []);

  return (
    <div
      className={editorStyles.editor}
      onClick={() => {
      }}
    >
      <Editor
        editorKey={'editor'}
        editorState={editorState}
        onChange={setEditorState}
        plugins={plugins}
        //ref={ref}
      />
      <MentionSuggestions
        open={open}
        onOpenChange={onOpenChange}
        suggestions={suggestions}
        onSearchChange={onSearchChange}
        onAddMention={() => {
          // get the mention object selected
        }}
      />
    </div>
  );
}

export{MyEditor}