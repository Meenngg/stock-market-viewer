import axios from "axios"

let TOKEN = "cgt3bo1r01qkisfisbp0cgt3bo1r01qkisfisbpg"

export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params: {
        token: TOKEN
    }
})