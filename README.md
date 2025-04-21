## 🎬 Movie Explorer

A sleek and responsive web app to search and discover movies using an intuitive interface. Powered by React, Vite, and Tailwind CSS.

🔗 **Live Demo:** [https://movie-explorer-opal.vercel.app/](https://movie-explorer-opal.vercel.app/)

---

### 🚀 Features

- 🔍 Search for movies with live suggestions
- 🎥 Browse popular and trending titles
- 🧾 View detailed movie info including ratings, overview, release date, and more
- 🌙 Light/dark mode support
- 📱 Fully responsive UI

---

### 🛠️ Tech Stack

- **Frontend:** React, Vite
- **Styling:** Tailwind CSS
- **API:** [TMDB (The Movie Database)](https://www.themoviedb.org/documentation/api)
- **Deployment:** Vercel

---

### 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/movie-explorer.git
cd movie-explorer

# Install dependencies
npm install

# Create .env file and add your TMDB API key
cp .env.example .env

# Run the development server
npm run dev
```

---

### 🧪 Scripts

```bash
npm run dev       # start local server
npm run build     # production build
npm run preview   # preview production build
npm run lint      # lint check
```

---

### 📁 Project Structure

```
project/
├── public/             # Static assets
├── src/                # App source code
│   ├── components/     # Reusable UI components
│   ├── pages/          # Main views/pages
│   └── ...
├── .env.example        # Env variable example
├── package.json        # Project metadata
```

---

### 🌐 Environment Variables

Create a `.env` file in the root directory and add:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

---

### 📄 License

MIT

---
