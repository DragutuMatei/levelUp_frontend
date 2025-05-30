import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useAuth } from "../../utils/AuthContext";
import { getLevel, to, updateLevel } from "../../utils/stuff";
import { startLevel, getHint } from "../../utils/points";
import Poveste from "../../Pages/Poveste";

const effectsList = [
  { name: "pixelate", type: "checkbox" },
  { name: "noise", type: "checkbox" },
  { name: "opacity", type: "checkbox" },
  { name: "blur", type: "slider", min: 0, max: 30, initial: 25 },
  { name: "scale", type: "slider", min: 0.1, max: 5, step: 0.01, initial: 1.5 },
  { name: "skew", type: "checkbox" },
  { name: "invert", type: "checkbox" },
  { name: "grayscale", type: "checkbox" },
  {
    name: "brightness",
    type: "slider",
    min: 0.01,
    max: 3,
    step: 0.01,
    initial: 0.02,
  },
  {
    name: "contrast",
    type: "slider",
    min: 0.01,
    max: 3,
    step: 0.01,
    initial: 0.05,
  },
  {
    name: "saturate",
    type: "slider",
    min: 0.01,
    max: 3,
    step: 0.01,
    initial: 0.02,
  },
  {
    name: "hueRotate",
    type: "slider",
    min: 0,
    max: 360,
    step: 1,
    initial: 350,
  },
  { name: "shadow", type: "slider", min: 0, max: 150, step: 1, initial: 90 },
  { name: "overlay", type: "checkbox" },
  { name: "vignette", type: "checkbox" },
  { name: "banding", type: "checkbox" },
  { name: "rgbSplit", type: "checkbox" },
  { name: "scanline", type: "checkbox" },
  { name: "ghost", type: "checkbox" },
];

const dependencyMap = {
  blur: ["contrast", "brightness"],
  brightness: ["saturate", "hueRotate"],
  scale: ["blur", "pixelate"],
  saturate: ["contrast", "brightness"],
  contrast: ["brightness"],
  shadow: ["invert", "grayscale"],
  hueRotate: ["contrast"],
  skew: ["scale", "shadow"],
  pixelate: ["opacity", "banding"],
  vignette: ["noise", "overlay"],
  rgbSplit: ["blur", "hueRotate"],
  ghost: ["contrast", "rgbSplit"],
  scanline: ["pixelate", "invert"],
};

const Level4 = ({ uid, loading_comp }) => {
  const [effectState, setEffectState] = useState(
    effectsList.reduce((acc, { name, type, initial }) => {
      acc[name] = type === "slider" ? initial : true;
      return acc;
    }, {})
  );
  useEffect(() => {
    if (!loading_comp) {
      startLevel(uid, getLevel());
    }
  }, [, loading_comp]);
  const [interactionCount, setInteractionCount] = useState(0);

  const handleSlider = (effectName, value) => {
    setInteractionCount((c) => c + 1);
    const newEffectState = { ...effectState, [effectName]: value };

    if (dependencyMap[effectName]) {
      dependencyMap[effectName].forEach((depName) => {
        if (Math.random() < 0.3) {
          if (typeof effectState[depName] === "number") {
            newEffectState[depName] = parseFloat(
              (effectState[depName] * (1 + Math.random())).toFixed(2)
            );
          } else {
            newEffectState[depName] = true;
          }
        }
      });
    }

    // capcană aleatorie
    if (Math.random() < 0.2) {
      const keys = Object.keys(effectState);
      const randKey = keys[Math.floor(Math.random() * keys.length)];
      if (typeof newEffectState[randKey] === "boolean")
        newEffectState[randKey] = true;
      else newEffectState[randKey] = newEffectState[randKey] * 1.5;
    }

    setEffectState(newEffectState);
  };

  const handleCheckbox = (effectName) => {
    setInteractionCount((c) => c + 1);
    const newEffectState = { ...effectState, [effectName]: false };

    if (dependencyMap[effectName]) {
      dependencyMap[effectName].forEach((depName) => {
        if (Math.random() < 0.3) {
          if (typeof effectState[depName] === "number") {
            newEffectState[depName] = parseFloat(
              (effectState[depName] * (1.2 + Math.random())).toFixed(2)
            );
          } else {
            newEffectState[depName] = true;
          }
        }
      });
    }

    if (Math.random() < 0.25) {
      const keys = Object.keys(effectState);
      for (let i = 0; i < 2; i++) {
        const randKey = keys[Math.floor(Math.random() * keys.length)];
        if (typeof newEffectState[randKey] === "boolean")
          newEffectState[randKey] = true;
      }
    }

    setEffectState(newEffectState);
  };

  const isQRCodeVisible =
    Object.entries(effectState).every(([k, v]) => {
      if (typeof v === "boolean") return v === false;
      if (k === "hueRotate") return Math.abs(v) <= 1;
      return v >= 0.99 || v <= 0.01;
    }) && interactionCount >= 2400;

  const effectStyles = {
    filter: [
      `blur(${effectState.blur}px)`,
      `brightness(${effectState.brightness})`,
      `contrast(${effectState.contrast})`,
      `saturate(${effectState.saturate})`,
      `hue-rotate(${effectState.hueRotate}deg)`,
      effectState.invert ? "invert(100%)" : "",
      effectState.grayscale ? "grayscale(100%)" : "",
    ].join(" "),
    transform: [
      `scale(${effectState.scale})`,
      effectState.skew ? "skew(15deg, 10deg)" : "",
    ].join(" "),
    boxShadow: effectState.shadow
      ? `0 0 ${effectState.shadow}px rgba(255, 0, 255, 0.8)`
      : "none",
    mixBlendMode: effectState.rgbSplit ? "difference" : "normal",
  };
  const { user, loading } = useAuth();

  const next = () => {
    updateLevel(user.qr_scanned, uid, getLevel() + 1, "usor").then((res) => {
      if (res.data.ok) {
        alert(res.data.message);
        to(`/level${getLevel() + 1}`);
      } else {
        alert("Nu ai scanat codul QR!");
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
          <div className="">
            <QRCodeCanvas
              value={`https://osfiir.ro/download/1/${uid}`}
              size={256}
              includeMargin={false}
              className=""
              style={effectStyles}
            />

            {effectState.pixelate && (
              <div>
                {Array.from({ length: 256 }).map((_, i) => (
                  <div key={i}></div>
                ))}
              </div>
            )}

            {effectState.noise && (
              <div className="absolute inset-0 z-20 mix-blend-overlay">
                <div
                  style={{
                    background:
                      "url(https://www.transparenttextures.com/patterns/asfalt-dark.png)",
                  }}
                  className="w-full h-full bg-[url('')] opacity-60"
                ></div>
              </div>
            )}

            {effectState.opacity && (
              <div className="absolute inset-0 bg-black opacity-85 z-30"></div>
            )}

            {effectState.overlay && (
              <div className="absolute inset-0 bg-gradient-to-br from-purple-800 via-black to-red-900 mix-blend-hard-light opacity-90 z-40"></div>
            )}

            {effectState.vignette && (
              <div className="absolute inset-0 z-50 pointer-events-none">
                <div className="w-full h-full bg-black opacity-70 rounded-full mix-blend-multiply"></div>
              </div>
            )}

            {effectState.banding && (
              <div className="absolute inset-0 bg-gradient-to-r from-black via-white to-black opacity-40 z-30 mix-blend-color-burn"></div>
            )}

            {effectState.scanline && (
              <div className="absolute inset-0 z-60 pointer-events-none">
                <div className="w-full h-full bg-[linear-gradient(to_bottom,rgba(255,255,255,0.1) 50%,transparent 50%)] bg-[length:100%_4px]"></div>
              </div>
            )}

            {effectState.ghost && (
              <div className="absolute inset-0 z-70 backdrop-blur-sm bg-white/5"></div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 w-full max-w-md mt-6">
            {effectsList.map(({ name, type, min, max, step }) => (
              <div key={name} className="flex flex-col gap-1">
                {type === "checkbox" ? (
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={effectState[name]}
                      onChange={() => handleCheckbox(name)}
                    />
                    Scoate {name.charAt(0).toUpperCase() + name.slice(1)}
                  </label>
                ) : (
                  <>
                    <label>
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </label>
                    <input
                      type="range"
                      min={min}
                      max={max}
                      step={step || 0.01}
                      value={effectState[name]}
                      onChange={(e) =>
                        handleSlider(name, parseFloat(e.target.value))
                      }
                    />
                  </>
                )}
              </div>
            ))}
          </div>
          <br />
          <br />
          <button className="button main" onClick={next}>
            <span>Submit</span>
          </button>
        </div>
      ) : (
        <>Loading</>
      )}{" "}
    </div>
  );
};

export default Level4;
