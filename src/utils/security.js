import AXIOS from "./Axios_config"

const checkLevel = async (level, uid) => {
   return await AXIOS.post("/checkLevel", { level, uid })
}


export {checkLevel}