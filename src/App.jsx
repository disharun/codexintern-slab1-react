import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Translator from "./pages/Translator.jsx";
import RandomString from "./pages/RandomString.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Navbar />
      <main className="flex-1 container-xl py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/translator" element={<Translator />} />
          <Route path="/random-string" element={<RandomString />} />
        </Routes>
      </main>
      <footer className="border-t bg-white/80 backdrop-blur-sm">
        <div className="container-xl py-6 text-sm text-gray-600">
          <div className="flex items-center justify-between">
            <span>
              CodeXIntern – Slab 1 (React + Tailwind + RapidAPI + Routing)
            </span>
            <div className="flex items-center space-x-4">
              <span className="text-xs">Made with ❤️</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
