import React from "react";
import { useNavigate } from "react-router-dom";
import UserButton from "../components/UserBtn";

function Question() {
  const navigate = useNavigate();

  const handleLogin = (user) => {
    navigate("/dashboard", { state: { user } });
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-5xl mb-1 font-bold text-center">Who are you?</h1>
        <div className="grid grid-cols-2 gap-3">
          <UserButton label="I am babi!" onClick={() => handleLogin("babi")} />
          <UserButton label="I am pabi!" onClick={() => handleLogin("pabi")} />
        </div>
      </div>
    </div>
  );
}

export default Question;
