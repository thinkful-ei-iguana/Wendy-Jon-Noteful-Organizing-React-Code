import React, { Component } from "react";
import Notes from "./Notes";
import { Link } from "react-router-dom";
import APIContext from "./../APIContext";
import { getNotesForFolder } from "./../notes-helpers";
import FormError from "../AddForms/FormError";
import "./FolderPageContent.css";

export default class FolderPageContent extends Component {
  static contextType = APIContext;
  render() {
    const { folderId } = this.props.match.params;
    const { notes = [] } = this.context;
    const notesForFolder = getNotesForFolder(notes, folderId);

    return (
      <FormError>
        <section className="content-container">
          <ul>
            {notesForFolder.map(note => (
              <li key={note.id} className="note-list">
                <Notes id={note.id} name={note.name} modified={note.modified} />
              </li>
            ))}
          </ul>
          <Link to={"/add-note"}>
            <button className="add-note">Add note</button>
          </Link>
        </section>
      </FormError>
    );
  }
}
