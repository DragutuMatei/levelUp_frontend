import AXIOS from "./Axios_config.js"

const checkLevel = async (level, uid) => {
   return await AXIOS.post("/checkLevel", { level, uid })
}


export {checkLevel}