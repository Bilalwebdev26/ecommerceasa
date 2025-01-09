import axios from "axios"

const createInstace = axios.create({
    baseURL:import.meta.mode === "development" ? "http://localhost:3000/api":"/api",
    withCredentials:true,//send cookis to the server
})
export default createInstace