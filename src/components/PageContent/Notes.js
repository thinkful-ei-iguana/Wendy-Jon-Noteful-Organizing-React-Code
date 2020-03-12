import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import APIContext from "./../APIContext";
import PropTypes from "prop-types";
import config from "../../config";
import "./Notes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

export default class Notes extends Component {
  static defaultProps = {
    onDeleteNote: () => {}
  };
  static contextType = APIContext;

  handleClickDelete = event => {
    event.preventDefault();
    const noteId = this.props.id;
    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" }
    })
      .then(res => {
        if (!res.ok) return res.json().then(event => Promise.reject(event));
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
    const { name, id, modified, content } = this.props;

    return (
      <div className="note">
        <Link to={`/note/${id}`}>
          <div>
            <h2>{name}</h2>
            <p className="note-content">{content}</p>
          </div>
        </Link>
        <p>
          Note modified on{" "}
          <Moment format="D MMM YYYY" withTitle>
            {modified}
          </Moment>
        </p>
        <div className="note-container">
          <Link to={`/note/edit/${id}`}>
            <FontAwesomeIcon icon={faPencilAlt} />
          </Link>
          <FontAwesomeIcon icon={faTrash} onClick={this.handleClickDelete} />
        </div>
      </div>
    );
  }
}

Notes.propTypes = {
  id: PropTypes.number,
  modified: PropTypes.string,
  name: PropTypes.string,
  content: PropTypes.string.isRequired
};
