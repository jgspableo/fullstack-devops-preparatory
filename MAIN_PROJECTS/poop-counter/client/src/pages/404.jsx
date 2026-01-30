import React from "react";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="">
      <h1 className="text-9xl">Page not found!</h1>
      <Link to={"/"}>Home</Link>
    </div>
  );
}
