import React from "react";
import "./CircleButton.css";
import AddFolder from "../NotePageNav/AddFolder";

export default function NavCircleButton(props) {
  const { tag, className, childrenm, ...otherProps } = props;

  return React.createElement(
    props.tag,
    {
      className: ["NavCircleButton", props.className].join(" "),
      ...otherProps
    },
    props.children
  );
}
// <AddFolder />

NavCircleButton.defaultProps = {
  tag: "a"
};
