import { useEffect, useRef, useState } from "react";
import "./styles/poopFace.css";

function PoopFace() {
  const faceRef = useRef(null);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    function handleMove(e) {
      const el = faceRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      setAngle(Math.atan2(dy, dx));
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // pupils rotate a bit inside each white eye
  const pupilStyle = {
    transform: `translate(-50%, -50%) rotate(${angle}rad) translate(4px, 0)`,
  };

  return (
    <div className="poop-face" ref={faceRef}>
      <div className="poop-emoji">💩</div>

      {/* white eyes + moving pupils */}
      <div className="eye eye-left">
        <div className="pupil" style={pupilStyle} />
      </div>
      <div className="eye eye-right">
        <div className="pupil" style={pupilStyle} />
      </div>
    </div>
  );
}

export default PoopFace;
