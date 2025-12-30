import React from "react";

const Textbox = ({
  ...props
},) => {
  return <input 
    {...props} 
  />;
};

export default Textbox;
