import axios from 'axios'
import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios'

class HttpClient {
  protected instance: AxiosInstance

  constructor(baseURL = import.meta.env.VITE_OPEN_WEATHER_MAP_URL, timeout = 30000) {
    const axiosConfig = {
      baseURL: baseURL,
      timeout: timeout
    }

    this.instance = axios.create(axiosConfig)
  }
}

export default HttpClient
