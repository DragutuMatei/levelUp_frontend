import React, { useEffect, useState } from "react";
import { getLevel, to, updateLevel } from "../../utils/stuff";
import { startLevel, getHint } from "../../utils/points";
import Poveste from "../../Pages/Poveste";
import "../../assets/css/style.scss";

function Level2({ uid, loading_comp }) {
  const [value, setValue] = useState("");

  const [sol, setSol] = useState("");
    useEffect(() => {
      if (!loading_comp)
        startLevel(uid, getLevel()).then((res) => {
          setSol(res);
        });
    }, [, loading_comp]);
  const evaluete = (val) => {
    const vall = val.trim().toLowerCase();
    if (parseInt(sol) === 2000) {
      updateLevel(uid, 3, "usor");
      alert("e ok");
      window.location = "/level3";
    } else {
      alert("nu e ok");
      setValue("");
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
  return (
    <div className="level">
      {!loading_comp ? (
        <div className="level2">
          <div className="cerinta hint" onClick={() => hint(uid, getLevel())}>
            <img
              src={require("../../assets/img/styling/hint.svg").default}
              alt=""
            />
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: `<!-- Numarul contului este: 9DK5FD12BF10EB -->`,
            }}
          ></div>
          <Poveste />
          <div className="content">
            <a href={require("./evidenta.xlsx")} download={true}>
              Downloadeaza excelul
            </a>
          </div>
          <div className="submit">
            <input
              type="text"
              value={value}
              placeholder="Răspunsul tău.."
              onChange={(e) => setValue(e.target.value)}
            />
            <button className="button main" onClick={() => evaluete(value)}>
              <span>Submit</span>
            </button>
          </div>
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
}

export default Level2;
