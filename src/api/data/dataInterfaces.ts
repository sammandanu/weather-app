export interface IAuthLogin {
  accessToken: string
}

// OpenWeatherMap 5-day/3-hour forecast API response types
export interface Weather {
  id: number
  main: string
  description: string
  icon: string
}

export interface Main {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  sea_level?: number
  grnd_level?: number
  humidity: number
  temp_kf?: number
}

export interface ForecastListItem {
  dt: number
  main: Main
  weather: Weather[]
  clouds: { all: number }
  wind: { speed: number; deg: number; gust?: number }
  visibility: number
  pop: number
  sys: { pod: string }
  dt_txt: string
}

export interface ForecastResponse {
  cod: string
  message: number
  cnt: number
  list: ForecastListItem[]
  city: {
    id: number
    name: string
    coord: { lat: number; lon: number }
    country: string
    population: number
    timezone: number
    sunrise: number
    sunset: number
  }
}
