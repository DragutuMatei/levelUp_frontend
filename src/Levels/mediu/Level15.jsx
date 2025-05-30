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
  //   await fetch("https://server-levelup.vercel.app/api/mission/start", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ userId: 101, mission: "alpha" }),
  //   });
  //   await fetch("https://server-levelup.vercel.app/user/upgrade", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ user: "x23", tier: 3, bonus: true }),
  //   });
  //   await fetch("https://server-levelup.vercel.app/sync/stats", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ hp: 78, xp: 1200 }),
  //   });
  //   await fetch("https://server-levelup.vercel.app/progress/checkpoint", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ checkpoint: 5, time: "12:03", success: true }),
  //   });
  //   await fetch("https://server-levelup.vercel.app/session/init", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ sessionId: "abc123" }),
  //   });
  //   await fetch("https://server-levelup.vercel.app/config/apply", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ theme: "dark", sound: false }),
  //   });
  //   await fetch("https://server-levelup.vercel.app/inventory/update", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ items: ["sword", "shield"], gold: 500 }),
  //   });
  //   await fetch("https://server-levelup.vercel.app/player/tag", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ player: "neo", tag: "veteran" }),
  //   });
  //   await fetch("https://server-levelup.vercel.app/skills/upgrade", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ skill: "stealth", level: 2, cooldown: 15 }),
  //   });
  //   await fetch("https://server-levelup.vercel.app/quest/log", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ name: "Find the Ring", completed: false }),
  //   });
  //   await fetch("https://server-levelup.vercel.app/map/reveal", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ zone: "North", fogCleared: true }),
  //   });
  //   await fetch("https://server-levelup.vercel.app/settings/update", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ time: Date.now(), user: "test@test.test" }),
  //   });
  //   await fetch("https://server-levelup.vercel.app/enemy/alert", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ enemyType: "orc", count: 3 }),
  //   });
  //   await fetch("https://server-levelup.vercel.app/achievement/unlock", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ id: "achv-77", stars: 2 }),
  //   });
  //   await fetch("https://server-levelup.vercel.app/world/weather", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       region: "Valley",
  //       weather: "Rainy",
  //       duration: 30,
  //     }),
  //   });
  //   await fetch("https://server-levelup.vercel.app/settings/audio", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ volume: 0.8, mute: false }),
  //   });
  //   await fetch("https://server-levelup.vercel.app/player/teleport", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ x: 150, y: 80, zone: "Ruins" }),
  //   });
  //   await fetch("https://server-levelup.vercel.app/pet/command", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ command: "sit", petId: "dog01" }),
  //   });
  //   await fetch("https://server-levelup.vercel.app/battle/report", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ result: "win", turns: 5, damageTaken: 12 }),
  //   });
  //   await fetch("https://server-levelup.vercel.app/trade/offer", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ offer: ["gem", "scroll"], request: ["key"] }),
  //   });
  //   await fetch("https://server-levelup.vercel.app/puzzle/solve", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ puzzleId: 9, correct: true, timeTaken: 42 }),
  //   });
  // };
  //   test();

  const [val, setVal] = useState();

  useEffect(() => {
    if (!loading_comp) startLevel(uid, getLevel());
  }, [, loading_comp]);

  const check = () => {
    updateLevel(val.trim().toLowerCase(), uid, getLevel() + 1, "mediu").then(
      (res) => {
        if (res.data.ok) {
          alert(res.data.message);
          to(`/level${getLevel() + 1}`);
        } else {
          setSee(false);
          alert(res.data.message);
        }
      }
    );
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
