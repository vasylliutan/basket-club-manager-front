import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";

import Clubs from "./Clubs";
import Cityes from "./City";
import Leagues from "./Leagues";
import Nationalityes from "./Nationalityes";
import Positions from "./Positions";
import Agents from "./Agents";
import Trainers from "./Trainers";
import TrainerContracts from "./TrainerContracts";
import ClubManagers from "./ClubManagers";
import OfficeRoles from "./OfficeRoles";
import SpecialConditions from "./SpecialCondition";
import Sponsors from "./Sponsors";
import CoachResponsibilities from "./CoachResponsibilities";
import SponsorsServices from "./SponsorServices";
import PCSC from "./PCSC";
import TCSC from "./TCSC";
import TCCR from "./TCCR";
import Players from "./Players";
import PlayerContracts from "./PlayerContracts";
import TransferHistories from "./TransferHistories";
import WorkHistories from "./WorkHistories";
import SponsorAgreements from "./SponsorAgreements";
import SSSA from "./SSSA";

import Test from "./Test";
import Login from "./Login";
import React from "react";
import Stats from "./Stats";

function App() {
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [logged, setLogged] = React.useState(
    !!JSON.parse(localStorage.getItem("user"))
  );

  React.useEffect(() => {
    function checkUserData() {
      const item = localStorage.getItem("user");
      if (!item) {
        setLogged(false);
      }
    }
    window.addEventListener("storage", checkUserData);
    return () => {
      window.removeEventListener("storage", checkUserData);
    };
  }, []);

  React.useEffect(() => {
    if (logged) {
      setUser(JSON.parse(localStorage.getItem("user")));
    } else {
      setUser(null);
      localStorage.removeItem("user");
    }
  }, [logged]);

  React.useEffect(() => {
    console.log(user);
  }, [user]);

  const isAdmin = user?.officeRoleName === "Admin";
  const isManager = user?.officeRoleName === "Manager";
  const isDirector = user?.officeRoleName === "Director";
  const navigate = useNavigate();
  const tabs = [
    "Clubs", // 0
    "Leagues", // 1
    "Cityes", // 2
    "Positions", // 3
    "Nationalityes", // 4
    "ClubManagers", // 5
    "OfficeRoles", //6
    "SpecialConditions", //7
    "Sponsors", //8
    "SponsorsServices", //9
    "CoachResponsibilities", //10
    "PCSC", //11
    "TCSC", //12
    "TCCR", //13
    "Players", //14
    "PlayerContracts", //15
    "TransferHistories", //16
    "WorkHistories", //17
    "SponsorAgreements", //18
    "SSSA", //19
    "Stats", //20
  ];
  const adminTabs = [
    0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  ];
  const managerTabs = [0, 1, 2, 5];
  const directorTabs = [3, 4, 5, 20];

  const displayTabs = isAdmin
    ? adminTabs
    : isManager
    ? managerTabs
    : isDirector
    ? directorTabs
    : [];

  const logout = () => {
    localStorage.removeItem("user");
    setLogged(false);
    navigate("login");
  };

  function RequireAuth({ children, logged }) {
    let location = useLocation();

    if (!logged) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    if (
      displayTabs.some(
        (dt) =>
          tabs[dt].toLowerCase() === location.pathname.slice(1).toLowerCase()
      )
    ) {
      return children;
    } else {
      return (
        <Navigate
          to={"/" + tabs[displayTabs[0]]}
          state={{ from: location }}
          replace
        />
      );
    }
  }
  return (
    <div className="App">
      <div className="header">
        {displayTabs.map((dt) => (
          <Link to={`/${tabs[dt]}`} className="link">
            <div>{tabs[dt]}</div>
          </Link>
        ))}
        {!!displayTabs.length && (
          <div className="link" onClick={logout}>
            <div>Logout</div>
          </div>
        )}
      </div>
      <Routes>
        <Route path="/" element={<Test />} />
        <Route
          path="/login"
          element={<Login setLogged={setLogged} logged={logged} />}
        />
        <Route
          path="clubs"
          element={
            <RequireAuth logged={logged}>
              <Clubs />
            </RequireAuth>
          }
        />
        <Route
          path="cityes"
          element={
            <RequireAuth logged={logged}>
              <Cityes />
            </RequireAuth>
          }
        />
        <Route
          path="stats"
          element={
            <RequireAuth logged={logged}>
              <Stats />
            </RequireAuth>
          }
        />

        <Route
          path="leagues"
          element={
            <RequireAuth logged={logged}>
              <Leagues />
            </RequireAuth>
          }
        />
        <Route
          path="nationalityes"
          element={
            <RequireAuth logged={logged}>
              <Nationalityes />
            </RequireAuth>
          }
        />
        <Route
          path="positions"
          element={
            <RequireAuth logged={logged}>
              <Positions />
            </RequireAuth>
          }
        />
        <Route
          path="agents"
          element={
            <RequireAuth logged={logged}>
              <Agents />
            </RequireAuth>
          }
        />
        <Route
          path="trainers"
          element={
            <RequireAuth logged={logged}>
              <Trainers />
            </RequireAuth>
          }
        />
        {/* <br /> */}
        <Route
          path="players"
          element={
            <RequireAuth logged={logged}>
              <Players />
            </RequireAuth>
          }
        />

        <Route
          path="trainercontracts"
          element={
            <RequireAuth logged={logged}>
              <TrainerContracts />
            </RequireAuth>
          }
        />
        <Route
          path="playercontracts"
          element={
            <RequireAuth logged={logged}>
              <PlayerContracts />
            </RequireAuth>
          }
        />

        <Route
          path="clubmanagers"
          element={
            <RequireAuth logged={logged}>
              <ClubManagers isAdmin={isAdmin} />
            </RequireAuth>
          }
        />
        <Route
          path="officeroles"
          element={
            <RequireAuth logged={logged}>
              <OfficeRoles />
            </RequireAuth>
          }
        />
        <Route
          path="specialconditions"
          element={
            <RequireAuth logged={logged}>
              <SpecialConditions />
            </RequireAuth>
          }
        />
        <Route
          path="sponsors"
          element={
            <RequireAuth logged={logged}>
              <Sponsors />
            </RequireAuth>
          }
        />
        <Route
          path="coachresponsibilities"
          element={
            <RequireAuth logged={logged}>
              <CoachResponsibilities />
            </RequireAuth>
          }
        />
        <Route
          path="sponsorsservices"
          element={
            <RequireAuth logged={logged}>
              <SponsorsServices />
            </RequireAuth>
          }
        />
        <Route
          path="PCSC"
          element={
            <RequireAuth logged={logged}>
              <PCSC />
            </RequireAuth>
          }
        />
        <Route
          path="TCSC"
          element={
            <RequireAuth logged={logged}>
              <TCSC />
            </RequireAuth>
          }
        />
        <Route
          path="TCCR"
          element={
            <RequireAuth logged={logged}>
              <TCCR />
            </RequireAuth>
          }
        />
        <Route
          path="transferhistories"
          element={
            <RequireAuth logged={logged}>
              <TransferHistories />
            </RequireAuth>
          }
        />
        <Route
          path="workhistories"
          element={
            <RequireAuth logged={logged}>
              <WorkHistories />
            </RequireAuth>
          }
        />

        <Route
          path="sponsoragreements"
          element={
            <RequireAuth logged={logged}>
              <SponsorAgreements />
            </RequireAuth>
          }
        />
        <Route
          path="SSSA"
          element={
            <RequireAuth logged={logged}>
              <SSSA />
            </RequireAuth>
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to={
                "/" + logged && !!displayTabs?.length
                  ? tabs[displayTabs[0]]
                  : "login"
              }
              replace
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
