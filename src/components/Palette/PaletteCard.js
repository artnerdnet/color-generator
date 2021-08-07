import React from "react";

/* 
  Your palette card now is isolated from
  any logic and can be reused anywhere as
  long as you pass the needed props:
  action (on click handler), displayedColor and hexColor
*/

const PaletteCard = ({ action, displayedColor, hexColor }) => {
  return (
    <>
      <div
        className="palette__card"
        onClick={(e) => {
          action(e);
        }}
      >
        <div className="palette__card-color" style={displayedColor}></div>
        <span>{hexColor}</span>
      </div>
    </>
  );
};

export default PaletteCard;
