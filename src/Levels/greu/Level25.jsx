import React, { useEffect, useState } from "react";
import { getLevel, to, updateLevel } from "../../utils/stuff";
import AXIOS from "../../utils/Axios_config.js";
import { getHint, startLevel } from "../../utils/points.js";
import Poveste from "../../Pages/Poveste.jsx";

function Level25({ uid, loading_comp }) {
  const getData = async () => {
    await AXIOS.get("/api/getdata").then((res) => {
      console.log(res);
    });
  };
  useEffect(() => {
    getData();
  }, []);
  const [value, setValue] = useState(0);
  const check = () => {
    if (parseInt(value) === parseInt(process.env.REACT_APP_LEVEL_25)) {
      updateLevel(uid, 25, "greu");
      alert("e ok");
      to("/alege");
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
          <div className="submit">
            <input
              type="number"
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

export default Level25;
