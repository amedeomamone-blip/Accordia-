import { Navigate, Route, Routes } from "react-router-dom";
import SiteFrame from "./components/SiteFrame";
import HomePage from "./pages/HomePage";
import TimelinePage from "./pages/TimelinePage";

export default function App() {
  return (
    <SiteFrame>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </SiteFrame>
  );
}
