import React, { useState, useEffect, useRef } from "react";
import { getLevel, to, updateLevel } from "../../utils/stuff";
import { getHint, startLevel } from "../../utils/points";
import Poveste from "../../Pages/Poveste";
import audio from "./record.mp4";

const Level7 = ({ uid, loading_comp }) => {
  const [audioContext, setAudioContext] = useState(null);
  const audioSourceRef = useRef(null);
  const [audioBuffer, setAudioBuffer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const fileInputRef = useRef(null);
  const [text, setText] = useState("");
  const check = () => {
    if (text.toLowerCase().trim() === process.env.REACT_APP_LEVEL_7) {
      updateLevel(uid, 8, "usor");
      alert("e ok");
      to("/level8");
    } else {
      alert("nu e ok");
      setText("");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("download")) {
      var link = document.createElement("a");
      link.download = true;
      link.href = audio;
      link.click();
      link.remove();

      localStorage.setItem("download", "true");
    }
    if (!loading_comp) startLevel(uid, getLevel());
  }, [, loading_comp]);
  // Noduri audio
  const nodes = useRef({});

  const [effects, setEffects] = useState({
    volume: 0.8,
    distortion: 0.4,
    lowPass: 20000,
    highPass: 20,
    delayTime: 0.2,
    delayFeedback: 0.4,
    pan: 0,
    pitch: 1,
    bitcrusher: 1,
    tremolo: 0.5,
    fmMod: 0.2,
  });

  useEffect(() => {
    const initAudio = () => {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      setAudioContext(context);

      // Creare noduri
      nodes.current.gain = context.createGain();
      nodes.current.lowPass = context.createBiquadFilter();
      nodes.current.highPass = context.createBiquadFilter();
      nodes.current.delay = context.createDelay();
      nodes.current.feedback = context.createGain();
      nodes.current.panner = context.createStereoPanner();
      nodes.current.distortion = context.createWaveShaper();
      nodes.current.tremoloGain = context.createGain();
      nodes.current.tremoloOsc = context.createOscillator();

      // Tremolo config
      nodes.current.tremoloOsc.frequency.value = 5;
      nodes.current.tremoloGain.gain.value = effects.tremolo;
      nodes.current.tremoloOsc.connect(nodes.current.tremoloGain.gain);
      nodes.current.tremoloOsc.start();

      // Config filtre
      nodes.current.lowPass.type = "lowpass";
      nodes.current.highPass.type = "highpass";

      // Delay feedback
      nodes.current.feedback.connect(nodes.current.delay);
      nodes.current.delay.connect(nodes.current.feedback);

      // Conectare în lanț
      nodes.current.distortion.connect(nodes.current.lowPass);
      nodes.current.lowPass.connect(nodes.current.highPass);
      nodes.current.highPass.connect(nodes.current.delay);
      nodes.current.delay.connect(nodes.current.panner);
      nodes.current.panner.connect(nodes.current.tremoloGain);
      nodes.current.tremoloGain.connect(nodes.current.gain);
      nodes.current.gain.connect(context.destination);
    };

    if (!audioContext) initAudio();

    return () => {
      if (audioContext && audioContext.state !== "closed") {
        audioContext.close();
      }
    };
  }, []);

  useEffect(() => {
    if (!audioContext) return;

    nodes.current.gain.gain.value = effects.volume;
    nodes.current.lowPass.frequency.value = effects.lowPass;
    nodes.current.highPass.frequency.value = effects.highPass;
    nodes.current.delay.delayTime.value = effects.delayTime;
    nodes.current.feedback.gain.value = effects.delayFeedback;
    nodes.current.panner.pan.value = effects.pan;
    nodes.current.distortion.curve = makeDistortionCurve(
      effects.distortion * 100
    );
    nodes.current.tremoloGain.gain.value = effects.tremolo;
  }, [effects, audioContext]);

  const makeDistortionCurve = (amount) => {
    const k = typeof amount === "number" ? amount : 50;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !audioContext) return;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = await audioContext.decodeAudioData(arrayBuffer);
    setAudioBuffer(buffer);
  };

  const togglePlayback = () => {
    if (!audioContext || !audioBuffer) return;

    if (isPlaying) {
      audioSourceRef.current.stop();
      setIsPlaying(false);
    } else {
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.playbackRate.value = effects.pitch;
      source.connect(nodes.current.distortion);
      audioSourceRef.current = source;
      source.start();
      setIsPlaying(true);

      source.onended = () => {
        setIsPlaying(false);
        audioSourceRef.current = null;
      };
    }
  };

  const handleEffectChange = (key, val) => {
    setEffects((prev) => ({
      ...prev,
      [key]: parseFloat(val),
    }));
  };

  const sliders = {
    volume: [0, 1, 0.01],
    distortion: [0, 1, 0.01],
    lowPass: [20, 20000, 1],
    highPass: [20, 2000, 1],
    delayTime: [0, 1, 0.01],
    delayFeedback: [0, 1, 0.01],
    pan: [-1, 1, 0.01],
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
          <Poveste />
          <div className="cerinta hint" onClick={() => hint(uid, getLevel())}>
            <img
              src={require("../../assets/img/styling/hint.svg").default}
              alt=""
            />
          </div>
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
                className="upload-input"
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
              />
            </div>
            <h1>Urcă fișierul descarcat!</h1>
          </div>
          <br />
          <button
            className="button second"
            onClick={togglePlayback}
            disabled={!audioBuffer}
          >
            <h1>{isPlaying ? "Stop" : "Play"}</h1>
          </button>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 12,
              marginTop: 20,
            }}
          >
            {Object.entries(sliders).map(([key, [min, max, step]]) => (
              <div key={key}>
                <label>
                  {key}:{" "}
                  {effects[key] !== undefined
                    ? effects[key].toFixed(2)
                    : "0.00"}
                </label>
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={effects[key] || 0}
                  onChange={(e) => handleEffectChange(key, e.target.value)}
                  style={{ width: "100%" }}
                />
              </div>
            ))}
          </div>
          <div className="submit">
            <input
              type="text"
              placeholder="Răspunsul tău.."
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <button className="button main" onClick={check}>
              <span>Submit</span>
            </button>
          </div>
        </div>
      ) : (
        <>Loading</>
      )}
    </div>
  );
};

export default Level7;
