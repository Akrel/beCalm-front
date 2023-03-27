import axios from "axios";

const instance = axios.create({
    baseURL: "http://127.0.0.1:8081",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
});

export default instance;
