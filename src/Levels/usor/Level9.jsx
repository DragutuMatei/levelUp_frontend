import React, { useEffect, useState } from "react";
import desktopIcons from "./alte.js";
import { getLevel, to, updateLevel } from "../../utils/stuff.js";
import { getHint, startLevel } from "../../utils/points.js";
import Poveste from "../../Pages/Poveste.jsx";

function Level9({ uid, loading_comp }) {
  const [date, setDate] = useState(desktopIcons);

  const randomizeArray = (arr) => {
    const shuffledArray = [...arr].sort(() => Math.random() - 0.5);
    return shuffledArray;
  };

  const click = (casev) => {
    updateLevel(
      `${casev}`.trim().toLowerCase(),
      uid,
      getLevel() + 1,
      "usor"
    ).then((res) => {
      if (res.data.ok) {
        var link = document.createElement("a");
        link.download = "name";
        link.href = require("../../assets/img/amin.png");
        link.click();
        link.remove();
        alert(res.data.message);
        to(`/level${getLevel() + 1}`);
      } else {
        alert(res.data.message);
        setDate(randomizeArray(date));
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
  useEffect(() => {
    if (!loading_comp) {
      startLevel(uid, getLevel());
    }
  }, [, loading_comp]);

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
          <Poveste />
          <div className="elemente">
            {randomizeArray(date).map((el, index) => {
              let ok = false;

              if (el.ok) {
                ok = true;
              }

              return (
                <div key={index} className="element" onClick={() => click(ok)}>
                  {el.svg}
                  <p>
                    {el.fileName.split("_").length > 1
                      ? el.fileName
                          .split("_")
                          .slice(0, -1)
                          .join("_")
                          .split("")
                          .map((char, index) => {
                            return <span key={index}>{char}</span>;
                          })
                      : el.fileName.split("").map((char, index) => {
                          return <span key={index}>{char}</span>;
                        })}
                    {el.extension}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <>Loading</>
      )}
    </div>
  );
}

export default Level9;
