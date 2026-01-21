// src/components/PoopCounter.jsx
import { useState, useEffect } from "react";
import "./styles/PoopCounter.css";
import PoopFace from "./PoopFace";

function PoopCounter() {
  const [count, setCount] = useState(1);
  const [newPoopIndex, setNewPoopIndex] = useState(null);

  const handleIncrement = () => {
    const newIndex = count; // where the new poop will be
    setNewPoopIndex(newIndex);

    setCount(count + 1);

    // remove animation class after it finishes
    setTimeout(() => setNewPoopIndex(null), 700);
  };

  // Build rows for the pyramid (top → bottom or bottom → top doesn’t matter)
  const buildRows = () => {
    const rows = [];
    let remaining = count;
    let rowSize = 1;
    let index = 0;

    while (remaining > 0) {
      const size = Math.min(remaining, rowSize);
      const row = Array.from({ length: size }, (_, i) => index + i);
      rows.push(row);
      index += size;
      remaining -= size;
      rowSize++;
    }

    return rows; // not reversed unless YOU want bottom→top later
  };

  const rows = buildRows();

  return (
    <div className="poop-counter">
      <h1 className="poop-title">Poop Counter 💩</h1>

      <div className="poop-pyramid">
        {rows.map((row, ri) => (
          <div key={ri} className="poop-row">
            {row.map((i) => {
              let className = "poop-emoji";
              if (i === newPoopIndex) className += " poop-emoji--drop";

              return (
                <span key={i} className={className}>
                  <PoopFace />
                </span>
              );
            })}
          </div>
        ))}
      </div>

      <div className="poop-count">Poops: {count}</div>

      <button className="poop-button" onClick={handleIncrement}>
        +1 poop
      </button>
    </div>
  );
}

export default PoopCounter;
