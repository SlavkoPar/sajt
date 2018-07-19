import React from "react";
import "./Footer.css";

const FooterInput = ({ value }) => {

  const handleChange = e => {
    //store.dispatch(setTypingValue(e.target.value));
  };

  return (
    <form className="Footer">
      <input
        className="Footer__input"
        onChange={handleChange}
        value={value}
        placeholder="type something"
      />
    </form>
  );
};

export default FooterInput;