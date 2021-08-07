import React, { useState, useEffect } from "react";
import Palette from "./components/Palette/Palette";
import "./style/main.scss";

function App() {
  const [palette, setPalette] = useState([]);
  const [click, setClick] = useState(false);
  let url = "http://colormind.io/api/";
  let data = {
    model: "default",
  };

  const getData = (callback) => {
    const http = new XMLHttpRequest();
    http.onreadystatechange = function () {
      if (http.readyState === 4 && http.status === 200) {
        let data = JSON.parse(http.responseText).result;
        callback(undefined, data);
      } else if (http.readyState === 4) {
        callback("could not fetch the data", undefined);
      }
    };
    http.open("POST", url);
    http.send(JSON.stringify(data));
  };

  useEffect(() => {
    getData((err, data) => {
      setPalette(data);
      if (err) {
        console.log(err);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [click]);

  const handleClick = () => {
    setClick(!click);
  };

  return (
    <main className="main">
      <div className="container">
        <h1>Color palette generator</h1>
        <Palette palette={palette} handleClick={handleClick} />
        <button className="generate-btn" onClick={handleClick}>
          Generate palette
        </button>
        <p>Or just press the "Spacebar" to generate new palettes</p>
        <div className="copy">
          Click to copy individual color &middot; Press "C" to copy palette
        </div>
      </div>
    </main>
  );
}

export default App;
