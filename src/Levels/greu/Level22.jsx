import React, { useEffect, useState } from "react";
import { createClient } from "pexels";
import { getLevel, to, updateLevel } from "../../utils/stuff";
import { getHint, startLevel } from "../../utils/points";
import Poveste from "../../Pages/Poveste";

const client = createClient(
  "LlNTptvLrfVnxFdt1NoRykXgtw8TzwcCVRiOMKU41b3eJlM1qDLRuExy"
);

function Level22({ loading_comp, uid }) {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [openedPhoto, setOpenedPhoto] = useState(null); // <-- nou state pentru poza mare
  const [sol, setSol] = useState("");
    useEffect(() => {
      if (!loading_comp)
        startLevel(uid, getLevel()).then((res) => {
          setSol(res);
        });
    }, [, loading_comp]);
  const [text, setText] = useState("");
  const check = () => {
    if (text.trim().toLowerCase() === sol) {
      updateLevel(uid, 23, "greu");
      alert("e ok");
      to("/level23");
    } else {
      alert("nu e ok!");
    }
  };

  const [photoFolders, setphotoFolders] = useState([]);
  // let photoFolders = [];
  //   [
  //   {
  //     name: "Vacanță Grecia",
  //     photos: [

  //       // require("../../assets/img/sad.png"),
  //       // require("../../assets/img/wap_conv.png"),
  //       // require("../../assets/img/LV2024.png"),
  //     ],
  //   },
  //   {
  //     name: "Familie",
  //     photos: [
  //       require("../../assets/img/level18.jpg"),
  //       require("../../assets/img/wap_conv.png"),
  //     ],
  //   },
  //   {
  //     name: "Animale",
  //     photos: [
  //       require("../../assets/img/wap_conv.png"),
  //       require("../../assets/img/LV2024.png"),
  //     ],
  //   },
  // ];
  const shuffleArray = (array) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };
  const getImg = async () => {
    for (let i = 1; i <= 20; i++) {
      client.photos.curated({ per_page: 100, page: i }).then((res) => {
        let news = {
          name: `Folder ${i}`,
          photos: [...res.photos.map((p) => p.src.portrait)],
        };
        try {
          news.photos.push(require(`../../assets/img/Group ${i}.png`));
        } catch (error) {
          console.log(error);
        }
        if (i === 16) {
          try {
            news.photos.push(
              ...[
                require(`../../assets/img/Group 22.png`),
                require(`../../assets/img/Group 23.png`),
                require(`../../assets/img/Group 24.png`),
              ]
            );
          } catch (error) {
            console.log(error);
          }
        }
        // if (require(`../../assets/img/Group ${i}.png`)) {
        //   news.photos.push(require(`../../assets/img/Group ${i}.png`));
        // }
        setphotoFolders((old) => [...old, news]);
        // try {
        //   setphotoFolders((old) => [
        //     ...old,
        //     {
        //       name: `Folder${i}`,
        //       photos: [...res.photos.map((p) => p.src.portrait), require(`../../assets/img/Group ${i}.png`)],
        //     },
        //   ]);
        // } catch (error) {
        //   console.log(error)
        // }
      });
    }
  };

  useEffect(() => {
    getImg();
  }, []);

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "24px",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "16px",
    width: "80lvw",
  };

  const imageStyle = {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    cursor: "pointer",
  };

  const folderNameStyle = {
    marginTop: "8px",
    textAlign: "center",
    fontWeight: "500",
  };

  const headingStyle = {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "16px",
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  };

  const largeImageStyle = {
    maxWidth: "90%",
    maxHeight: "90%",
    borderRadius: "10px",
    boxShadow: "0 0 20px rgba(255,255,255,0.3)",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "20px",
    right: "30px",
    fontSize: "32px",
    color: "white",
    background: "none",
    border: "none",
    cursor: "pointer",
  };

  const handlePhotoClick = (photoUrl) => {
    setOpenedPhoto(photoUrl);
  };

  const renderOverlay = () => {
    if (!openedPhoto) return null;
    return (
      <div style={overlayStyle} onClick={() => setOpenedPhoto(null)}>
        <button style={closeButtonStyle} onClick={() => setOpenedPhoto(null)}>
          &times;
        </button>
        <img src={openedPhoto} alt="preview" style={largeImageStyle} />
      </div>
    );
  };

  if (selectedFolder !== null) {
    const folder = photoFolders[selectedFolder];
    return (
      <div className="level">
        {!loading_comp ? (
          <div className="level2">
            <div className="top">
              <button
                className="button second"
                onClick={() => setSelectedFolder(null)}
              >
                <h2>Înapoi</h2>
              </button>
              <div
                className="cerinta hint"
                onClick={() => hint(uid, getLevel())}
              >
                <img
                  src={require("../../assets/img/styling/hint.svg").default}
                  alt=""
                />
              </div>
              <Poveste />
              <h2 style={headingStyle}>{folder.name}</h2>
            </div>
            <div style={gridStyle}>
              {shuffleArray(folder.photos).map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt=""
                  style={imageStyle}
                  onClick={() => handlePhotoClick(photo)}
                />
              ))}
            </div>
            {renderOverlay()}
          </div>
        ) : (
          <>Loading</>
        )}
      </div>
    );
  }
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
          <div style={gridStyle}>
            {photoFolders.map((folder, index) => (
              <div
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedFolder(index)}
              >
                <img
                  src={folder.photos[0]}
                  alt={folder.name}
                  style={imageStyle}
                />
                <p style={folderNameStyle}>{folder.name}</p>
              </div>
            ))}
          </div>
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
        </div>
      ) : (
        <>Loading</>
      )}
    </div>
  );
}
export default Level22;
