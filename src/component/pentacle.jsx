/** @format */

import React, { useState } from "react";
import "./pentacle.css";

const Pentacle = () => {
  const keys = [
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "ENTER",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
    "«",
  ];

  const [guessbox, setGuessbox] = useState([
    ["A", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  let currentrow = 0;
  let currenttail = 0;

  const handlekeystroke = (key) => {
    if (key != "ENTER" && key != "«") {
      console.log(guessbox[currentrow][currenttail]);
      setGuessbox[currentrow][currenttail] = key;
      console.log(guessbox[currentrow][currenttail]);

      currenttail = currenttail + 1;
      if (currenttail > 4) {
        currentrow = currentrow + 1;
        currenttail = 0;
      }
    }
  };

  return (
    <div className="gameContainer">
      <div className="titleContainer">
        <h1>Pentacle 5️⃣❎6️⃣</h1>
      </div>
      <div className="messageContainer"></div>
      <div className="matrixContainer">
        {guessbox.map((guessrow, i) => (
          <div id={"guessrow" + i}>
            {guessrow.map((guess, j) => (
              <div className="tile" id={"guessrow" + i + "guesstail" + j}>
                {guess}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="keyContainer">
        {keys.map((key, i) => (
          <button id={key} key={i} onClick={() => handlekeystroke(key)}>
            {key}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pentacle;
