import AXIOS from "./Axios_config";

const getHint = async (uid, level) => {
  return await AXIOS.post("/useHint", { uid, level });
};

const startLevel = async (uid, level) => {
  return await AXIOS.post("/startLevel", { uid, level });
};

const ghicit = async (uid, nume) => {
  console.log({ uid, nume });
  return await AXIOS.post("/ghicit", { uid, nume });
};

export { getHint, ghicit, startLevel };
