import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import APIContext from "./../APIContext";
import PropTypes from "prop-types";
import "./Notes.css";

export default class Notes extends Component {
  static defaultProps = {
    onDeleteNote: () => {}
  };
  static contextType = APIContext;

  handleClickDelete = event => {
    event.preventDefault();
    const noteId = this.props.id;
    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" }
    })
      .then(res => {
        if (!res.ok) return res.json().then(event => Promise.reject(event));
        return res.json();
      })
      .then(() => {
        this.context.deleteNote(noteId);
        this.props.onDeleteNote(noteId);
      })
      .catch(error => {
        console.error({ error });
      });
  };

  render() {
    const { name, id, modified } = this.props;
    return (
      <div className="note">
        <h2>
          <Link to={`/note/${id}`}>{name}</Link>
        </h2>
        <p>
          Note modified on{" "}
          <Moment format="D MMM YYYY" withTitle>
            {modified}
          </Moment>
          <button className="delete-button" onClick={this.handleClickDelete}>
            Delete Note
          </button>
        </p>
      </div>
    );
  }
}

Notes.propTypes = {
  id: PropTypes.string,
  modified: PropTypes.string,
  name: PropTypes.string.isRequired
};
