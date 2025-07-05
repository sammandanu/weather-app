export interface CountryInterface {
  dialCode: string
  iso2: string
  name: string
}

export interface Coord {
  lon: number
  lat: number
}

export interface Main {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
  sea_level?: number
  grnd_level?: number
}

export interface Sys {
  country: string
  sunrise: number
  sunset: number
}

export interface Weather {
  id: number
  main: string
  description: string
  icon: string
}

export interface Wind {
  speed: number
  deg: number
  gust?: number
}

export interface Clouds {
  all: number
}

export interface WeatherApiResponse {
  coord: Coord
  base: string
  clouds: Clouds
  cod: number
  dt: number
  id: number
  main: Main
  name: string
  sys: Sys
  timezone: number
  visibility: number
  weather: Weather[]
  wind: Wind
  background: string
  country: string
}
