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
          onClick={this.logState}
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