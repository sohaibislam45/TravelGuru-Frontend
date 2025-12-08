import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useSpring, animated } from "react-spring";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    // Handle "travelguru" theme as "light" for consistency
    if (savedTheme === "travelguru" || !savedTheme) {
      return "light";
    }
    return savedTheme;
  });

  useEffect(() => {
    // Map "light" to "travelguru" for consistency with default theme
    const themeValue = theme === "light" ? "travelguru" : theme;
    document.documentElement.setAttribute("data-theme", themeValue);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // React Spring animation for button scale
  const [isHovered, setIsHovered] = useState(false);
  const buttonSpring = useSpring({
    transform: isHovered ? "scale(1.1)" : "scale(1)",
    config: { tension: 300, friction: 20 },
  });

  return (
    <animated.button
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={buttonSpring}
      className="btn btn-ghost btn-circle relative overflow-hidden"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait">
        {theme === "light" ? (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <FaMoon className="w-5 h-5" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <FaSun className="w-5 h-5" />
          </motion.div>
        )}
      </AnimatePresence>
    </animated.button>
  );
};

export default ThemeToggle;

