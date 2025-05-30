import React, { useEffect, useState } from "react";
// import "./level8.scss";
import edge from "../../assets/img/Microsoft_Edge_logo_(2019).svg";
import chrome from "../../assets/img/Google_Chrome_icon_(February_2022).svg";
import opera from "../../assets/img/Opera_2015_icon.svg";
import firefox from "../../assets/img/Firefox_logo,_2019.svg";
import arc from "../../assets/img/Arc_(browser)_logo.svg";
import brave from "../../assets/img/Brave-logo.svg";
import safari from "../../assets/img/Safari_browser_logo.svg";
import vivaldi from "../../assets/img/Vivaldi_web_browser_logo.svg";
import { getLevel, to, updateLevel } from "../../utils/stuff";
import { getHint, startLevel } from "../../utils/points";
import Poveste from "../../Pages/Poveste";
const fraza = {
  edge: ["0x73", "0x61", "0x20"],
  chrome: ["0x70", "0x65", "0x6e", "0x74", "0x72", "0x75", "0x20"],
  opera: ["0x61", "0x20"],
  firefox: ["0x66", "0x61", "0x63", "0x61", "0x20"],
  arc: ["0x6d", "0x61", "0x74", "0x65", "0x69", "0x20"],
  brave: ["0x73", "0x69", "0x74", "0x65", "0x2d", "0x75", "0x6c", "0x20"],
  safari: ["0x6c", "0x65", "0x76", "0x65", "0x6c", "0x75", "0x70"],
  vivaldi: ["0x6f", "0x62", "0x6f", "0x73", "0x69", "0x74", "0x20"],
};
function Level8({ uid, loading_comp }) {
  const random = () => {
    const randomNum = Math.floor(Math.random() * 1000);
    return randomNum;
  };
  const randomizeArray = (arr) => {
    const shuffledArray = [...arr].sort(() => Math.random() - 0.5);
    return shuffledArray;
  };
  const click = (casev) => {
    sessionStorage.clear();
    randomizeArray(fraza[casev]).map((el) => {
      sessionStorage.setItem(random(), el);
    });
  };
  const [val, setVal] = useState("");
  const check = () => {
    if (val.trim().toLowerCase() == process.env.REACT_APP_LEVEL_8) {
      updateLevel(uid, 9, "usor");
      alert("e ok");
      sessionStorage.clear();
      to("/level9");
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
          <div className="cerinta hint" onClick={() => hint(uid, getLevel())}>
            <img
              src={require("../../assets/img/styling/hint.svg").default}
              alt=""
            />
          </div>
          <Poveste />
          <div className="browsere">
            <img src={edge} alt="" onClick={() => click("edge")} />
            <img src={chrome} alt="" onClick={() => click("chrome")} />
            <img src={opera} alt="" onClick={() => click("opera")} />
            <img src={firefox} alt="" onClick={() => click("firefox")} />
            <img src={arc} alt="" onClick={() => click("arc")} />
            <img src={brave} alt="" onClick={() => click("brave")} />
            <img src={safari} alt="" onClick={() => click("safari")} />
            <img src={vivaldi} alt="" onClick={() => click("vivaldi")} />
          </div>
          <div className="submit">
            <input
              type="text"
              placeholder="Răspunsul tău..."
              onChange={(e) => setVal(e.target.value)}
            />
            <button onClick={check} className="button main">
              submit
            </button>
          </div>
          <img
            src="YW0gb2Jvc2l0IHNhIGZhYyBzaXRlLXVsbCBwZW50cnUgTGV2ZWxVcA=="
            alt=""
          />
        </div>
      ) : (
        <>Loading</>
      )}
    </div>
  );
}

export default Level8;
