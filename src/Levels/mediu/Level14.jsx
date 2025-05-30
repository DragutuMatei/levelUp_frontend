// import React, { useEffect, useState } from "react";
// import { getLevel, to, updateLevel } from "../../utils/stuff";
// import { getHint, startLevel } from "../../utils/points";
// import Poveste from "../../Pages/Poveste";

// let nodes = { 0: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] };

// function Level14({ uid, loading_comp }) {
//   const generateNodes = (pass) => {
//     let keys = Object.keys(nodes);
//     for (let i = 0; i < keys.length; i++) {
//       let node = nodes[keys[i]];
//       for (let j = 0; j < nodes[keys[i]].length; j++) {
//         let k = node[j];
//         nodes[k] = [];
//         for (let p = 1; p <= 15; p++) {
//           nodes[k].push(nodes[k - 1][nodes[k - 1].length - 1] + p);
//         }
//       }
//     }
//   };
//   const next = () => {
//     updateLevel(uid, 15, "mediu");
//     alert("e ok");
//     to("/level15");
//   };
//   useEffect(() => {
//     generateNodes();
//     generateNodes();
//     generateNodes();
//     generateNodes();
//     generateNodes();
//     generateNodes();
//   }, []);

//   useEffect(() => {
//     if (!loading_comp) startLevel(uid, getLevel());
//   }, []);

//   const [currentPage, setCurrentPage] = useState(0);
//   //   const [see, setSee] = useState(...nodes[currentPage]);
//   const [moves, setMoves] = useState([0]);

//   const [gresit, setGresit] = useState(false);
//   const [corect, setCorect] = useState(false);
//   const randomizeArray = (arr) => {
//     const shuffledArray = [...arr].sort(() => Math.random() - 0.5);
//     return shuffledArray;
//   };

//   const hint = async (uid, level) => {
//     await getHint(uid, level).then((res) => {
//       if (res.data.ok) {
//         alert(res.data.hint);
//       } else {
//         alert(res.data.message);
//       }
//     });
//   };

//   return (
//     <div className="level">
//       {" "}
//       {!loading_comp ? (
//         <div className="level14">
//           <Poveste />
//           <div className="cerinta hint" onClick={() => hint(uid, getLevel())}>
//             <img
//               src={require("../../assets/img/styling/hint.svg").default}
//               alt=""
//             />
//           </div>
//           <div className="controls">
//             <button
//               className="button main"
//               onClick={() => {
//                 if (moves.length <= 1) {
//                   setCurrentPage(0);
//                   return;
//                 }
//                 setMoves((old) => [...old.slice(0, -1)]);
//                 setCurrentPage(moves[moves.length - 2]);
//                 setGresit(false);
//                 setCorect(false);
//               }}
//             >
//               <h2>Back</h2>
//             </button>
//             <div className="line"></div>
//             {moves.map((move) => {
//               return (
//                 <span>
//                   {move} {" /"}
//                 </span>
//               );
//             })}
//           </div>
//           {gresit ? (
//             <h2>GRESIT!</h2>
//           ) : corect ? (
//             <div className="corect">
//               <h1>CORECT!</h1>
//               <a href={require("./data.txt")} download>
//                 Downloadeaza ceva
//               </a>
//               <button className="button main" onClick={next}>
//                 <span>Next</span>
//               </button>
//             </div>
//           ) : (
//
//             <ul>
//               {randomizeArray(nodes[currentPage]).map((el, index) => {
//                 return (
//                   <>
//                     <li
//                       className="list"
//                       // className="button second"
//                       onClick={() => {
//                         if (el === parseInt(process.env.REACT_APP_LEVEL_14)) {
//                           setCorect(true);
//                         } else if (nodes[el] === undefined) {
//                           setMoves((old) => [...old, el]);
//                           setGresit(true);
//                         } else {
//                           setCurrentPage(el);
//                           setMoves((old) => [...old, el]);
//                         }
//                       }}
//                     >
//                       {el}
//                     </li>
//                     <br />
//                   </>
//                 );
//               })}
//                   <div dangerouslySetInnerHTML={{ __html: `<!-- cauta 146210857 -->` }}></div>
//             </ul>
//           )}
//         </div>
//       ) : (
//         <>Loading</>
//       )}
//     </div>
//   );
// }

// export default Level14;
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { getLevel, to, updateLevel } from "../../utils/stuff";
import { getHint, startLevel } from "../../utils/points";
import Poveste from "../../Pages/Poveste";

let nodes = { 0: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] };

function Level14({ uid, loading_comp }) {
  const generateNodes = useCallback(() => {
    const keys = Object.keys(nodes);
    for (let i = 0; i < keys.length; i++) {
      const nodeKey = keys[i];
      const node = nodes[nodeKey]; // Get reference once per outer loop iteration
      const nodeLength = node.length; // Get length once
      for (let j = 0; j < nodeLength; j++) {
        const k = node[j];
        nodes[k] = [];
        const lastVal = nodes[k - 1]?.[nodes[k - 1].length - 1] || 0; // Handle potential undefined access
        for (let p = 1; p <= 15; p++) {
          nodes[k].push(lastVal + p);
        }
      }
    }
  }, []);
  const next = useCallback(() => {
    alert("e ok!");
    to(`/level${getLevel() + 1}`);
  }, [uid]);

  const clickcheck = (el) => {
    updateLevel(parseInt(el), uid, getLevel() + 1, "mediu").then((res) => {
      if (res.data.ok) {
        setCorect(true);
      } else if (nodes[el] === undefined) {
        setMoves((oldMoves) => [...oldMoves, el]);
        setGresit(true);
      } else {
        setCurrentPage(el);
        setMoves((oldMoves) => [...oldMoves, el]);
      }
    });
  };

  useEffect(() => {
    for (let i = 0; i < 6; i++) {
      generateNodes();
    }
  }, [generateNodes]);
  useEffect(() => {
    if (!loading_comp) startLevel(uid, getLevel());
  }, [, loading_comp]);

  const [currentPage, setCurrentPage] = useState(0);
  const [moves, setMoves] = useState([0]);
  const [gresit, setGresit] = useState(false);
  const [corect, setCorect] = useState(false);

  const randomizeArray = useCallback((arr) => {
    return [...arr].sort(() => Math.random() - 0.5);
  }, []);

  const hint = useCallback(async (currentUid, currentLevel) => {
    try {
      const res = await getHint(currentUid, currentLevel);
      if (res.data.ok) {
        alert(res.data.hint);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching hint:", error);
      alert("An error occurred while fetching the hint.");
    }
  }, []);
  const displayNodes = useMemo(() => {
    return nodes[currentPage] ? randomizeArray(nodes[currentPage]) : [];
  }, [currentPage, randomizeArray]);

  return (
    <div className="level">
      {!loading_comp ? (
        <div className="level14">
          <Poveste />
          <div className="cerinta hint" onClick={() => hint(uid, getLevel())}>
            <img
              src={require("../../assets/img/styling/hint.svg").default}
              alt="Hint"
            />
          </div>
          <div className="controls">
            <button
              className="button main"
              onClick={() => {
                if (moves.length <= 1) {
                  setCurrentPage(0);
                  return;
                }
                setMoves((oldMoves) => oldMoves.slice(0, -1));
                setCurrentPage(moves[moves.length - 2]);
                setGresit(false);
                setCorect(false);
              }}
            >
              <h2>Back</h2>
            </button>
            <div className="line"></div>
            {moves.map((move, index) => (
              <span key={index}>
                {move} {index < moves.length - 1 ? " / " : ""}
              </span>
            ))}
          </div>
          {gresit ? (
            <div className="rasp">
              <h2>GRESIT!</h2>
            </div>
          ) : corect ? (
            <div className="rasp">
              <h1>CORECT!</h1>
              <a href={require("./data.txt")} download="data.txt">
                Downloadeaza ceva
              </a>
              <button className="button main" onClick={next}>
                <span>Next</span>
              </button>
            </div>
          ) : (
            <ul>
              {displayNodes.map((el) => {
                return (
                  <li key={el} className="list" onClick={() => clickcheck(el)}>
                    {el}
                  </li>
                );
              })}
              {/* // 0 /12 /192 /2888 /43321 /649825 /9747390 /146210857 */}
              <div
                dangerouslySetInnerHTML={{ __html: `<!-- cauta 146210857 -->` }}
              ></div>
            </ul>
          )}
        </div>
      ) : (
        <>Loading</>
      )}
    </div>
  );
}

export default Level14;
