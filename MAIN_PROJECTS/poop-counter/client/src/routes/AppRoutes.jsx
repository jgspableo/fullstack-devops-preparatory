import { Routes, Route } from "react-router-dom";
import Question from "../pages/Question";
import Dashboard from "../pages/Dashboard";
import Error from "../pages/404";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Question />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
