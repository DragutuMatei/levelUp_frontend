import React, { useEffect, useState } from "react";
import { getLevel, to, updateLevel } from "../../utils/stuff";
import { getHint, startLevel } from "../../utils/points";
import Poveste from "../../Pages/Poveste";

function Level17({ uid, loading_comp }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!loading_comp)
      startLevel(uid, getLevel())
  }, [, loading_comp]);

  const check = () => {
    updateLevel(
      {
        rez1: username.trim().toLowerCase(),
        rez2: password.trim().toLowerCase(),
      },
      uid,
      getLevel() + 1,
      "mediu"
    ).then((res) => {
      if (res.data.ok) {
        alert(res.data.message);
        to(`/level${getLevel() + 1}`);
      } else {
        alert(res.data.message);
      }
    });
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
          <div className="form">
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="button main" onClick={check}>
              <span>Submit</span>
            </button>
          </div>
        </div>
      ) : (
        <>Loading</>
      )}
    </div>
  );
}

export default Level17;
