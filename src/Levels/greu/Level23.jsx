import React, { useEffect, useState } from "react";
import { getLevel, to, updateLevel } from "../../utils/stuff";
import { CopyBlock, dracula } from "react-code-blocks";
import { getHint, startLevel } from "../../utils/points";
import Poveste from "../../Pages/Poveste";

function Level23({ uid, loading_comp }) {
  const [text, setText] = useState("");
  const [sol, setSol] = useState("");
  useEffect(() => {
    if (!loading_comp)
      startLevel(uid, getLevel()).then((res) => {
        setSol(res);
      });
  }, [, loading_comp]);
  const check = () => {
    if (text.trim() === "Botosani();" || text.trim() === sol) {
      updateLevel(uid, 24, "greu");
      alert("e ok");
      to("/level24");
    } else {
      alert("nu e ok!");
    }
  };
  console.log(
    "codul final este combinatia tuturor rezultatelor + | (ex. encodarea1|encodarea2....)"
  );
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

          {/* 043218676318 */}
          <span style={{ display: "none" }}>
            codul final este combinatia tuturor rezultatelor + | (ex.
            encodarea1|encodarea2....)
          </span>
          <div className="submit">
            <input
              type="text"
              placeholder="Răspunsul tău..."
              onChange={(e) => setText(e.target.value)}
            />
            <button className="button main" onClick={check}>
              <span>Submit</span>
            </button>
          </div>
          <br />
          <CopyBlock
            language={"js"}
            text={`function encode1(text) {
    const b64 = btoa(text);
    const rot13 = b64.replace(/[a-zA-Z]/g, (c) =>
      String.fromCharCode(c.charCodeAt(0) + (c.toLowerCase() < "n" ? 13 : -13))
    );
    return rot13.split("").reverse().join("");
}
          `}
            showLineNumbers={1}
            theme={dracula}
            wrapLines={true}
            codeBlock
          />
          <br />
          <CopyBlock
            language={"js"}
            text={`function xorEncrypt(text, key = "check_our_insta_page_at_@osfiir") {
    return text
      .split("")
      .map((c, i) =>
        String.fromCharCode(c.charCodeAt(0) ^ key.charCodeAt(i % key.length))
      )
      .join("");
  }

  function encode2(text) {
    const xor = xorEncrypt(text);
    return Array.from(xor)
      .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
      .join("");
  }`}
            showLineNumbers={1}
            theme={dracula}
            wrapLines={true}
            codeBlock
          />
          <br />
          <CopyBlock
            language={"js"}
            text={`function caesarShift(text, shift) {
    return text.replace(/[a-z]/gi, (c) => {
      const base = c <= "Z" ? 65 : 97;
      return String.fromCharCode(
        ((c.charCodeAt(0) - base + shift + 26) % 26) + base
      );
    });
  }

  function encode3(text) {
    const shifted = caesarShift(text, 5);
    return shifted.split("").reverse().join("");
  }`}
            showLineNumbers={1}
            theme={dracula}
            wrapLines={true}
            codeBlock
          />
          <br />
          <CopyBlock
            language={"js"}
            text={`const pattern = [3, 0, 4, 1, 2];

  function permute(text, pattern) {
    return pattern.map((i) => text[i % text.length]).join("");
  }

  function reversePermute(text, pattern) {
    let temp = new Array(text.length);
    pattern.forEach((p, i) => {
      temp[p % text.length] = text[i];
    });
    return temp.join("");
  }

  function encode4(text) {
    const permuted = permute(text, pattern);
    return Array.from(permuted)
      .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
      .join("");
  }`}
            showLineNumbers={1}
            theme={dracula}
            wrapLines={true}
            codeBlock
          />
          <br />
          <CopyBlock
            language={"js"}
            text={`function substitutionEncrypt(text, key = "zyxwvutsrqponmlkjihgfedcba") {
    return text
      .split("")
      .map((c) => {
        if (/[a-z]/.test(c)) return key[c.charCodeAt(0) - 97];
        if (/[A-Z]/.test(c))
          return key[c.toLowerCase().charCodeAt(0) - 97].toUpperCase();
        return c;
      })
      .join("");
  }

  function substitutionDecrypt(text, key = "zyxwvutsrqponmlkjihgfedcba") {
    const map = {};
    key.split("").forEach((c, i) => (map[c] = String.fromCharCode(97 + i)));
    return text
      .split("")
      .map((c) => {
        if (/[a-z]/.test(c)) return map[c];
        if (/[A-Z]/.test(c)) return map[c.toLowerCase()].toUpperCase();
        return c;
      })
      .join("");
  }
  function encode5(text) {
    const substituted = substitutionEncrypt(text);
    return btoa(substituted);
  }`}
            showLineNumbers={1}
            theme={dracula}
            wrapLines={true}
            codeBlock
          />
        </div>
      ) : (
        <>Loading</>
      )}
    </div>
  );
}

export default Level23;
/*

==UVUVUVUVUVUV|4b0e5b0d4a555b0f4f025208551f|873969121898|323038343731|MDA0MzIxODY3NjMxOA==
*/
