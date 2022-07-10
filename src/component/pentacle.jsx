/** @format */

import React, { useState } from "react";
import "./pentacle.css";

let currentrow = 0;
let currenttail = 0;
let isgameover = false;
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
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);
  const [message, setMessage] = useState("");

  const handlekeystroke = (key) => {
    if (key !== "ENTER" && key !== "«" && currenttail < 5 && currentrow < 6) {
      let temp = [...guessbox];
      temp[currentrow][currenttail] = key;
      setGuessbox(temp);
      currenttail++;
      //   if (currenttail > 4) {
      //     currentrow = currentrow + 1;
      //     currenttail = 0;
      //   }
    } else if (key === "«" && currenttail >= 0) {
      let temp = [...guessbox];
      temp[currentrow][currenttail - 1] = "";
      setGuessbox(temp);
      currenttail--;
    } else if (key === "ENTER") {
      if (currenttail > 4) {
        const guess = guessbox[currentrow].join("");
        if (guess === "SUPER") {
          showmessage("You Done it");
          isgameover = true;
        } else {
          currentrow++;
          currenttail = 0;
          if (currentrow >= 5) {
            isgameover = false;
            showmessage("Game over");
            return;
          }
        }
      } else {
        showmessage("5 Letter are not completed");
      }
    }
  };

  const showmessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="gameContainer">
      <div className="titleContainer">
        <h1>Pentacle 5️⃣❎6️⃣</h1>
      </div>
      <div className="messageContainer">
        {message.length > 0 ? <p>{message}</p> : <></>}
      </div>
      <div className="matrixContainer">
        {guessbox.map((guessrow, i) => (
          <div id={"guessrow" + i}>
            {guessrow.map((guess, j) => (
              <div
                className="tile"
                data={guess}
                id={"guessrow" + i + "guesstail" + j}
              >
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
