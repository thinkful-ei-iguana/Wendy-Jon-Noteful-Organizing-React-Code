import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import APIContext from "./../APIContext";
import "./NavBarFolders.css";

export default class NavBarFolders extends Component {
  static contextType = APIContext;
  render() {
    const { folders = [], notes = [] } = this.context;
    return (
      <>
        <ul>
          {folders.map(folder => (
            <li key={folder.id} className="folder-name">
              <NavLink to={`/folder/${folder.id}`}>{folder.name}</NavLink>
            </li>
          ))}
        </ul>
        <Link to={"/add-folder"}>
          <button className="add-folder">Add folder</button>
        </Link>
      </>
    );
  }
}
