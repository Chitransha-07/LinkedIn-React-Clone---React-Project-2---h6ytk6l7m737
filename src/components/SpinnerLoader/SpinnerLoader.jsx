import React from "react";
import "./SpinnerLoader.css";
import CircularProgress from "@mui/material-next/CircularProgress";

// this component serves as a visual indication to the user that the page is currently loading or performing some background task.
function SpinnerLoader() {
  return (
    <div className="spinner-container">
      <CircularProgress fourColor={false} />
    </div>
  );
}

export default SpinnerLoader;
