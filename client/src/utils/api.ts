import axios from "axios";

const isProduction = false
const developmentUrl = "http://localhost:8000"
const productionUrl = ""

export const api = axios.create({
  baseURL: isProduction ? productionUrl : developmentUrl,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  }
})