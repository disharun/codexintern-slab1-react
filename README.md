# CodeXIntern – Slab 1 (React + Tailwind + RapidAPI + Routing)

This project completes **Slab 1** of CodeXIntern Front-End task:
- ✅ Translator app using **RapidAPI**
- ✅ Random String Generator using **useState**, **useCallback**, **useEffect**
- ✅ Client-side routing using **react-router-dom**

## Tech
- React + Vite
- Tailwind CSS
- React Router
- RapidAPI (Text Translator v2 API)

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Add RapidAPI credentials**  
   Create a file named `.env` in the project root with:
   ```
   VITE_RAPIDAPI_KEY=YOUR_RAPIDAPI_KEY
   VITE_RAPIDAPI_HOST=text-translator2.p.rapidapi.com
   ```

3. **Run dev server**
   ```bash
   npm run dev
   ```

4. Open the URL printed in the terminal (usually `http://localhost:5173`).

## Notes
- Translator uses the RapidAPI *Text Translator v2* endpoint:
  - `POST https://text-translator2.p.rapidapi.com/translate`
  - Body: `source_language=en`, `target_language=<code>`, `text=<your text>`
- You can change or extend language codes in `src/pages/Translator.jsx` (array `LANGUAGES`).

## Submission Tips
- Take a short screen recording showing:
  1. Navbar and routing between pages
  2. Translating an English sentence to a regional language (e.g., Hindi)
  3. Generating a random string and copying it
- Push to GitHub and share the repo link, or zip and submit the project folder.
