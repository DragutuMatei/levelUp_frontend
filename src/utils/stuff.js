import AXIOS from "./Axios_config";

export const to = (path) => {
  window.location = path;
};
export const getLevel = () => {
  return parseInt(
    window.location.href.replace(`${window.location.origin}/level`, "")
  );
};

export const updateLevel = async (resp, uid, level, cat='greu') => {
  return await AXIOS.post("/updateLevel", {resp, uid,  level, level_hint:getLevel(), cat });
};

function generateSeed() {
  const getRandomNumber = () => Math.floor(Math.random() * (14 - 5 + 1)) + 5;
  const getRandomLetter = () => String.fromCharCode(
    Math.floor(Math.random() * (75 - 66 + 1)) + 66 // codurile ASCII pentru B-K
  );

  let seed = "";
  for (let i = 0; i < 4; i++) {
    seed += getRandomNumber() + getRandomLetter() + getRandomLetter();
  }

  return seed;
}