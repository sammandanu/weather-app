import HttpClient from '@/api/HttpClient'

const OPEN_WEATHER_MAP_URL = import.meta.env.VITE_OPEN_WEATHER_MAP_APP_ID

export default class DatahApiClient extends HttpClient {
  async getWeather(search: string) {
    const url = `data/2.5/weather?q=${search}&appid=${OPEN_WEATHER_MAP_URL}&units=metric`
    const response = await this.instance.get(url)
    const { data } = response
    return data
  }
  async getHourlyForecast(lat: string, lon: string) {
    const url = `data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_MAP_URL}`
    const response = await this.instance.get(url)
    const { data } = response
    return data
  }
}
