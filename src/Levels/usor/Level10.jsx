import React, { useEffect, useState } from "react";
import { getLevel, to, updateLevel } from "../../utils/stuff";
import { getHint, startLevel } from "../../utils/points";
import Poveste from "../../Pages/Poveste";

function Level10({ uid, loading_comp }) {
  const [value, setValue] = useState(""); 
  useEffect(() => {
    if (!loading_comp)
      startLevel(uid, getLevel()) 
  }, [, loading_comp]);
  const check = () => {
    updateLevel(value.trim().toLowerCase(), uid, getLevel() + 1, "usor").then(
      (res) => {
        if (res.data.ok) {
          alert(res.data.message);
          to(`/level${getLevel() + 1}`);
        } else {
          alert(res.data.message);
        }
      }
    );
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
