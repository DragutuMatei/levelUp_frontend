import React, { useEffect, useState } from "react";
import { getLevel, to, updateLevel } from "../../utils/stuff";
import { startLevel, getHint } from "../../utils/points";
import Poveste from "../../Pages/Poveste";

function Level5({ uid, loading_comp }) {
  const [txt, setTxt] = useState("");
  let fileReader;

  const read = (e) => {
    setTxt(fileReader.result);
  };
  useEffect(() => {
    if (!loading_comp) startLevel(uid, getLevel());
  }, [, loading_comp]);

  const change = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = read;
    fileReader.readAsText(file);
  };

  const [val, setVal] = useState("");
  const check = () => {
    updateLevel(val.trim().toLowerCase(), uid, getLevel() + 1, "usor").then(
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
          <div className="cerinta hint" onClick={() => hint(uid, getLevel())}>
            <img
              src={require("../../assets/img/styling/hint.svg").default}
              alt=""
            />
          </div>
          <Poveste />

          <div className="center">
            <div className="title">
              <h1>Drop file to upload</h1>
            </div>

            <div className="dropzone">
              <img
                src="http://100dayscss.com/codepen/upload.svg"
                className="upload-icon"
              />
              <input
                type="file"
                className="upload-input"
                accept=".txt"
                onChange={(e) => change(e.target.files[0])}
              />
            </div>

            <h1>Urcă fișierul descarcat!</h1>
          </div>
          <br />
          <br />
          <p>
            {txt.split("_").length > 1
              ? txt
                  .split("_")
                  .slice(0, -1)
                  .join("_")
                  .split("")
                  .map((char, index) => {
                    return <span key={index}>{char}</span>;
                  })
              : txt.split("").map((char, index) => {
                  return <span key={index}>{char}</span>;
                })}
          </p>
          <div className="submit">
            <input
              type="text"
              onChange={(e) => setVal(e.target.value)}
              placeholder="Răspunsul tău.."
              value={val}
            />
            <button className="button main" onClick={check}>
              <span>Submit</span>
            </button>
          </div>
        </div>
      ) : (
        <>Loading</>
      )}{" "}
    </div>
  );
}

export default Level5;
