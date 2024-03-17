import React, { useEffect } from "react";
import tour from "../../assets/images/linkedin-tour1.png";
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
            This Page is not implemented. All the working functionalities has
            mentioned below. Click here to go to{" "}
            <Link to="/feed">main page.</Link>
            <br />
            <br />
            All the woring functionalities have <span>cursor as pointer*</span>.
          </div>
          <img style={{ width: "100%" }} src={tour} alt="" />
        </div>
      </div>
    )
  );
}

export default PageNotFound;
