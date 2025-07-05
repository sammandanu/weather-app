import HttpClient from '@/api/HttpClient'
import type { ICitiesResponse } from './geoInterfaces'

const OPEN_WEATHER_MAP_URL = import.meta.env.VITE_OPEN_WEATHER_MAP_APP_ID

export default class GeoApiClient extends HttpClient {
  async getCities(search: string): Promise<ICitiesResponse[]> {
    const url = `geo/1.0/direct?q=${search}&limit=10&appid=${OPEN_WEATHER_MAP_URL}`
    const response = await this.instance.get(url)
    const { data } = response
    return data
  }

  async reverseGeocode(lat: number, lon: number): Promise<ICitiesResponse | null> {
    const url = `geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${OPEN_WEATHER_MAP_URL}`
    const response = await this.instance.get(url)
    const { data } = response
    if (data && data.length > 0) {
      return data[0]
    }
    return null
  }
}
