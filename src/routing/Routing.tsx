import { Navigate, Route, Routes } from "react-router-dom";
import Prediction from "../components/prediction/Prediction";
import ProtectRoutes from "./ProtectRoutes";
import Home from "../components/home/Home";
import Register from "../components/sign-up/Register";
import Dashboard from "../components/dashboard/Dashboard";

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/sign-up" element={<Register />} />

      <Route path="/" element={<ProtectRoutes />}>
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
