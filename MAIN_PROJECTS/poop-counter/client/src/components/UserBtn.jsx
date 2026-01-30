import React from "react";
import clsx from "clsx";

const colorMap = {
  blue: "bg-blue-400 hover:bg-blue-500 hover:text-blue-100 active:bg-blue-300 text-black",
  purple: "bg-purple-400 hover:bg-purple-500 hover:text-purple-100 active:bg-purple-300 text-black",
};

const UserButton = ({ label = "Button", onClick }) => {
  const lower = label.toLowerCase();
  const color = lower.includes("babi")
    ? "purple"
    : lower.includes("pabi")
    ? "blue"
    : "blue";

  return (
    <button
      onClick={onClick}
      className={clsx(
        // FONT + PADDING + BORDER
        "font-extrabold text-[18px] px-[1.3em] py-[0.6em] border-[3px] border-black rounded-md",

        // BASE SHADOW (0.1em 0.1em)
        "shadow-[0.2em_0.2em_0_0_rgba(0,0,0,1)]",

        // HOVER → translate -0.05em, shadow 0.15em
        "hover:-translate-x-[0.25em] hover:-translate-y-[0.25em]",
        "hover:shadow-[0.35em_0.35em_0_0_rgba(0,0,0,1)]",

        // ACTIVE → translate +0.05em, shadow 0.05em
        "active:translate-x-[0.05em] active:translate-y-[0.05em]",
        "active:shadow-[0.05em_0.05em_0_0_rgba(0,0,0,1)]",

        // TRANSITION + CURSOR
        "transition-all duration-150 cursor-pointer",

        // COLOR THEME
        colorMap[color]
      )}
    >
      {label}
    </button>
  );
};

export default UserButton;
