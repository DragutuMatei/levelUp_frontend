import React, { useEffect, useState } from "react";
import { getLevel, to, updateLevel } from "../../utils/stuff";
import { getHint, startLevel } from "../../utils/points";
import Poveste from "../../Pages/Poveste";

//01010101010101010103 si 21234234

function Level11({ uid, loading_comp }) {
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  const check = () => {
    if (
      value.trim() == process.env.REACT_APP_LEVEL_11_V1 &&
      value2.trim() == process.env.REACT_APP_LEVEL_11_V3 &&
      value1.trim() == process.env.REACT_APP_LEVEL_11_V2
    ) {
      updateLevel(uid, 12, "mediu");
      alert("e ok");
      to("/level12");
    } else {
      alert("nu e ok");
    }
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

  useEffect(() => {
    if (!loading_comp) {
      startLevel(uid, getLevel());
    }
  }, [, loading_comp]);

  const generateVal = () => {
    const cifre = [0, 1];
    let array = [];
    for (let i = 0; i < 20; i++) {
      array.push(
        parseInt(
          Array.from(
            { length: 20 },
            () => cifre[Math.floor(Math.random() * cifre.length)]
          ).join("")
        )
      );
    }

    array[Math.floor(Math.random() * array.length)] =
      process.env.REACT_APP_LEVEL_11_V1;
    return array;
  };
  const generateVal1 = () => {
    const cifre = [1, 2, 3, 4];
    let array = [];
    for (let i = 0; i < 20; i++) {
      array.push(
        parseInt(
          Array.from(
            { length: 20 },
            () => cifre[Math.floor(Math.random() * cifre.length)]
          ).join("")
        )
      );
    }
    const index = Math.floor(Math.random() * array.length);
    array[index] = process.env.REACT_APP_LEVEL_11_V2;
    return array;
  };
  const [generated, setg] = useState(generateVal());
  const [generated1, setg1] = useState(generateVal1());

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
          <pre className="pre">
            <code>
              {`async function fetchData(param1, param2, method) {
  try {
    const response = await fetch(
      \`https://laboratoare.fiir.upb.ro/api?param1=`}
              <select onChange={(e) => setValue(e.target.value)}>
                <option value="qq">Alege param1</option>
                {generated.map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
              {`param2=`}
              <select onChange={(e) => setValue1(e.target.value)}>
                <option value="qq">Alege param2</option>
                {generated1.map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
              {`\`,
      { method: "`}
              <select
                onChange={(e) => setValue2(e.target.value)}
                className="code-select"
              >
                <option value="">Alege metoda</option>
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="DELETE">DELETE</option>
                <option value="PUT">PUT</option>
              </select>
              {`" }
    );
    console.log(response);
  } catch (err) {
    console.error("Error:", err);
  }
}
`}
            </code>
          </pre>
          <button className="button main" onClick={check}>
            <span>Submit</span>
          </button>
        </div>
      ) : (
        <>Loading</>
      )}
    </div>
  );
}

export default Level11;
