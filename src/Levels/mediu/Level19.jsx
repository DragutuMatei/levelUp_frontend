import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLevel, to, updateLevel } from "../../utils/stuff";
import { getHint, startLevel } from "../../utils/points";
import Poveste from "../../Pages/Poveste";

function Level19({ uid, loading_comp }) {
  const [links, setLinks] = useState([
    "https://www.google.com",
    "https://www.youtube.com",
    "https://www.facebook.com",
    "https://www.instagram.com",
    "https://x.com",
    "https://chatgpt.com",
    "https://www.whatsapp.com",
    "https://www.wikipedia.org",
    "https://www.reddit.com",
    "https://www.yahoo.co.jp",
    "https://www.yahoo.com",
    "https://yandex.ru",
    "https://www.amazon.com",
    "https://www.tiktok.com",
    "https://www.baidu.com",
    "https://account.microsoft.com",
    "https://www.linkedin.com",
    "https://www.netflix.com",
    "https://www.naver.com",
    "https://www.live.com",
    "https://www.office.com",
    "https://dzen.ru",
    "https://www.bing.com",
    "https://www.pinterest.com",
    "https://www.temu.com",
    "https://www.bilibili.com",
    "https://www.microsoft.com",
    `${window.location.origin}/level20`,
    "https://www.twitch.tv",
    "https://vk.com",
    "https://mail.ru",
    "https://www.sharepoint.com",
    "https://news.yahoo.co.jp",
    "https://www.fandom.com",
    "https://www.weather.com",
    "https://www.globo.com",
    "https://www.canva.com",
    "https://www.samsung.com",
    "https://duckduckgo.com",
    "https://t.me",
    "https://www.aliexpress.com",
    "https://www.nytimes.com",
    "https://www.zoom.us",
    "https://www.ebay.com",
    "https://www.docomo.ne.jp",
    "https://www.roblox.com",
    "https://www.apple.com",
    "https://www.spotify.com",
    "https://www.discord.com",
    "https://www.imdb.com",
    "https://www.quora.com",
  ]);

  const shuffleArray = (array) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  const getRandomCoords = () => {
    const x = Math.floor(Math.random() * window.innerWidth);
    const y = Math.floor(Math.random() * window.innerHeight);
    return { x, y };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLinks((prev) => shuffleArray(prev));
    }, 2000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  const check = (link) => {
    updateLevel(link, uid, getLevel() + 1, "mediu").then(
      (res) => {
        if (res.data.ok) {
          alert(res.data.message);
          to(`/level${getLevel() + 1}`);
        } else {
          setLinks((prev) => prev.filter((item) => item !== link));
        }
      }
    );
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
          {links &&
            links.map((link) => {
              return (
                <Link
                  className="link"
                  target={link.includes("/level") ? "_self" : "_blank"}
                  style={{
                    position: "absolute",
                    left: getRandomCoords().x,
                    top: getRandomCoords().y,
                  }}
                  to={link}
                  onClick={() => {
                    check(link);
                  }}
                >
                  {link}
                </Link>
              );
            })}
        </div>
      ) : (
        <>Loading</>
      )}
    </div>
  );
}

export default Level19;
