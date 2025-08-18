import { Link, NavLink } from "react-router-dom";

const linkBase =
  "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden";
const active =
  "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105";
const inactive =
  "text-gray-700 hover:bg-white/50 hover:text-indigo-600 hover:scale-105";

export default function Navbar() {
  return (
    <header className="bg-white/70 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-sm">
      <div className="container-xl py-4 flex items-center justify-between gap-4">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight hover:scale-105 transition-transform duration-300 animate-float"
        >
          <span className="gradient-text">CodeX</span>
          <span className="text-indigo-600">Intern</span>
          <span className="text-xl ml-1">✨</span>
        </Link>
        <nav className="flex gap-3">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            🏠 Home
          </NavLink>
          <NavLink
            to="/translator"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            🌐 Translator
          </NavLink>
          <NavLink
            to="/random-string"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            🎲 Random String
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
