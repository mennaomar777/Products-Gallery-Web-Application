import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaShoppingCart, FaSun, FaMoon } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.classList.toggle("dark", isDark);
      localStorage.theme = isDark ? "dark" : "light";

      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => setIsDark(mediaQuery.matches);

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <nav className="bg-[#BEA190] border-gray-200 dark:bg-gray-800">
      <div className="container">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-3 text-white">
          <NavLink
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <FaShoppingCart className="text-2xl" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              Tech Bazar
            </span>
          </NavLink>

          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-[#a6786f] focus:outline-none focus:ring-2 focus:ring-white"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <div
            className={`${
              menuOpen ? "block" : "hidden"
            } w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 border border-[#ddbfb4] rounded-lg bg-[#f1e5e1] md:flex-row md:mt-0 md:border-0 md:bg-transparent text-lg gap-4">
              <li className="px-2 py-1 m-0 dark:hover:bg-[#A68A82] rounded-lg">
                <NavLink
                  to="/"
                  className="block py-2 px-3 text-white rounded-sm md:bg-transparent hover:text-[#8e5f57] dark:hover:text-white md:p-0 transition dark:hover:bg-[#A68A82] m-0 text-lg"
                >
                  Home
                </NavLink>
              </li>
              <li className="px-2 py-1 m-0 dark:hover:bg-[#A68A82] rounded-lg">
                <NavLink
                  to="/"
                  className="block py-2 px-3 text-white rounded-sm bg-transparent hover:text-[#8e5f57] dark:hover:text-white md:p-0 transition m-0 text-lg"
                >
                  Products
                </NavLink>
              </li>
              <li className="px-2">
                <button
                  onClick={toggleDarkMode}
                  className="block py-2 px-3 rounded-sm md:p-0 transition-colors text-white md:hover:text-[#8e5f57] cursor-pointer text-xl"
                >
                  {isDark ? <FaSun /> : <FaMoon />}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
