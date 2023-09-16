import React from "react";
import { useSelector, useDispatch } from "react-redux";

function BlackResult() {
  const { turn, blackNumber } = useSelector((state) => state.game);
  return (
    <div className={turn === "white" ? "resultb " : "resultb turn"}>
      <div className="centeredResults">
        <div>BLACK</div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>{blackNumber}</div>
      </div>
    </div>
  );
}

export default BlackResult;
