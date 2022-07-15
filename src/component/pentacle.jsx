/** @format */

import React, { useState, useRef, useEffect } from "react";
import "./pentacle.css";
import axios from "axios";

let currentrow = 0;
let currenttail = 0;
let isgameover = false;
let wordle = "SUPER";
const mapof = new Map();

const Pentacle = () => {
  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://random-words5.p.rapidapi.com/getMultipleRandom",
      params: { count: "10", wordLength: "5" },
      headers: {
        "X-RapidAPI-Key": "64e42d7f20msh7dc25fd3d8c3430p1db62ajsn8087ee9eec51",
        "X-RapidAPI-Host": "random-words5.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then((response) => {
        wordle =
          response.data[
            Math.floor(Math.random() * response.data.length)
          ].toUpperCase();
      })
      .catch((error) => {
        console.error(error);
      });

    var inter = wordle.split("");
    inter.map((r) => {
      if (mapof.has(r)) {
        mapof.set(r, mapof.get(r) + 1);
      } else {
        mapof.set(r, 1);
      }
    });
    setGuessbox([
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ]);
  }, []);

  const isword = async (word) => {
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const resp = await fetch(url);
    return resp.status;
  };

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

  // const [guessbox, setGuessbox] = useState([
  //   ["", "", "", "", ""],
  //   ["", "", "", "", ""],
  //   ["", "", "", "", ""],
  //   ["", "", "", "", ""],
  //   ["", "", "", "", ""],
  // ]);

  const [guessbox, setGuessbox] = useState(Array(6).fill(Array(5).fill("")));

  const [message, setMessage] = useState("");
  const [enable, setEnable] = useState([0, 0, 0, 0, 0, 0]);
  // const [arraycolor, setArrayColor] = useState([
  //   ["tile", "tile", "tile", "tile", "tile"],
  //   ["tile", "tile", "tile", "tile", "tile"],
  //   ["tile", "tile", "tile", "tile", "tile"],
  //   ["tile", "tile", "tile", "tile", "tile"],
  //   ["tile", "tile", "tile", "tile", "tile"],
  //   ["tile", "tile", "tile", "tile", "tile"],
  // ]);
  const [arraycolor, setArrayColor] = useState(
    Array(6).fill(Array(5).fill("tile"))
  );

  const isit = (row, index) => {
    let temp = [...arraycolor];

    row.map((r, i) => {
      if (r == wordle[i]) {
        temp[index][i] = "tile green-overlay";
      } else if (mapof.get(r) > 0) {
        temp[index][i] = "tile yellow-overlay";
        mapof.set(r, mapof.get(r) - 1);
      } else {
        temp[index][i] = "tile grey-overlay";
      }
    });

    setArrayColor(temp);
  };

  const handlekeystroke = async (key) => {
    if (key !== "ENTER" && key !== "«" && currenttail < 5 && currentrow < 6) {
      let temp = [...guessbox];
      temp[currentrow][currenttail] = key;
      setGuessbox(temp);
      currenttail++;
    } else if (key === "«" && currenttail >= 0) {
      let temp = [...guessbox];
      temp[currentrow][currenttail - 1] = "";
      setGuessbox(temp);
      currenttail--;
    } else if (key === "ENTER") {
      if (currenttail > 4) {
        const guess = guessbox[currentrow].join("");
        const result = await isword(guess);

        if (result === 200) {
          const inter = [...enable];
          inter[currentrow] = 1;
          isit(guessbox[currentrow], currentrow);
          setEnable(inter);
          if (guess === wordle) {
            showmessage("You Done it", 10000);
            isgameover = true;
          } else {
            currentrow++;
            currenttail = 0;
            if (currentrow >= 5) {
              isgameover = false;
              showmessage(`Game over it is ${wordle}`, 100000);
              return;
            }
          }
        } else {
          showmessage("Not a word", 4000);
        }
      } else {
        showmessage("5 Letter are not completed", 3000);
      }
    }
  };

  const showmessage = (msg, tym) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), tym);
  };

  return (
    <div className="gameContainer">
      <div className="titleContainer">
        <h1>Pentacle 5️⃣❎6️⃣</h1>
      </div>
      <div className="messageContainer">
        {message.length > 0 ? <p>{message}</p> : <></>}
      </div>
      <div className="matrixContainer ">
        {guessbox.map((guessrow, i) => {
          return (
            <div id={"guessrow" + i}>
              {guessrow.map((guess, j) => (
                <div
                  // className={
                  //   enable[i] === 1
                  //     ? wordle[j] === guess
                  //       ? "tile green-overlay"
                  //       : wordle.includes(guess)
                  //       ? "tile yellow-overlay"
                  //       : "tile grey-overlay"
                  //     : "tile"
                  // }
                  className={arraycolor[i][j]}
                  id={"guessrow" + i + "guesstail" + j}
                >
                  {guess}
                </div>
              ))}
            </div>
          );
        })}
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
