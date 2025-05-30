import React, { useEffect, useState } from "react";
import { getLevel, to, updateLevel } from "../../utils/stuff";
import { getHint, startLevel } from "../../utils/points";
import Poveste from "../../Pages/Poveste";

function Level17({ uid, loading_comp }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
const [sol, setSol] = useState("");
  useEffect(() => {
    if (!loading_comp)
      startLevel(uid, getLevel()).then((res) => {
        setSol(res);
      });
  }, [, loading_comp]);

  const check = () => {
    if (
      username.trim().toLowerCase() === sol.split("~")[0] &&
      password.trim() === sol.split("~")[1]
    ) {
      updateLevel(uid, 18, "mediu");
      alert("e ok");
      to("/level18");
    } else {
      alert("e gresit");
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
