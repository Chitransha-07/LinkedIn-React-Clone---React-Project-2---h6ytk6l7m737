import React, { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

// DarkModeProvider component manages the dark mode state and provides it to its children
function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(
    sessionStorage.getItem("linkedin-darkMode") ? true : false
  );

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export default DarkModeProvider;

export function useDarkMode() {
  return useContext(DarkModeContext);
}
