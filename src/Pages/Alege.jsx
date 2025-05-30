import React, { useEffect, useState } from "react";
import "../assets/css/style.scss";
import { suspecti } from "./suspecti";
import { ghicit } from "../utils/points";
import { to } from "../utils/stuff";

function Alege({ uid, loading_comp }) {
  const [display, setDisplay] = useState(true);
  const [display2, setDisplay2] = useState(false);
  const [pers, setPers] = useState({});
  const [corect, setCorect] = useState(false);
  const chose = (nume) => {
    setDisplay2(true);
    setPers(suspecti[nume]);
    ghicit(uid, nume);
    if (nume == "raducu") {
      setCorect(true);
    }
  };

  return (
    <div className="level">
      {!loading_comp ? (
        <div className="level2">
          <div className="popup" style={{ display: display ? "flex" : "none" }}>
            <div className="inside">
              <h1>Continuare poveste</h1>
              <p>
                Aici s-a legat totul. Andrei furase banii din asociație (sau îi
                folosise fără acord) pentru a cumpăra piese scumpe de
                imprimantă. Dar asta nu explică moartea lui. Explicația trebuie
                să fie legată de cine știa de acest lucru, cine a avut de
                suferit din cauza asta, cine a vrut să-l oprească sau să se
                răzbune. Sau poate cineva a descoperit furtul după crimă și a
                folosit ocazia să ia banii?
              </p>
              <p>
                Hanga a strâns toate dovezile: banii lipsă, disputa financiară
                cu Raducu (care poate știa de imprimantă?), mesajul ascuns de pe
                pagina facultății (cine comunica la acest nivel?), informațiile
                din background-ul lui Gio (ce a auzit la CADathon?), site-ul
                misterios, programul lui Andrei din ziua crimei, apelul
                fragmentat al lui Matei, virusul lui Raducu... Fiecare piesă era
                o rază de lumină într-un puzzle întunecat, dar imaginea completă
                era încă neclară. Cine dintre oamenii din OSFIIR, dintre cei
                apropiați lui Andrei, a avut un motiv suficient de puternic
                pentru a-l ucide și a luat banii? Toate indiciile par să se lege
                de fondurile asociatiei si de actiunile lui Andrei legate de
                acestea, dar cine a fost cel care a escaladat situatia pana la
                crima?
              </p>
              <p>
                Acum este rândul tău! Ai urmat pașii lui Hanga, ai văzut toate
                dovezile. Cine crezi că l-a ucis pe Andrei Diaconu și de ce?
              </p>
              <button className="button main" onClick={() => setDisplay(false)}>
                <h2>Close</h2>
              </button>
            </div>
          </div>
          <div
            className="popup"
            style={{ display: display2 ? "flex" : "none" }}
          >
            <div className="inside final">
              <h1>Argumente PRO vinovăție:</h1>
              <ul>
                {pers?.pro?.map((p) => (
                  <li>{p}</li>
                ))}
              </ul>
              <h1>Argumente CONTRA vinovăție:</h1>
              <ul>
                {pers?.contra?.map((p) => (
                  <li>{p}</li>
                ))}
              </ul>
              <h2>
                Verdict: <b>{pers?.vinovat ? "VINOVAT" : "NEVINOVAT"}!</b>
              </h2>
              <button
                className="button main"
                onClick={() => {
                  setDisplay2(false);
                  if (corect) {
                    to("/finish");
                  }
                }}
              >
                <h2>Close</h2>
              </button>
            </div>
          </div>
          <div className="pers">
            <div className="person">
              <img src={require("../assets/img/styling/hanga.jpeg")} alt="" />
              <h1>Hanga Mihail</h1>
              <button className="button main" onClick={() => chose("hanga")}>
                <h1>Alege</h1>
              </button>
            </div>
            <div className="person">
              <img src={require("../assets/img/styling/raducu.jpeg")} alt="" />
              <h1>Radu Aciobăniței</h1>
              <button className="button main" onClick={() => chose("raducu")}>
                <h1>Alege</h1>
              </button>
            </div>
            <div className="person">
              <img src={require("../assets/img/styling/gio.jpg")} alt="" />
              <h1>Georgiana Tudose</h1>
              <button className="button main" onClick={() => chose("gio")}>
                <h1>Alege</h1>
              </button>
            </div>
            <div className="person">
              <img src={require("../assets/img/styling/matei.jpeg")} alt="" />
              <h1>Drăguțu Matei</h1>
              <button className="button main" onClick={() => chose("matei")}>
                <h1>Alege</h1>
              </button>
            </div>
            <div className="person">
              <img src={require("../assets/img/styling/tudorica.jpg")} alt="" />
              <h1>Alex Tudorică</h1>
              <button className="button main" onClick={() => chose("alex")}>
                <h1>Alege</h1>
              </button>
            </div>
            <div className="person">
              <img src={require("../assets/img/styling/lexi.jpg")} alt="" />
              <h1>Alexandra Ionesc</h1>
              <button className="button main" onClick={() => chose("lexi")}>
                <h1>Alege</h1>
              </button>
            </div>
            <div className="person">
              <img src={require("../assets/img/styling/raul.jpg")} alt="" />
              <h1>Raul Matei</h1>
              <button className="button main" onClick={() => chose("raul")}>
                <h1>Alege</h1>
              </button>
            </div>
            <div className="person">
              <img src={require("../assets/img/styling/ana.jpeg")} alt="" />
              <h1>Ana Burtoiu</h1>
              <button className="button main" onClick={() => chose("ana")}>
                <h1>Alege</h1>
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

export default Alege;
