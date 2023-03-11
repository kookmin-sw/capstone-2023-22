import React from "react";
import './StyledButton.css';

function StyledButton( { text, link } ) {
  return (
    <button
      className="StyledButton"
      onClick={() => {
        window.open(`${link}`, '_blank');
      }}
      >{text}
      </button>
  );
}

export default StyledButton;
