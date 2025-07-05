import countries from 'i18n-iso-countries'
import enLocale from 'i18n-iso-countries/langs/en.json'

countries.registerLocale(enLocale)

export function getCountryName(code: string) {
  return countries.getName(code, 'en') || code
}

export function convertKelvintoCelcius(kelvin: number) {
  return `${(kelvin - 273.15).toString().substring(0, 2)}º`
}

export function setCelcius(celcius: number) {
  return `${celcius.toString().substring(0, 2)}°`
}

export function upperCaseFirstLetter(data: string) {
  return data
    .split(' ')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
