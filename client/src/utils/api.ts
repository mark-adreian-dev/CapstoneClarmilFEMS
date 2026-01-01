import axios from "axios";

export const isProduction = false
export const developmentUrl = "http://localhost:8000"
export const productionUrl = ""
export const BASE_IMAGE_URL = isProduction ? `${productionUrl}/storage/` : `${developmentUrl}/storage/`

export const api = axios.create({
  baseURL: isProduction ? productionUrl : developmentUrl,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  }
})