import React from "react";
import { EditorState, convertToRaw } from "draft-js";
import Editor from "draft-js-plugins-editor";
import createMentionPlugin, {
  defaultSuggestionsFilter
} from "draft-js-mention-plugin";
import createToolbarPlugin from '@draft-js-plugins/static-toolbar';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from '@draft-js-plugins/buttons';
import {editorStyles} from "./RemoteMentionEditor";
import "draft-js-mention-plugin/lib/plugin.css";
import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import draftToHtml from 'draftjs-to-html';
import { Container } from "@material-ui/core";


import createEmojiPlugin from '@draft-js-plugins/emoji';
import "../../../node_modules/@draft-js-plugins/emoji/lib/plugin.css"



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

class HeadlinesPicker extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      window.addEventListener('click', this.onWindowClick);
    });
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
  }

  onWindowClick = () =>
    // Call `onOverrideContent` again with `undefined`
    // so the toolbar can show its regular content again.
    this.props.onOverrideContent(undefined);

  render() {
    const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
    return (
      <div>
        {buttons.map((Button, i) => (
          // eslint-disable-next-line
          <Button key={i} {...this.props} />
        ))}
      </div>
    );
  }
}

class HeadlinesButton extends React.Component {
  onClick = () =>
    // A button can call `onOverrideContent` to replace the content
    // of the toolbar. This can be useful for displaying sub
    // menus or requesting additional information from the user.
    this.props.onOverrideContent(HeadlinesPicker);

  render() {
    return (
      <div className={editorStyles.headlineButtonWrapper}>
        <button onClick={this.onClick} className={editorStyles.headlineButton}>
          H
        </button>
      </div>
    );
  }
}


class Draft extends React.Component {
  constructor(props) {
    super(props);

    this.mentionPlugin = createMentionPlugin();
    this.toolbarPlugin = createToolbarPlugin();
    this.emojiPlugin   = createEmojiPlugin();
  }

  state = {
    editorState: EditorState.createEmpty(),
    suggestions: mentions
  };

  onChange = editorState => {
    this.setState({ editorState });
  };

  onSearchChange = ({ value }) => {
    this.setState({
      suggestions: defaultSuggestionsFilter(value, mentions)
    });
  };

  onExtractData = () => {
    const contentState = this.state.editorState.getCurrentContent();
    const raw = draftToHtml(convertToRaw(contentState));
    console.log(raw);
  };

  onExtractMentions = () => {
    const contentState = this.state.editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    let mentionedUsers = [];
    for (let key in raw.entityMap) {
      const ent = raw.entityMap[key];
      if (ent.type === "mention") {
        mentionedUsers.push(ent.data.mention);
      }
    }
    console.log(mentionedUsers);
  };

  makePosts = () => {
     this.onExtractData();
     this.onExtractMentions();
     console.log("make Posts");
  }

  render() {
    const { MentionSuggestions } = this.mentionPlugin;
    const { EmojiSuggestions, EmojiSelect } = this.emojiPlugin;
    const { Toolbar } = this.toolbarPlugin;
    const plugins = [this.mentionPlugin, this.toolbarPlugin, this.emojiPlugin];

    return (
      <Container maxWidth="sm" className={editorStyles.textbox} onClick={this.focus}>
        <div className={editorStyles.editor, editorStyles.textbox}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
          />
                    <Toolbar>
                      {
                        // may be use React.Fragment instead of div to improve perfomance after React 16
                        (externalProps) => (
                          <div>
                            <BoldButton {...externalProps} />
                            <ItalicButton {...externalProps} />
                            <UnderlineButton {...externalProps} />
                            <CodeButton {...externalProps} />
                            <UnorderedListButton {...externalProps} />
                            <OrderedListButton {...externalProps} />
                          </div>
                        )
                      }
                    </Toolbar>
          <EmojiSuggestions />
          <EmojiSelect />
          <MentionSuggestions
            onSearchChange={this.onSearchChange}
            suggestions={this.state.suggestions}
          />

        </div>
        <div>
          <button onClick={() => this.makePosts()}>Submit</button>
        </div>
      </Container>
    );
  }
}

export default Draft;