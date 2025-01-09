import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className="text-white py-4 text-center">
      <h1 className="text-4xl font-bold">Todo List 😎</h1>

      <nav className="flex flex-wrap gap-4 justify-center my-10">
        <Link
          to="/"
          className={`text-base ${location.pathname === "/" ? "font-bold underline" : "text-white"}`}
        >
          Home
        </Link>
        <Link
          to="/create-character"
          className={`text-base ${location.pathname === "/create-character" ? "font-bold underline" : "text-white"}`}
        >
          Create Character
        </Link>
        <Link
          to="/my-character"
          className={`text-base ${location.pathname === "/my-character" ? "font-bold underline" : "text-white"}`}
        >
          My Character
        </Link>
        <Link
          to="/singup"
          className={`text-base ${location.pathname === "/singup" ? "font-bold underline" : "text-white"}`}
        >
          Sing Up
        </Link>
        <Link
          to="/login"
          className={`text-base ${location.pathname === "/login" ? "font-bold underline" : "text-white"}`}
        >
          Login
        </Link>
        <Link
          to="/settings"
          className={`text-base ${location.pathname === "/settings" ? "font-bold underline" : "text-white"}`}
        >
          Settings
        </Link>
      </nav>
    </header>
  );
};

export default Header;
