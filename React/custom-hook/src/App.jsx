import React, { useState } from "react";
import FetchData from "./Components/FetchData";
import FetchYogaData from "./Components/FetchYogaData";
import { useActionState } from "react";

function App() {
  return (
    <>
      {/* <FetchData/> */}
      <FetchYogaData />
    </>
  );
}

export default App;
