import React from "react";

const RadioButton = ({ children, ...props }) => {
  return (
    <div>
      <input type="radio" {...props} />
      <label htmlFor={props.id}>{children}</label>
    </div>
  );
};

export default RadioButton;
