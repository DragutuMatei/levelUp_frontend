import React, { useEffect, useState } from "react";
import { getLevel } from "../utils/stuff";
import { povesti, titluri_povesti } from "../utils/poveste";

function Poveste() {
  const [level, setLevel] = useState(getLevel());
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (localStorage.getItem(`poveste${level}`) === null) {
      localStorage.setItem(`poveste${level}`, "true");
      setShow(true);
    } else if (localStorage.getItem(`poveste${level}`) === "false") {
      setShow(false);
    }
  }, []); 

  const isSetStorage = () => {
    return localStorage.getItem(`poveste${level}`) === "true";
  };

  const close = () => {
    setShow(false);
    localStorage.setItem(`poveste${level}`, "false");
  };
  const story = () => {
    setShow(true);
    localStorage.setItem(`poveste${level}`, "true");
  };

  return (
    <>
      <div className="cerinta" onClick={story}>
        <img src={require("../assets/img/styling/book.svg").default} alt="" />
      </div>
      <div
        className="popup"
        style={{ display: show && isSetStorage() ? "flex" : "none" }}
      >
        <div className="inside">
          <h1>Continuare poveste:</h1>
          <p>{povesti[level - 1][0]}</p>
          <h1>Cerință:</h1>
          <p>{povesti[level - 1][1]}</p>
          <button className="button main" onClick={close}>
            <h2>Close</h2>
          </button>
        </div>
      </div>
    </>
  );
}

export default Poveste;
