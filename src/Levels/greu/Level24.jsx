import React, { useEffect, useState } from "react";
import AXIOS from "../../utils/Axios_config.js";
import { getLevel, to, updateLevel } from "../../utils/stuff";
import { getHint, startLevel } from "../../utils/points.js";
import Poveste from "../../Pages/Poveste.jsx";
import { Link } from "react-router-dom";

function Level24({ uid, loading_comp }) {
  const [text, setText] = useState("");

  const check = () => {
    if (
      text.trim().toLowerCase() === process.env.REACT_APP_LEVEL_24_V1 ||
      text.trim().toLowerCase() === process.env.REACT_APP_LEVEL_24_V2
    ) {
      updateLevel(uid, 25, "greu");
      alert("e ok");
      to("/level25");
    } else {
      alert("nu e ok!");
    }
  };
  const hint = async (uid, level) => {
    await getHint(uid, level).then((res) => {
      if (res.data.ok) {
        alert(res.data.hint);
      } else {
        alert(res.data.message);
      }
    });
  };
  useEffect(() => {
    if (!loading_comp) {
      startLevel(uid, getLevel());
    }
  }, [, loading_comp]);

  return (
    <div className="level">
      {!loading_comp ? (
        <div className="level2">
          <Poveste />
          <div className="cerinta hint" onClick={() => hint(uid, getLevel())}>
            <img
              src={require("../../assets/img/styling/hint.svg").default}
              alt=""
            />
          </div>
          <img
            style={{ width: 500 }}
            src={require("../../assets/img/encoded.png")}
            alt=""
          />
          <br />
          <a href={require("../../assets/img/encoded.png")} download={true}>
            Dowloadează imaginea
          </a>

          <a
            style={{ display: "none" }}
            href={require("./Decode.py")}
            download={true}
          >
            Dowloadează imaginea
          </a>

          <div className="submit">
            <input
              type="text"
              placeholder="Răspunsul tău..."
              onChange={(e) => setText(e.target.value)}
            />
            <button className="button main" onClick={check}>
              check
            </button>
          </div>
        </div>
      ) : (
        <>Loading</>
      )}
    </div>
  );
}

export default Level24;
