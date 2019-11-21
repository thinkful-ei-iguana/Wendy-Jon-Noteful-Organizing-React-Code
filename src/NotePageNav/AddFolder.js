import React from "react";
//add onSubmit to form
//add onChange to input field
export default class AddFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: { value: "", touched: false }
    };
  }
  render() {
    return (
      <form className="Add-folder">
        <label htmlFor="Folder-label">Add Folder Name</label>
        <input type="Text" className="Folder-input" id="Folder-label"></input>
        <button className="Add-folder-button">Add Folder</button>
      </form>
    );
  }
}
