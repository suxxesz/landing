"use client";

import { useEffect } from "react";

export default  function ThemeAndTitle() {
  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme === "dark-theme") {
      document.documentElement.classList.add("dark-theme");
    }

    const text = "SuxxesZ";

    let index = text.length;
    let deleting = true;

    const interval = setInterval(() => {
      document.title = text.slice(0, Math.max(1, index));

      if (deleting) {
        index--;

        if (index < 0) {
          deleting = false;
          index = 1;
        }
      } else {
        index++;

        if (index > text.length) {
          deleting = true;
          index = text.length - 1;
        }
      }
    }, 700);

    return () => clearInterval(interval);
  }, []);

  return null;
}