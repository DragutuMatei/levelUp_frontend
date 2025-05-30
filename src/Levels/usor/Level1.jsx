import React, { useEffect, useState } from "react";
import "../../assets/css/style.scss";
import engineeringPrograms_init from "./ceva.js";
import { getLevel, to, updateLevel } from "../../utils/stuff.js";
import { startLevel, getHint } from "../../utils/points.js";
import Poveste from "../../Pages/Poveste.jsx";

function Level1({ uid, loading_comp }) {
  useEffect(() => {
    if (!loading_comp) startLevel(uid, getLevel());
  }, [, loading_comp]);
  const shuffleArray = (array) => {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  function extindeArray(original, N) {
    return Array.from({ length: N }, (_, i) => {
      const base = original[i % original.length];
      return {
        ...base,
        index: i + 1,
        name: `${base.name}`,
        nume: `${base.nume} ${i + 1}`,
      };
    });
  }

  const [engineeringPrograms, setEngineeringPrograms] = useState(
    shuffleArray(extindeArray(engineeringPrograms_init, 400))
  );

  const [filterNume, setFilterNume] = useState("");
  const [filterExtensie, setFilterExtensie] = useState("");
  const [filterMarime, setFilterMarime] = useState("");

  const numeOptions = [...new Set(engineeringPrograms.map((p) => p.nume))];
  const extensieOptions = [
    ...new Set(engineeringPrograms.map((p) => p.extensie)),
  ];
  const marimeOptions = [...new Set(engineeringPrograms.map((p) => p.marime))];

  const filteredPrograms = engineeringPrograms.filter((p) => {
    return (
      (filterNume ? p.nume === filterNume : true) &&
      (filterExtensie ? p.extensie === filterExtensie : true) &&
      (filterMarime ? p.marime === filterMarime : true)
    );
  });

  const click = (element) => {
    if (
      element.name === process.env.REACT_APP_LEVEL_1_V1 &&
      element.marime === process.env.REACT_APP_LEVEL_1_V2
    ) {
      updateLevel(uid, 2, "usor");
      alert("e ok");
      window.location = "/level2";
      // to("/level2");
    } else {
      alert("nu e ok");
      window.scrollTo(0, 0);
      setEngineeringPrograms(shuffleArray(engineeringPrograms));
    }
  };

  const hint = async (uid, level) => {
    // await getHint(uid, level).then((res) => {
    //   if (res.data.ok) {
    //     alert(res.data.hint);
    //   } else {
    //     alert(res.data.message);
    //   }
    // });

    fetch(`/.netlify/functions/getAnswer?level=1`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Răspuns corect:", data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="level">
      {!loading_comp ? (
        <>
          <div className="cerinta hint" onClick={() => hint(uid, getLevel())}>
            <img
              src={require("../../assets/img/styling/hint.svg").default}
              alt=""
            />
          </div>
          <Poveste />
          <div className="filtre">
            <label>
              <p>Filtru după nume:</p>
              <select
                value={filterNume}
                onChange={(e) => setFilterNume(e.target.value)}
              >
                <option value="">Toate</option>
                {numeOptions.map((nume) => (
                  <option key={nume} value={nume}>
                    {nume}
                  </option>
                ))}
              </select>
            </label>
            <label style={{ marginLeft: "1rem" }}>
              <p>Filtru după extensie:</p>
              <select
                value={filterExtensie}
                onChange={(e) => setFilterExtensie(e.target.value)}
              >
                <option value="">Toate</option>
                {extensieOptions.map((ext) => (
                  <option key={ext} value={ext}>
                    {ext}
                  </option>
                ))}
              </select>
            </label>{" "}
            <label style={{ marginLeft: "1rem" }}>
              <p>Filtru după marime:</p>
              <select
                value={filterExtensie}
                onChange={(e) => setFilterMarime(e.target.value)}
              >
                <option value="">Toate</option>
                {marimeOptions.map((ext) => (
                  <option key={ext} value={ext}>
                    {ext}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="elemente">
            {filteredPrograms.map((element) => (
              <div
                className="element"
                key={element.index}
                onClick={() => click(element)}
              >
                {element.svg}
                <div className="info">
                  <h3>
                    {element.name.split("_").length > 1
                      ? element.name
                          .split("_")
                          .slice(0, -1)
                          .join("_")
                          .split("")
                          .map((char, index) => {
                            return <span key={index}>{char}</span>;
                          })
                      : element.name.split("").map((char, index) => {
                          return <span key={index}>{char}</span>;
                        })}
                    {element.extensie}
                  </h3>
                  <p>
                    {element.nume.split("_").length > 1
                      ? element.nume
                          .split("_")
                          .slice(0, -1)
                          .join("_")
                          .split("")
                          .map((char, index) => {
                            return <span key={index}>{char}</span>;
                          })
                      : element.nume.split("").map((char, index) => {
                          return <span key={index}>{char}</span>;
                        })}
                  </p>
                  <p>
                    {element.marime.split("_").length > 1
                      ? element.marime
                          .split("_")
                          .slice(0, -1)
                          .join("_")
                          .split("")
                          .map((char, index) => {
                            return <span key={index}>{char}</span>;
                          })
                      : element.marime.split("").map((char, index) => {
                          return <span key={index}>{char}</span>;
                        })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
}

export default Level1;
