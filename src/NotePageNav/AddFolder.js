import React from "react";
//add onSubmit to form
//add onChange to input field
export default class AddFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: { value: "Name", touched: false }
    };
  }

  
  validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return "Name is required";
    } else if (name.length < 3) {
      return "Name must be at least 3 characters long";
    }
  }


  render() {
    return (
      <form className="Add-folder"
        onSubmit={e => this.validateName(e.target.value)} >
        <label htmlFor="Folder-label">Add Folder Name</label>
        <input
          type="Text"
          className="Folder-input"
          id="Folder-label">
        </input>
        <button type="submit" className="Add-folder-button">Add Folder</button>
      </form>
    );
  }
}
