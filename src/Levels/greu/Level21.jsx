import React, { useEffect, useState } from "react";
import { getLevel, to, updateLevel } from "../../utils/stuff";
import { getHint, startLevel } from "../../utils/points";
import Poveste from "../../Pages/Poveste";

// D:\osfiir\LevelUp\front\src\Levels\greu\LevelUp\New folder - Copy - Copy - Copy (2)\New folder - Copy\New folder - Copy - Copy - Copy - Copy\New folder\New folder - Copy (1)\New folder - Copy - Copy - Copy\New folder\New folder - Copy (1)

function generateTechShoppingList(count) {
  const categories = {
    laptop: ["Ultrabook", "Gaming", "Business", "Convertibil", "Workstation"],
    component: [
      "Placa video",
      "Procesor",
      "RAM",
      "SSD",
      "Placa de baza",
      "Sursa",
      "Cooler",
      "Carcasa",
    ],
    periferice: [
      "Mouse",
      "Tastatura",
      "Casti",
      "Microfon",
      "Webcam",
      "Boxe",
      "Mouse pad",
    ],
    telefon: ["Flagship", "Mid-range", "Budget", "Gaming", "Business"],
    tablet: ["iPad", "Android", "Windows", "E-reader"],
    smartwatch: ["Fitness", "Luxury", "Kids", "Outdoor"],
    smartHome: [
      "Bec inteligent",
      "Termostat",
      "Camera de supraveghere",
      "Robot aspirator",
      "Sistem audio",
    ],
    retea: [
      "Router",
      "Switch",
      "Modem",
      "Placa retea",
      "Extensor WiFi",
      "Fire de retea",
    ],
    software: [
      "OS",
      "Suite office",
      "Antivirus",
      "Editare video",
      "Editare foto",
      "VPN",
    ],
    accesorii: [
      "Husa",
      "Folie protectie",
      "Incarcator",
      "Cabluri",
      "Dock station",
      "Adaptor",
    ],
  };

  const brands = {
    laptop: ["Apple", "Dell", "HP", "Lenovo", "Asus", "Acer", "MSI", "Razer"],
    component: [
      "NVIDIA",
      "AMD",
      "Intel",
      "Corsair",
      "Samsung",
      "Western Digital",
      "Noctua",
      "Cooler Master",
    ],
    periferice: [
      "Logitech",
      "Razer",
      "SteelSeries",
      "HyperX",
      "Sennheiser",
      "Bose",
    ],
    telefon: ["iPhone", "Samsung", "Google", "OnePlus", "Xiaomi", "Huawei"],
    tablet: ["Apple", "Samsung", "Amazon", "Microsoft", "Lenovo"],
    smartwatch: ["Apple", "Samsung", "Garmin", "Fitbit", "Huawei"],
    smartHome: ["Google", "Amazon", "Philips", "Ring", "Roborock", "Sonos"],
    retea: ["TP-Link", "Netgear", "Asus", "Ubiquiti", "Cisco", "D-Link"],
    software: ["Microsoft", "Adobe", "Norton", "Avast", "McAfee", "ExpressVPN"],
    accesorii: ["Belkin", "Anker", "Spigen", "OtterBox", "UGreen"],
  };

  const shoppingList = [];

  // Functie pentru generarea unui pret random
  const getRandomPrice = (min, max) => {
    return (Math.random() * (max - min) + min).toFixed(2);
  };

  // Functie pentru a alege un element random dintr-un array
  const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

  for (let i = 0; i < count; i++) {
    // Alegem o categorie random
    const categoryKeys = Object.keys(categories);
    const randomCategory = getRandomItem(categoryKeys);

    // Generam un produs
    const productType = getRandomItem(categories[randomCategory]);
    const brand = getRandomItem(brands[randomCategory]);
    const modelNumber = Math.floor(Math.random() * 10000);
    const price = getRandomPrice(10, 5000);

    let productName;

    // Format diferit pentru software
    if (randomCategory === "software") {
      productName = `${brand} ${productType}`;
    } else {
      productName = `${brand} ${productType} ${modelNumber}`;
    }

    // Adaugam la lista
    shoppingList.push({
      id: i + 1,
      name: productName,
      category: randomCategory,
      price: parseFloat(price),
      quantity: Math.floor(Math.random() * 5) + 1, // 1-5 bucati
    });
  }

  return shoppingList;
}

function Level21({ uid, loading_comp }) {
  const [items, setItems] = useState(generateTechShoppingList(2500));
  const [val, setVal] = useState("");
  const check = () => {
    if (val.trim().toLowerCase() === process.env.REACT_APP_LEVEL_21) {
      updateLevel(uid, 22, "greu");
      alert("e ok");
      to("/level22");
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
          <div className="submit">
            <input
              type="text"
              style={{width:"400px"}}
              placeholder="Răspunsul tău..."
              onChange={(e) => setVal(e.target.value)}
            />
            <button className="button main" onClick={check}>
              check
            </button>
          </div>
          <br />
          <br />
          <br />
          <br />
          <table className="table-container">
            <thead>
              <tr>
                <th>No.</th>
                <th>Nume produs</th>
                <th>Pret</th>
                <th>Cantitate</th>
              </tr>
            </thead>
            <tbody>
              {items &&
                items.map((item, index) => {
                  return (
                    <tr style={{ margin: "10px 0" }}>
                      <td>{index}</td>
                      <td>
                        <a
                          style={{ cursor: "pointer" }}
                          href={
                            index == 423
                              ? require("./LevelUp.tar.wim.gz.bz2")
                              : require("../../assets/img/sad.png")
                          }
                          download={true}
                        >
                          {index == 423 ? "Piese impr." : item.name}
                        </a>
                      </td>
                      <td>{item.price}</td>
                      <td>{item.quantity}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {/* <a href={require("./LevelUp.tar.wim.gz.bz2")} download={true}>
        Download arhiva
      </a> */}
        </div>
      ) : (
        <>Loading</>
      )}
    </div>
  );
}

export default Level21;
