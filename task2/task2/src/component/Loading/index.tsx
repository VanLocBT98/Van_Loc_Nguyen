import React from "react";
import "./index.scss";
export default function Loading() {
  return (
    <div className="c-loading">
      <div id="outer">
        <div id="middle">
          <div id="inner"></div>
        </div>
      </div>
    </div>
  );
}
