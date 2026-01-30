import React from "react";
import styled from "styled-components";

const UserSlider = ({ size = 60, user, onChange }) => {
  const handleChange = (e) => {
    onChange?.(e.target.checked);
  };

  return (
    <StyledWrapper size={size}>
      <label className="switch">
        <input
          defaultChecked={user === "babi"}
          type="checkbox"
          className="toggle"
          onChange={handleChange}
        />
        <span className="slider" />
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  ${({ size }) => {
    const height = size;
    const width = size * 2;
    const border = size * 0.05;

    const thumb = size * 0.8;
    const font = size * 0.28;

    /* IMPORTANT: SHADOW MUST BE EVENLY DISTRIBUTED */
    const shadow = size * 0.08;

    /* Perfect travel distance */
    const travel = width - thumb - border * 2;

    return `
      .switch {
        --color-on: #a855f7;
        --color-off: #3b82f6;
        --bg-white: #fff;
        --stroke: #323232;

        width: ${width}px;
        height: ${height}px;

        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;

        cursor: pointer;
      }

      .toggle {
        opacity: 0;
        width: 0;
        height: 0;
        position: absolute;
      }

      .slider {
        width: 100%;
        height: 100%;
        border-radius: 100px;
        border: ${border}px solid var(--stroke);
        background-color: var(--color-off);

        /* EVEN shadow to prevent visual bottom shift */
        box-shadow: ${shadow}px ${shadow}px var(--stroke);

        position: relative;

        display: flex;
        align-items: center;          /* PERFECT vertical centering */
        justify-content: flex-start;  /* Thumb starts on left */

        transition: 0.25s ease;
        cursor: pointer;
      }

      .slider:hover {
        transform: translate(-${border * 2}px, -${border * 2}px);
        box-shadow: ${shadow * 2.1}px ${shadow * 2.1}px var(--stroke);
      }

      .slider:before {
        content: "pabi";

        width: ${thumb}px;
        height: ${thumb}px;
        background: var(--bg-white);
        border: ${border}px solid var(--stroke);
        border-radius: 100px;

        font-size: ${font}px;
        font-weight: 600;
        color: var(--stroke);

        display: flex;
        align-items: center;
        justify-content: center;

        /* PERFECT LEFT POSITION WITHOUT OFFSET */
        margin-left: ${border * 1.5}px;

        transition: 0.25s ease;

        /* No translateY at all */
      }

      .toggle:checked + .slider {
        background-color: var(--color-on);
      }

      .toggle:checked + .slider:before {
        content: "babi";
        transform: translateX(${travel - border * 1.5 - size * 0.06}px);
      }
    `;
  }}
`;

export default UserSlider;
