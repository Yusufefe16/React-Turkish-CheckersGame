import React from "react";
import { useSelector, useDispatch } from "react-redux";

function WhiteResult() {
  const { turn, whiteNumber } = useSelector((state) => state.game);
  return (
    <div className={turn === "white" ? "resultw turn" : "resultw"}>
      <div className="centeredResults">
        <div>WHITE</div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>{whiteNumber}</div>
      </div>
    </div>
  );
}

export default WhiteResult;
