import React, { useState } from "react";
import MessageCopy from "../MessageCopy";
import useEventListener from "../hooks/useEventListener";
import PaletteCard from "./PaletteCard";
import { SPACE_KEYS, C_KEYS } from '../../utils/constants';
import { rgbToHex, copyToClipboard } from "../../utils/helpers";
const Palette = ({ palette, handleClick }) => {
  let arrayPalette = [];
  const [showResults, setShowResults] = useState(false);
  const [clickedColor, setClickedColor] = useState("");

  const copyColorToClipboard = (e) => {
    let currentColor = e.target.parentElement.innerText;
    setClickedColor(currentColor);
    copyToClipboard(currentColor);
    timerForShowResults();
  }

  const getArrayFromPalette = (newArr) => {
    return newArr;
  };

  const timerForShowResults = () => {
    setShowResults(true);
    const timer = setTimeout(() => {
      setShowResults(false);
    }, 2000);
    return () => clearTimeout(timer);
  };

  const handler = ({ key }) => {
    if (SPACE_KEYS.includes(String(key))) {
      handleClick();
    }
    if (C_KEYS.includes(String(key))) {
      navigator.clipboard.writeText(arrayPalette);
      setClickedColor("");
      timerForShowResults();
    }
  };

  useEventListener("keydown", handler);

  return (
    <>
      {showResults ? (
        <MessageCopy color={clickedColor} arrayPalette={arrayPalette} />
      ) : null}
      <div className="palette">
        {palette.map((item) => {
          let hexColor = rgbToHex(item[0], item[1], item[2]);
          let displayedColor = { backgroundColor: `${hexColor}` };
          arrayPalette.push(hexColor);
          getArrayFromPalette(arrayPalette);

          return (
            <PaletteCard action={copyColorToClipboard} hexColor={hexColor} displayedColor={displayedColor} />
          );
        })}
      </div>
    </>
  );
};

export default Palette;
