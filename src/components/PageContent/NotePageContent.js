import React, { Component } from "react";
import "./NotePageContent.css";
import APIContext from "./../APIContext";
import { findNote } from "./../notes-helpers";
import Notes from "./Notes";

export default class NotePageContent extends Component {
  static defaultProps = {
    match: {
      params: {}
    }
  };
  static contextType = APIContext;

  handleDeleteNote = noteId => {
    this.props.history.push("/");
  };

  render() {
    const { notes = [] } = this.context;
    const { noteId } = this.props.match.params;
    const note = findNote(notes, noteId) || { content: "" };
    console.log("props in notepagecontent", this.props);
    return (
      <>
        <div>
          <Notes
            id={note.id}
            name={note.name}
            modified={note.modified}
            onDeleteNote={this.handleDeleteNote}
          />
        </div>
        <p className="content">{note.content}</p>
      </>
    );
  }
}
