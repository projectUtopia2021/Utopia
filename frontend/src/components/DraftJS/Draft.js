import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import {useStyles} from './DraftStyles';
import Container from '@material-ui/core/Container';
import createEmojiPlugin from '@draft-js-plugins/emoji';

import "./styles.css";
import "../../../node_modules/@draft-js-plugins/emoji/lib/plugin.css"

const emojiPlugin = createEmojiPlugin();

const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

class Draft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    }
    this.setDomEditorRef = ref => this.domEditor = ref;
    this.focus = () => this.domEditor.focus();
  }

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  }

  handleClick = (editorState) => {
    const contentState = editorState.getCurrentContent();
    console.log('this is:'+contentState.getPlainText());
    const axios = require('axios')

    var postData = {
      title: 'testJW',
      desc: contentState.getPlainText(),
      user: null,
      comment: []
    };
    
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS', 
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0emVuZyIsImV4cCI6MTYyNDczMzYxMCwiaWF0IjoxNjI0NzE1NjEwfQ.rKWJM2w_rpEaHanw3GT-R5rD86GJejb9Jpo_4v1vihn0ENG4TMZvbLfILWNhNd-WZ7lZgKM5wxu9ZDzELeV5UQ'
      }
    };
    
    axios.post('localhost:8081/savePosts', postData, axiosConfig)
    .then((res) => {
      console.log("RESPONSE RECEIVED: ", res);
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
  }

  render() {
    const classes = this.props.classes;
    return (
      <Container maxWidth="sm" className={classes.textbox} onClick={this.focus}>
        <Editor
          placeholder="Enter some text..."
          editorState={this.state.editorState}
          onChange={this.onChange}
          ref={this.setDomEditorRef}
          plugins={[emojiPlugin]}
        />
        <EmojiSuggestions />
        <EmojiSelect />
        <input
          onClick={this.handleClick(this.state.editorState)}
          type="button"
          value="Log State"
        />
      </Container>
      
    );
  }
}

export default () => {
  const classes = useStyles();
  return (
      <Draft classes={classes} />
  )
}