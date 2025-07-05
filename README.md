# Weather App

A modern weather application built with Vue 3 and Vite, providing real-time weather data using the OpenWeatherMap API. The app features city search, detailed forecasts, and a clean, responsive UI.

---

## 🌟 Features

- Search for cities and view current weather conditions
- Hourly and weekly weather forecasts
- Detailed city weather view
- User profile with avatar
- Responsive design for desktop and mobile
- Snackbar notifications for user feedback

---

## 🛠️ Tech Stack

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenWeatherMap API](https://openweathermap.org/api)

---

## 🚀 Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### 2. Clone the Repository

```sh
git clone https://github.com/your-username/weather-app.git
cd weather-app
```

### 3. Install Dependencies

```sh
npm install
```

### 4. Set Up Environment Variables

1. Create a `.env` file in the project root:
   ```sh
   cp .env.example .env
   ```
2. Add your OpenWeatherMap API key and base URL:
   ```env
   VITE_OPENWEATHERMAP_API_KEY=your_api_key_here
   VITE_OPEN_WEATHER_MAP_URL=https://api.openweathermap.org/
   ```

---

## 🏃 Usage

### Start Development Server

```sh
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to view the app.

### Build for Production

```sh
npm run build
```

### Type Check

```sh
npm run type-check
```

### Lint

```sh
npm run lint
```

---

## 📁 Folder Structure

```
weather-app/
├── public/                # Static assets
├── src/
│   ├── api/               # API modules (data, geo, http)
│   ├── assets/            # Images, fonts, CSS
│   ├── components/        # Vue components
│   ├── interfaces/        # TypeScript interfaces
│   ├── router/            # Vue Router setup
│   ├── stores/            # Pinia stores
│   ├── types/             # Type definitions
│   ├── utils/             # Utility functions
│   └── views/             # Page views
├── package.json           # Project metadata and scripts
└── ...
```
