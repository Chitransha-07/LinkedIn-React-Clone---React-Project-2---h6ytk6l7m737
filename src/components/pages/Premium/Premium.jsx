import React, { useEffect } from "react";
import "./Premium.css";
import { useDarkMode } from "../../providers/DarkModeProvider";

function Premium({ loading, setLoading }) {
  const { darkMode } = useDarkMode();
  useEffect(() => {
    setLoading(false);
  });
  return (
    <div className="all-content-container">
      <div className={`premium-details-container ${darkMode ? "dark" : ""}`}>
        <p>
          <b>Get hired 2x faster on average </b>
          by discovering over 20 million open jobs and exploring valuable
          resources to help whit your search.
        </p>
        <button>Try now</button>
        <div className="premium-card-container">
          <div className={`premium-card ${darkMode ? "dark" : ""}`}>
            <h4>InMail credits</h4>
            <div className={`premium-reach ${darkMode ? "dark" : ""}`}>
              <p>Career</p>
              <h1>2.6x</h1>
              <p>
                Premium members are 2.6x more likely to get hired on average.
              </p>
            </div>
            <p>Connect with hiring managers</p>
            <p>
              Show your interest in open rol with inMail. it's 2.6x more
              effective than emails alone.
            </p>
          </div>
          <div className={`premium-card ${darkMode ? "dark" : ""}`}>
            <h4>Who's Viewed Your Profile</h4>
            <div>
              <img
                src="https://static.licdn.com/aero-v1/sc/h/awfqc67t42p28qr5oetysabdg"
                alt=""
              />
            </div>
            <p>Turn views into opportunities</p>
            <p>
              See who's viewed your profile over the last 90 days, and who looks
              next.
            </p>
          </div>
          <div className={`premium-card ${darkMode ? "dark" : ""}`}>
            <h4>LinkedIn Learning courses</h4>
            <div>
              <img
                src="https://media.licdn.com/media/AAYQAgSuAAgAAQAAAAAAACwog6StkzhzSlK17m4iY5d_Xg.png"
                alt=""
              />
            </div>
            <p>Sharpen your skills</p>
            <p>
              Hone your skills or try something new -- access over 15,000
              expert-led LinkedIn Learning courses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Premium;
