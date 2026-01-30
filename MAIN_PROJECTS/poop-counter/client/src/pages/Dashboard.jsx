import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

//get apis
import {
  getAllPoopCount,
  getDailyPoopCount,
  getWeeklyPoopCount,
  addPoopCount,
} from "../api/poopAPI";

//get other components
import DailyRow from "../components/DailyRow";


export default function Dashboard() {
  const { state } = useLocation();
  const user = state?.user;
  
  return (
    <div>
      <div className="flex items-center">
        <DailyRow user={user} />
      </div>
    </div>
  );
}
