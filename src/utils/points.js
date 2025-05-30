import AXIOS from "./Axios_config";

const getHint = async (uid, level) => {
  return await AXIOS.post("/useHint", { uid, level });
};

const startLevel = async (uid, level) => {
  await AXIOS.post("/startLevel", { uid, level });
  const data = await fetch(`/.netlify/functions/getAnswer?level=${level}`);
  return data;
};

const ghicit = async (uid, nume) => {
  console.log({ uid, nume });
  return await AXIOS.post("/ghicit", { uid, nume });
};

export { getHint, ghicit, startLevel };
