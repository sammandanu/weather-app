/** @type {import('tailwindcss').Config} */
import tailwindcssForm from '@tailwindcss/forms'
export default {
  content: ['./src/**/*.{html,js,vue}'],
  theme: {
    extend: {
      colors: {
        'gray-300': '#00000080',
        'gray-400': '#F7F7F9',
        'gray-450': '#EDEDED',
        'gray-500': '#545454',
        'gray-600': '#8C939D',
        'gray-750': '#757575',
        'gray-700': '#F5F5F5',
        'blue-100': '#D2DFFF',
        'blue-300': '#9AB6FF',
        'purple-100': '#F5F8FF',
        'graphite-700': '#494343',
        'charcoal-700': '#494343',
        'charcoal-800': '#212121',
        'charcoal-900': '#201C1C',
        'midnight-900': '#2E3A5A',
        success: '#0a8300',
        error: '#db1a1a'
      }
    }
  },
  plugins: [tailwindcssForm]
}
