import React from "react";

const SubmitButton = ({ label, ...props }) => {
  return <input type="submit" label={label} {...props} />;
};

export default SubmitButton;
