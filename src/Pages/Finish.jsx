import React, { useEffect, useRef, useState } from "react";
import { getUserStats } from "../utils/stats";
import "../assets/css/style.scss";
import emailjs from "@emailjs/browser";

const options = {
  publicKey: process.env.REACT_APP_PUBLIC_KEY,
};
emailjs.init(options);

function Finish({ user, loading_comp }) {
  const stats = getUserStats(user);
  const form = useRef();

  function msToTime(duration) {
    var milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + ":" + milliseconds;
  }

  const submit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        form.current
      )
      .then(
        () => {
          alert("Mail trimis! Mulțumim!");
        },
        (error) => {
          alert(error);
        }
      );
  };

  return (
    <div className="level">
      {!loading_comp ? (
        <div className="level2">
          <div className="page">
            <ul className="userstats">
              <h1>Stats</h1>
              <li>Punctaj total: {stats.punctajTotal} </li>
              <li>Timp total: {msToTime(stats.timpTotal)} </li>
              <li>Media timpului/nivel: {msToTime(stats.mediaTimpPerNivel)}</li>
              <li>Cel mai rapid nivel rezolvat: {stats.celMaiRapidNivel} </li>
              <li>Cel mai greu nivel rezolvat: {stats.celMaiGreuNivel} </li>
              <li>Hinturi folosite: {stats.hinturiFolosite} </li>
            </ul>
            <form ref={form} onSubmit={submit}>
              <h1>Apreciem feedback-ul tău!</h1>
              <input type="hidden" name="email" value={user.email} />
              <input type="hidden" name="name" value={user.name} />
              <input
                type="hidden"
                name="time"
                value={`${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}  ${new Date().getHours()}:${new Date().getMinutes()}`}
              />
              <textarea
                name="message"
                id=""
                placeholder="Împărtășește cum ți s-a părut activitatea!"
              ></textarea>
              <button className="button main">
                <h2>Send</h2>
              </button>
            </form>
          </div>
        </div>
      ) : (
        <>Loading</>
      )}
    </div>
  );
}

export default Finish;
