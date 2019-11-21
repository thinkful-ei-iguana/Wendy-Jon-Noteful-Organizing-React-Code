import React from "react";

function ValidationError(props) {
  if (props.message) {
    return <h3>{props.message}</h3>;
  }
  return <div></div>;
}

export default ValidationError;
