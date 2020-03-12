import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import APIContext from "./../APIContext";
import config from "../../config";
import "./NavBarFolders.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

export default class NavBarFolders extends Component {
  static contextType = APIContext;

  handleClickDelete = folderId => {
    fetch(`${config.API_ENDPOINT}/folders/${folderId}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" }
    })
      .then(res => {
        if (!res.ok) return res.json().then(event => Promise.reject(event));
      })
      .then(() => {
        this.context.deleteFolder(folderId);
      })
      .catch(error => {
        console.error({ error });
      });
  };

  render() {
    const { folders = [] } = this.context;

    return (
      <>
        <ul>
          {folders.map(folder => (
            <li key={folder.id} className="folder-name">
              <NavLink to={`/folder/${folder.id}`} activeClassName="active">
                {folder.name}
              </NavLink>

              <div className="icon-container">
                <Link to={`/folder/${folder.id}/edit`}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </Link>
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => this.handleClickDelete(folder.id)}
                />
              </div>
            </li>
          ))}
        </ul>

        <Link to={"/add-folder"} className="add-folder">
          <button className="add-folder-btn">Add folder</button>
        </Link>
      </>
    );
  }
}
