import React, { useEffect, useState } from "react";
import { getLevel, to, updateLevel } from "../../utils/stuff";
import { getHint, startLevel } from "../../utils/points";
import Poveste from "../../Pages/Poveste";

function Level15({ uid, loading_comp }) {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");

  const charracters = ["[", "]", "!", "+"];

  const handleExecute = () => {
    try {
      // code.split("").forEach((char) => {
      //   if (charracters.includes(char)) {
      //     // alert("Nope:)");
      //     return;
      //   }
      // });
      const func = new Function(code); // creates a function from the input
        func(); // execute it
      setSee(true);
    } catch (error) {
      alert("Error: " + error.message);
      setResult("Error: " + error.message);
    }
  };

  // const test = async () => {
  //   await fetch("http://localhost:3001/api/mission/start", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ userId: 101, mission: "alpha" }),
  //   });
  //   await fetch("http://localhost:3001/user/upgrade", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ user: "x23", tier: 3, bonus: true }),
  //   });
  //   await fetch("http://localhost:3001/sync/stats", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ hp: 78, xp: 1200 }),
  //   });
  //   await fetch("http://localhost:3001/progress/checkpoint", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ checkpoint: 5, time: "12:03", success: true }),
  //   });
  //   await fetch("http://localhost:3001/session/init", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ sessionId: "abc123" }),
  //   });
  //   await fetch("http://localhost:3001/config/apply", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ theme: "dark", sound: false }),
  //   });
  //   await fetch("http://localhost:3001/inventory/update", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ items: ["sword", "shield"], gold: 500 }),
  //   });
  //   await fetch("http://localhost:3001/player/tag", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ player: "neo", tag: "veteran" }),
  //   });
  //   await fetch("http://localhost:3001/skills/upgrade", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ skill: "stealth", level: 2, cooldown: 15 }),
  //   });
  //   await fetch("http://localhost:3001/quest/log", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ name: "Find the Ring", completed: false }),
  //   });
  //   await fetch("http://localhost:3001/map/reveal", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ zone: "North", fogCleared: true }),
  //   });
  //   await fetch("http://localhost:3001/settings/update", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ time: Date.now(), user: "test@test.test" }),
  //   });
  //   await fetch("http://localhost:3001/enemy/alert", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ enemyType: "orc", count: 3 }),
  //   });
  //   await fetch("http://localhost:3001/achievement/unlock", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ id: "achv-77", stars: 2 }),
  //   });
  //   await fetch("http://localhost:3001/world/weather", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       region: "Valley",
  //       weather: "Rainy",
  //       duration: 30,
  //     }),
  //   });
  //   await fetch("http://localhost:3001/settings/audio", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ volume: 0.8, mute: false }),
  //   });
  //   await fetch("http://localhost:3001/player/teleport", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ x: 150, y: 80, zone: "Ruins" }),
  //   });
  //   await fetch("http://localhost:3001/pet/command", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ command: "sit", petId: "dog01" }),
  //   });
  //   await fetch("http://localhost:3001/battle/report", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ result: "win", turns: 5, damageTaken: 12 }),
  //   });
  //   await fetch("http://localhost:3001/trade/offer", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ offer: ["gem", "scroll"], request: ["key"] }),
  //   });
  //   await fetch("http://localhost:3001/puzzle/solve", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ puzzleId: 9, correct: true, timeTaken: 42 }),
  //   });
  // };
  //   test();

  const [val, setVal] = useState();
  const check = () => {
    if (val.trim().toLowerCase() === process.env.REACT_APP_LEVEL_15) {
      updateLevel(uid, 16, "mediu");
      alert("e ok");
      to("/level16");
    } else {
      setSee(false);
      alert("e gresit");
    }
  };
  const [see, setSee] = useState(false);

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
    if (!loading_comp)
      startLevel(uid, getLevel())
      //   .catch((err) => {
      //   console.log(err);
      // });
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

          <textarea
            rows={10}
            cols={60}
            value={code}
            onClick={() => setSee(false)}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Write your function code here, e.g., return 2 + 2;"
          />
          <br />
          <button className="button second" onClick={handleExecute}>
            <h2>Execute</h2>
          </button>
          {see && (
            <div className="submit">
              <input type="text" onChange={(e) => setVal(e.target.value)} />
              <button className="button main" onClick={check}>
                <span>Submit</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <>Loading</>
      )}
    </div>
  );
}

export default Level15;
