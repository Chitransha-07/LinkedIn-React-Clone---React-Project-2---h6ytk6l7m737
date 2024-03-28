import React, { useEffect } from "react";
// import tour from "../../assets/images/linkedin-tour1.png";
import { Link } from "react-router-dom";
import { useDarkMode } from "../providers/DarkModeProvider";

function PageNotFound({ loading, setLoading }) {
  const { darkMode } = useDarkMode();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 600);
  }, []);
  return (
    !loading && (
      <div className="all-content-container">
        <div className={`guide-container ${darkMode ? "dark" : ""}`}>
          <div>
            <br />
            <br />
            <h1>
             <span>Coming Soon</span>
             </h1>
          </div>    
        </div>
      </div>
    )
  );
}

export default PageNotFound;
