import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import Pov from "./Pages/Pov";
import Level1 from "./Levels/usor/Level1";
import Level3 from "./Levels/usor/Level3";
import Level4 from "./Levels/usor/Level4";
import Level5 from "./Levels/usor/Level5";
import Level6 from "./Levels/usor/Level6";
import Level7 from "./Levels/usor/Level7";
import Level8 from "./Levels/usor/Level8";
import Level9 from "./Levels/usor/Level9";
import Level10 from "./Levels/usor/Level10";
import Level11 from "./Levels/mediu/Level11";
import Level12 from "./Levels/mediu/Level12";
import Level13 from "./Levels/mediu/Level13";
import Level14 from "./Levels/mediu/Level14";
import Level15 from "./Levels/mediu/Level15";
import Level16 from "./Levels/mediu/Level16";
import Level17 from "./Levels/mediu/Level17";
import Level18 from "./Levels/mediu/Level18";
import Level19 from "./Levels/mediu/Level19";
import Level20 from "./Levels/mediu/Level20";
import Level21 from "./Levels/greu/Level21";
import Level22 from "./Levels/greu/Level22";
import Level23 from "./Levels/greu/Level23";
import Level24 from "./Levels/greu/Level24";
import Alege from "./Pages/Alege";
import Level25 from "./Levels/greu/Level25";
import { useAuth } from "./utils/AuthContext";
import Surpriza from "./Pages/Surpriza";
import { useEffect, useState } from "react";
import { checkLevel } from "./utils/security";
import { getLevel, to } from "./utils/stuff";
import Level2 from "./Levels/usor/Level2";
import Finish from "./Pages/Finish";

function App() {
  const { user, loading } = useAuth();
  const isAllowed = user && !loading;
  const [loading_comp, setLoadingComp] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const level = getLevel();
    if (level !== NaN && user && !loading) {
      checkLevel(level, user.uid)
        .then((res) => {
          if (!res.data.ok) {
            navigate(`/level${res.data.current_level}`, { replace: true });
          }
        })
        .catch((err) => {
          navigate("/", { replace: true });
        });
      setLoadingComp(false);
    }
  }, [, window.location.href]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/poveste" element={<Pov />} />
        <Route
          path="/level1"
          element={
            isAllowed ? (
              <Level1 uid={user.uid} loading_comp={loading_comp} />
            ) : (
              <Surpriza />
            )
          }
        />
        <Route
          path="/level2"
          element={
            isAllowed ? (
              <Level2 uid={user.uid} loading_comp={loading_comp} />
            ) : (
              <Surpriza />
            )
          }
        />
        <Route
          path="/level3"
          element={
            isAllowed ? (
              <Level3 uid={user.uid} loading_comp={loading_comp} />
            ) : (
              <Surpriza />
            )
          }
        />
        <Route
          path="/level4"
          element={
            isAllowed ? (
              <Level4 uid={user.uid} loading_comp={loading_comp} />
            ) : (
              <Surpriza />
            )
          }
        />
        <Route
          path="/level5"
          element={
            isAllowed ? (
              <Level5 uid={user.uid} loading_comp={loading_comp} />
            ) : (
              <Surpriza />
            )
          }
        />
        <Route
          path="/level6"
          element={
            isAllowed ? (
              <Level6 uid={user.uid} loading_comp={loading_comp} />
            ) : (
              <Surpriza />
            )
          }
        />
        <Route
          path="/level7"
          element={
            isAllowed ? (
              <Level7 uid={user.uid} loading_comp={loading_comp} />
            ) : (
              <Surpriza />
            )
          }
        />
        <Route
          path="/level8"
          element={
            isAllowed ? (
              <Level8 uid={user.uid} loading_comp={loading_comp} />
            ) : (
              <Surpriza />
            )
          }
        />
        <Route
          path="/level9"
          element={
            isAllowed ? (
              <Level9 uid={user.uid} loading_comp={loading_comp} />
            ) : (
              <Surpriza />
            )
          }
        />
        <Route
          path="/level10"
          element={
            isAllowed ? (
              <Level10 uid={user.uid} loading_comp={loading_comp} />
            ) : (
              <Surpriza />
            )
          }
        />
        <Route
          path="/level11"
          element={
            isAllowed ? (
              <Level11 uid={user.uid} loading_comp={loading_comp} />
            ) : (
              <Surpriza />
            )
          }
        />
        <Route
          path="/level12"
          element={
            isAllowed ? (
              <Level12 uid={user.uid} loading_comp={loading_comp} />
            ) : (
              <Surpriza />
            )
          }
        />
        <Route
          path="/level13"
          element={
            isAllowed ? (
              <Level13 uid={user.uid} loading_comp={loading_comp} />
            ) : (
              <Surpriza />
            )
          }
        />
        <Route
          path="/level14"
          element={
            isAllowed ? (
              <Level14 uid={user.uid} loading_comp={loading_comp} />
            ) : (
              <Surpriza />
            )
          }
        />
        <Route
          path="/level15"
          element={
            isAllowed ? (
              <Level15 uid={user.uid} loading_comp={loading_comp} />
            ) : (
              <Surpriza />
            )
          }
        />
        <Route
          path="/level16"
          element={
            isAllowed ? (
              <Level16 uid={user.uid} loading_comp={loading_comp} />
            ) : (
              <Surpriza />
            )
          }
        />
        <Route
          path="/level17"
          element={
            isAllowed ? (
              <Level17 uid={user.uid} loading_comp={loading_comp} />
            ) : (
              <Surpriza />
            )
          }
        />
        <Route
          path="/level18"
          element={
            isAllowed ? (
              <Level18 uid={user.uid} loading_comp={loading_comp} />
            ) : (
              <Surpriza />
            )
          }
        />
        <Route
          path="/level19"
          element={
            isAllowed ? (
              <Level19 uid={user.uid} loading_comp={loading_comp} />
            ) : (
              <Surpriza />
            )
          }
        />
        <Route
          path="/level20"
          element={
            isAllowed ? (
              <Level20 uid={user.uid} loading_comp={loading_comp} />
            ) : (
              <Surpriza />
            )
          }
        />
        <Route
          path="/level21"
          element={
            isAllowed ? (
              <Level21 uid={user.uid} loading_comp={loading_comp} />
            ) : (
              <Surpriza />
            )
          }
        />
        <Route
          path="/level22"
          element={
            isAllowed ? (
              <Level22 uid={user.uid} loading_comp={loading_comp} />
            ) : (
              <Surpriza />
            )
          }
        />
        <Route
          path="/level23"
          element={
            isAllowed ? (
              <Level23 uid={user.uid} loading_comp={loading_comp} />
            ) : (
              <Surpriza />
            )
          }
        />
        <Route
          path="/level24"
          element={
            isAllowed ? (
              <Level24 uid={user.uid} loading_comp={loading_comp} />
            ) : (
              <Surpriza />
            )
          }
        />
        <Route
          path="/level25"
          element={
            isAllowed ? (
              <Level25 uid={user.uid} loading_comp={loading_comp} />
            ) : (
              <Surpriza />
            )
          }
        />
        <Route
          path="/alege"
          element={
            isAllowed ? (
              <Alege uid={user.uid} loading_comp={loading_comp} />
            ) : (
              <Surpriza />
            )
          }
        />
        <Route
          path="/finish"
          element={
            isAllowed ? (
              <Finish user={user} loading_comp={loading_comp} />
            ) : (
              <Surpriza />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
