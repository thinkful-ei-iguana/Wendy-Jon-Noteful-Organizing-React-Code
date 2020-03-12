import React from "react";

const APIContext = React.createContext({
  folders: [],
  notes: [],
  addFolder: () => {},
  deleteFolder: () => {},
  editFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
  editNote: () => {}
});

export default APIContext;
