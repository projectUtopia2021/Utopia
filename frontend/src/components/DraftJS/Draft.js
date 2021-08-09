import React from "react";
import { EditorState, convertToRaw } from "draft-js";
import Editor from "draft-js-plugins-editor";
import createMentionPlugin, {
  defaultSuggestionsFilter
} from "draft-js-mention-plugin";
import createToolbarPlugin, {
  Separator
} from "@draft-js-plugins/static-toolbar";
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
import editorStyles from './DraftStyles.module.css';
import "draft-js-mention-plugin/lib/plugin.css";
import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import draftToHtml from 'draftjs-to-html';

import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';


import createEmojiPlugin from '@draft-js-plugins/emoji';
import "../../../node_modules/@draft-js-plugins/emoji/lib/plugin.css"

import {Button} from '@material-ui/core';
import Stack from '@material-ui/core/Stack';


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
    suggestions: mentions,

    currentFile: [],
    previewImage: [],
  };

  onChange = editorState => {
    this.setState({ editorState });
  };


  focus = () => {
    this.editor.focus();
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

  selectFile = (event) => {
    if (this.state.currentFile.length === 6) {
      alert("you cannot upload more than 6 images");
      return;
    }

    const newA = this.state.currentFile.concat(event.target.files[0]);
    const newB = this.state.previewImage.concat(URL.createObjectURL(event.target.files[0]));
    console.log(newA)
    this.setState({
      currentFile: newA,
      previewImage: newB,
    });
    event.target.value = null;
  };

  cleanImages = () => {
    this.setState({
      currentFile: [],
      previewImage: [],
    });
  };

  makePosts = () => {
     this.onExtractData();
     this.onExtractMentions();
     console.log("make Posts");

    //  localStorage.getItem('token', JSON.stringify(res.data))


    const contentState = this.state.editorState.getCurrentContent();

    const axios = require('axios')
    const raw = convertToRaw(contentState);
    let mentionedUsers = [];

    for (let key in raw.entityMap) {
      const ent = raw.entityMap[key];
      if (ent.type === "mention") {
        mentionedUsers.push(ent.data.mention);
      }
    }

    var postData = {
      description: draftToHtml(convertToRaw(contentState)),
      title: this.props.title,
      communityName: this.props.communityName.pathname.substring(11),
      images: this.state.currentFile,
      mentionName: mentionedUsers,
    };

    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS', 
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).jwtToken}`,
      }
    };
    
    axios.post('/api/posts', postData, axiosConfig)
    .then((res) => {
      console.log("RESPONSE RECEIVED: ", res);
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
  }

  render() {
    const { MentionSuggestions } = this.mentionPlugin;
    const { EmojiSuggestions} = this.emojiPlugin;
    const { Toolbar } = this.toolbarPlugin;
    const plugins = [this.mentionPlugin, this.toolbarPlugin, this.emojiPlugin];

    const {
      currentFile,
      previewImage,
    } = this.state;

    return (
      <div className={editorStyles.wholeInput}>

        <div className={editorStyles.textbox} onClick={this.focus}>
          {/* <Typography variant="h4">
            Content
          </Typography> */}
          <div className={editorStyles.editor}>
            <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
              plugins={plugins}
              ref={(element) => {
                this.editor = element;
              }}
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
                      <Separator {...externalProps} />
                      <HeadlinesButton {...externalProps} />
                      <UnorderedListButton {...externalProps} />
                      <OrderedListButton {...externalProps} />
                      <BlockquoteButton {...externalProps} />
                      <CodeBlockButton {...externalProps} />
                    </div>
                  )
                }
              </Toolbar>
            <EmojiSuggestions />
            <MentionSuggestions
              onSearchChange={this.onSearchChange}
              suggestions={this.state.suggestions}
            />

          </div>

          <div className="mg20">
            

            {/* <div className="file-name">
              {currentFile ? currentFile.name : null}
            </div> */}
            
            

            {previewImage.length!==0 && (
            <div>
              <ImageList sx={{ width: 600, height: 200*Math.ceil(this.state.currentFile.length/3) }} cols={3} rowHeight={197}>
                {previewImage.map((item) => (
                  <ImageListItem key={item}>
                    <img
                      srcSet={`${item}`}
                      alt={item.name}
                      style={{height: 197}}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </div>
            )}
            <Stack direction="row" justifyContent="flex-end" spacing={2}>

              <label htmlFor="btn-upload" style={{marginBottom: 0}}>
                <input
                  id="btn-upload"
                  name="btn-upload"
                  style={{ display: 'none' }}
                  type="file"
                  accept="image/*"
                  onChange={this.selectFile} />

                <Button
                  color="info"
                  className="btn-choose"
                  variant="contained"
                  component="span" >
                  Add Images
                </Button>
              </label>

              {previewImage.length!==0 && (
              <Button
                size="medium"
                className="btn-upload"
                color="warning"
                variant="contained"
                component="span"
                disabled={!currentFile}
                onClick={this.cleanImages}>
                Clean
              </Button>
              )}
              <Button
                className="btn-upload"
                color="primary"
                variant="contained"
                component="span"
                disabled={!currentFile}
                onClick={this.makePosts}>
                Submit
              </Button>
            </Stack>
            

            
          </div>
        </div>
      </div>

      
    );
  }
}

export default Draft;