import axios from "axios";
import AXIOS from "./Axios_config";

const getHint = async (uid, level) => {
  return await AXIOS.post("/useHint", { uid, level });
};

const startLevel = async (uid, level) => {
  await AXIOS.post("/startLevel", { uid, level });
  const data = await fetch(`/.netlify/functions/getAnswer?level=${level}`)
    .then((res) => res.json())
    .then((res) => {
      console.log("res");
      console.log(typeof res.body);
      console.log(res);
      return res;
    });
  return data;
};

const ghicit = async (uid, nume) => {
  return await AXIOS.post("/ghicit", { uid, nume });
};

export { getHint, ghicit, startLevel };
