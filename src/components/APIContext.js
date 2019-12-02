import React from "react";

const APIContext = React.createContext({
  folders: [],
  notes: [],
  addFolder: () => {},
  addNote: () => {},
  deleteNote: () => {}
});

export default APIContext;
