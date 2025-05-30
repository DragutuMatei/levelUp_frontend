import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext.js";
import "../assets/css/style.scss";
import { useState } from "react";

function Home() {
  const { user, loading, signInWithGoogle, signUserOut } = useAuth(); // Get user, loading, AND the functions
  {
    /* {user && JSON.stringify(user)} */
  }

  const [agree, setAgree] = useState(false);

  return (
    <div className="home">
      <img
        src={require("../assets/img/styling/mascota.png")}
        alt=""
        className="mascota"
      />
      <img
        src={require("../assets/img/styling/folder.svg").default}
        alt=""
        className="folder"
      />
      {user ? (
        <>
          <Link className="button main" to="/poveste">
            <h1>Start</h1>
          </Link>
          <button onClick={signUserOut} className="button second">
            <h1>Logout</h1>
          </button>
        </>
      ) : agree ? (
        <>
          <button onClick={signInWithGoogle} className="button main">
            <h1>Logheaza-te pentru a incepe jocul</h1>
          </button>{" "}
        </>
      ) : (
        <>
          <button className="button main">
            <a
              href="https://docs.google.com/document/d/1DgR-5dSoNMFG5MwgqcbMO-nWnfBOo1jVud3To8uJkkU/edit?usp=sharing"
              target="_blank"
            >
              Regulament
            </a>
          </button>
          <button
            className="button second"
            onClick={() => {
              setAgree(true);
            }}
          >
            <h1>Agree</h1>
          </button>
        </>
      )}
    </div>
  );
}

export default Home;
