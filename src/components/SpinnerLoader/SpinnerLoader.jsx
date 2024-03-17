import React from "react";
import "./SpinnerLoader.css";
import CircularProgress from "@mui/material-next/CircularProgress";

function SpinnerLoader() {
  return (
    <div className="spinner-container">
      <CircularProgress fourColor={false} />
    </div>
  );
}

export default SpinnerLoader;
