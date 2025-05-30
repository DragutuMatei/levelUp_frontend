import React, { useEffect, useState } from "react";
import image from "../../assets/img/wap_conv.png";
import "../../assets/css/style.scss";
import { getLevel, to, updateLevel } from "../../utils/stuff";
import { startLevel, getHint } from "../../utils/points";
import Poveste from "../../Pages/Poveste";

function Level3({ uid, loading_comp }) {
  const [value, setValue] = useState("");

  const evaluete = (val) => {
    const vall = val.trim().toLowerCase();
    updateLevel(vall, uid, getLevel() + 1, "usor").then((res) => {
      if (res.data.ok) {
        alert(res.data.message);
        to(`/level${getLevel() + 1}`);
      } else {
        alert(res.data.message);
        setValue("");
      }
    });
  };
  useEffect(() => {
    if (!loading_comp) {
      startLevel(uid, getLevel());
    }
  }, [, loading_comp]);
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
        <div className="level3">
          <div className="cerinta hint" onClick={() => hint(uid, getLevel())}>
            <img
              src={require("../../assets/img/styling/hint.svg").default}
              alt=""
            />
          </div>
          <Poveste />
          <div className="content">
            <img src={image} />
            <div className="submit">
              <input
                type="text"
                placeholder="Răspunsul tău.."
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <button className="button main" onClick={() => evaluete(value)}>
                <span>Submit</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
}

export default Level3;
