import React, { useEffect, useState } from "react";
import { getLevel, to, updateLevel } from "../../utils/stuff";
import { getHint, startLevel } from "../../utils/points";
import Poveste from "../../Pages/Poveste";

function Level10({ uid, loading_comp }) {
  const [value, setValue] = useState("");
  const [sol, setSol] = useState("");
    useEffect(() => {
      if (!loading_comp)
        startLevel(uid, getLevel()).then((res) => {
          setSol(res);
        });
    }, [, loading_comp]);
  const check = () => {
    if (value.trim().toLowerCase() ==sol) {
      updateLevel(uid, 11, "usor");
      alert("e ok");
      to("/level11");
    } else {
      alert("nu e ok");
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
          <Poveste />
          <div className="cerinta hint" onClick={() => hint(uid, getLevel())}>
            <img
              src={require("../../assets/img/styling/hint.svg").default}
              alt=""
            />
          </div>
          <div className="submit">
            <input
              type="text"
              placeholder="Răspunsul tău..."
              onChange={(e) => setValue(e.target.value)}
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

export default Level10;
