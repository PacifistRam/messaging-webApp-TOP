import { useEffect, useState } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const DarkLightToggle = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true" ? true : false
  );

  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <button onClick={toggleDarkMode} className="btn btn-ghost text-2xl btn-md ">
      {darkMode ? <MdLightMode /> : <MdDarkMode />}
    </button>
  );
};

export default DarkLightToggle;
