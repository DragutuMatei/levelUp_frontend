import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLevel, to, updateLevel } from "../../utils/stuff";
import { getHint, startLevel } from "../../utils/points";
import Poveste from "../../Pages/Poveste";

const BASE_WORDS = [
  "Roboti",
  "Autonomie",
  "Mecatronica",
  "Senzori",
  "Actuatori",
  "ROS",
  "Swarm",
  "Colaborativi",
  "Haptica",
  "Bionica",
  "AI",
  "ML",
  "Neurale",
  "DeepLearning",
  "ComputerVision",
  "NLP",
  "Predictiv",
  "Generativ",
  "Reinforcement",
  "Automata",
  "Embedded",
  "IoT",
  "3DPrinting",
  "Prototipare",
  "DigitalTwin",
  "Cibernetica",
  "Retele",
  "Cloud",
  "Securitate",
  "Simulare",
];

const WORDS = BASE_WORDS.map((w) => `${w}.com`);

function getRandomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)].toLowerCase();
}

const MAX_TRIES = 15;
const TIMER_DURATION = 90; // secunde

export default function Level3({ uid, loading_comp }) {
  const navigate = useNavigate();
  const [word, setWord] = useState(getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [triesLeft, setTriesLeft] = useState(MAX_TRIES);
  const [timer, setTimer] = useState(TIMER_DURATION);
  const [hiddenButtons, setHiddenButtons] = useState([]);

  useEffect(() => {
    if (!loading_comp) {
      startLevel(uid, getLevel());
    }
  }, [, loading_comp]);

  const maskedWord = word
    .split("")
    .map((char) =>
      char === "." ? "." : guessedLetters.includes(char) ? char : "_"
    )
    .join(" ");

  useEffect(() => {
    if (timer === 0) {
      resetGame();
    }
    const countdown = setInterval(() => {
      //   console.log(word);
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  const resetGame = () => {
    setWord(getRandomWord());
    setGuessedLetters([]);
    setTriesLeft(MAX_TRIES);
    setTimer(TIMER_DURATION);
    setHiddenButtons([]);
  };

  const handleGuess = (letter) => {
    if (guessedLetters.includes(letter) || triesLeft === 0 || timer === 0)
      return;

    setGuessedLetters((prev) => [...prev, letter]);

    // Ascunde o alta litera random neapasata
    // const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    // const remaining = alphabet.filter(
    //   (l) =>
    //     !guessedLetters.includes(l) &&
    //     l !== letter &&
    //     !hiddenButtons.includes(l)
    // );
    // if (remaining.length > 0) {
    //   const toHide = remaining[Math.floor(Math.random() * remaining.length)];
    //   setHiddenButtons((prev) => [...prev, toHide]);
    // }

    // if (!word.includes(letter)) {
    //   setTriesLeft((prev) => prev - 1);
    // }
  };

  useEffect(() => {
    const hasWon = word
      .split("")
      .every((char) => guessedLetters.includes(char) || char === ".");
    if (hasWon) {
      sessionStorage.setItem("site", word);
      updateLevel(uid, 14, "mediu");
      alert("e ok");
      to("/level14");
      // alert("e ok");
      // navigate("/level14");
    } else if (triesLeft === 0) {
      setTimeout(resetGame, 2000);
    }
  }, [guessedLetters, triesLeft, word, navigate]);

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
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
          <div className="content">
            <h1 className="span_info">Spanzuratoarea</h1>
            <p className="span_info">Ghici cuvantul: {maskedWord}</p>
            <p className="span_info">Incercari ramase: {triesLeft}</p>
            <p className="span_info">Timp ramas: {timer} secunde</p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginTop: "1rem",
            }}
          >
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => handleGuess(letter)}
                disabled={guessedLetters.includes(letter)}
                style={{
                  padding: "0.5rem",
                  width: "2rem",
                  textTransform: "uppercase",
                  display: hiddenButtons.includes(letter)
                    ? "none"
                    : "inline-block",
                }}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>Loading</>
      )}
    </div>
  );
}
