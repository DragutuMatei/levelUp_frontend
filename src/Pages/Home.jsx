import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext.js";
import "../assets/css/style.scss";

function Home() {
  const { user, loading, signInWithGoogle, signUserOut } = useAuth(); // Get user, loading, AND the functions
  {
    /* {user && JSON.stringify(user)} */
  }

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
      ) : (
        <button onClick={signInWithGoogle} className="button main">
          <h1>Logheaza-te pentru a incepe jocul</h1>
        </button>
      )}
    </div>
  );
}

export default Home;
