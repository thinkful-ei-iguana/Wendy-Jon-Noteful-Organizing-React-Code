import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import APIContext from "./../APIContext";
import { findFolder, findNote } from "./../notes-helpers";
import "./NavBarNote.css";

export default class NavBarNote extends Component {
  static defaultProps = {
    history: {
      goBack: () => {}
    },
    match: {
      params: {}
    }
  };
  static contextType = APIContext;

  render() {
    const { folders, notes } = this.context;
    const { noteId } = this.props.match.params;
    const note = findNote(notes, noteId) || {};
    const folder = findFolder(folders, note.folderId);
    return (
      <>
        <NavLink to="/folder/:folderId">
          {folder && <p className="folder-name">{folder.name}</p>}
        </NavLink>

        <button onClick={() => this.props.history.goBack()}>Go Back</button>
      </>
    );
  }
}
