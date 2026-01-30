import React from "react";
import clsx from "clsx";

const colorMap = {
  blue: "bg-blue-400 hover:bg-blue-500 active:bg-blue-300 text-black",
  purple: "bg-purple-400 hover:bg-purple-500 active:bg-purple-300 text-black",
};

const AddBtn = ({
  onClick,
  color = "blue", // "blue" or "purple"
  size = 50, // pixel-based height
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "group relative flex items-center justify-center",
        "border-[3px] border-black rounded-[10px]",
        "font-extrabold select-none cursor-pointer",

        // SHADOW + TRANSLATE PHYSICS (same as UserButton)
        "shadow-[0.2em_0.2em_0_0_rgba(0,0,0,1)]",
        "hover:-translate-x-[0.25em] hover:-translate-y-[0.25em]",
        "hover:shadow-[0.35em_0.35em_0_0_rgba(0,0,0,1)]",
        "active:translate-x-[0.05em] active:translate-y-[0.05em]",
        "active:shadow-[0.05em_0.05em_0_0_rgba(0,0,0,1)]",
        "transition-all duration-150",

        // COLOR
        colorMap[color]
      )}
      style={{
        height: size,
        width: size * 1.1, // slightly wider rectangle
      }}
    >
      {/* PLUS SIGN (default) */}
      <span
        className="
          absolute opacity-100
          group-hover:opacity-0
          transition-all duration-150
        "
        style={{ fontSize: size * 0.55 }}
      >
        +
      </span>

      {/* POOP SVG (hover) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="
          absolute opacity-0
          group-hover:opacity-100
          transition-all duration-150
          fill-current
        "
        style={{
          width: size * 0.55,
          height: size * 0.55,
        }}
      >
        <path d="M256 32c-14 32-48 40-48 80 0 24 16 40 16 40s-48 0-80 32c-24 24-32 64-32 64s-64 0-80 48c-8 24 0 48 16 64 24 24 64 32 96 32h208c40 0 88-16 104-48 16-32-8-64-32-80-24-16-56-16-56-16s8-40-16-72c-32-40-80-40-80-40s16-16 16-40c0-40-32-48-48-64z" />
      </svg>
    </button>
  );
};

export default AddBtn;
