import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Clubs from "./Clubs";
import Test from "./Test";

function App() {
  const user = {
    role: "admin",
    // role: "manager",
    // role: "director",
  };

  const isAdmin = user.role === "admin";
  const isManager = user.role === "manager";
  const isDirector = user.role === "director";

  const tabs = [
    "Clubs", // 0
    "Leagues", // 1
    "Cities", // 2
    "Positions", // 3
    "National", // 4
  ];
  const adminTabs = [0, 1, 2, 3, 4];
  const managerTabs = [0, 1, 2];
  const directorTabs = [3, 4];

  const displayTabs = isAdmin
    ? adminTabs
    : isManager
    ? managerTabs
    : isDirector
    ? directorTabs
    : [];

  return (
    <div className="App">
      <div className="header">
        {displayTabs.map((dt) => (
          <Link to={`/${tabs[dt]}`} className="link">
            <div>{tabs[dt]}</div>
          </Link>
        ))}
      </div>
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="clubs" element={<Clubs />} />
      </Routes>
    </div>
  );
}

export default App;
