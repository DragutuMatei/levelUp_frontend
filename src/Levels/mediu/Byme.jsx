import React, { useEffect, useState } from "react";

let nodes = { 0: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] };

function Byme() {
  const generateNodes = (pass) => {
    let keys = Object.keys(nodes);
    for (let i = 0; i < keys.length; i++) {
      let node = nodes[keys[i]];
      for (let j = 0; j < nodes[keys[i]].length; j++) {
        let k = node[j];
        nodes[k] = [];
        for (let p = 1; p <= 15; p++) {
          nodes[k].push(nodes[k - 1][nodes[k - 1].length - 1] + p);
        }
      }
    }
  };

  useEffect(() => {
    generateNodes();
    generateNodes();
    generateNodes();
    generateNodes();
    generateNodes();
    generateNodes();
  }, []);

  const [currentPage, setCurrentPage] = useState(0);
  //   const [see, setSee] = useState(...nodes[currentPage]);
  const [moves, setMoves] = useState([0]);

  const [gresit, setGresit] = useState(false);
  const [corect, setCorect] = useState(false);
  const randomizeArray = (arr) => {
    const shuffledArray = [...arr].sort(() => Math.random() - 0.5);
    return shuffledArray;
  };
  return (
    <div>
      <button
        onClick={() => {
          if (moves.length <= 1) {
            setCurrentPage(0);
            return;
          }
          setMoves((old) => [...old.slice(0, -1)]);
          setCurrentPage(moves[moves.length - 2]);
          setGresit(false);
          setCorect(false);
        }}
      >
        back
      </button>
      <button
        onClick={() => {
          console.log(moves);
          console.log(currentPage);
          console.log(nodes);
        }}
      >
        click
      </button>
      {moves.map((move) => {
        return (
          <span>
            {move} {" /"}
          </span>
        );
      })}
      {gresit ? (
        <h1>GRESIT!</h1>
      ) : corect ? (
        <>
          <h1>CORECT!</h1>
          <a href="" download>
            downloadeaza ceva
          </a>
          <button
            onClick={() => {
              window.location.href = "/level15";
            }}
          >
            next
          </button>
        </>
      ) : (
        randomizeArray(nodes[currentPage]).map((el, index) => {
          return (
            <>
              <div key={index}>
                <button
                  onClick={() => {
                    if (el === 181377820 ) {
                      setCorect(true);
                    } else if (nodes[el] === undefined) {
                      setMoves((old) => [...old, el]);
                      setGresit(true);
                    } else {
                      console.log(nodes[el]);
                      setCurrentPage(el);
                      setMoves((old) => [...old, el]);
                    }
                  }}
                >
                  {el}
                </button>
              </div>
              <br />
            </>
          );
        })
      )}
    </div>
  );
}

export default Byme;
