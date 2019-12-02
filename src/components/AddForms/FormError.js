import React, { Component } from "react";

class FormError extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <h2>ERROR: Could not display content.</h2>;
    }
    return this.props.children;
  }
}

export default FormError;
