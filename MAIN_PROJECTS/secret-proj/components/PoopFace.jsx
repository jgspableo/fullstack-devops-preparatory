import { useEffect, useRef, useState } from "react";
import "./styles/poopFace.css";

function PoopFace({ headAngle = 0 }) {
  const faceRef = useRef(null);
  const [localAngle, setLocalAngle] = useState(0);

  useEffect(() => {
    function handleMove(e) {
      const el = faceRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      // angle in world space
      const worldAngle = Math.atan2(dy, dx);
      // compensate for the poop's rotation so eyes still point at the cursor
      const angleInHeadSpace = worldAngle - headAngle;

      setLocalAngle(angleInHeadSpace);
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [headAngle]);

  const pupilStyle = {
    transform: `translate(-50%, -50%) rotate(${localAngle}rad) translate(4px, 0)`,
  };

  return (
    <div className="poop-face" ref={faceRef}>
      <div className="poop-emoji">💩</div>

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
