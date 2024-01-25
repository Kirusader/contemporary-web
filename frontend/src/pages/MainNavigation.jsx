/** @format */
import { NavLink } from "react-router-dom";
import "../navigation.css";
import { useAuth } from "../Reducer.jsx";
function MainNavigation() {
  const { state } = useAuth();
  return (
    <>
      <header className="header">
        <nav>
          <ul className="list">
            {state.isLoggedIn ? (
              <>
                <li>
                  <NavLink
                    to="/"
                    style={({ isActive }) => ({
                      color: isActive ? "white" : "",
                    })}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/chat"
                    style={({ isActive }) => ({
                      color: isActive ? "white" : "",
                    })}>
                    Chat
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/quiz"
                    style={({ isActive }) => ({
                      color: isActive ? "white" : "",
                    })}>
                    Quiz
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/game"
                    style={({ isActive }) => ({
                      color: isActive ? "white" : "",
                      fontSize: isActive ? "large" : "",
                    })}>
                    Game
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/logout"
                    style={({ isActive }) => ({
                      color: isActive ? "white" : "",
                      fontSize: isActive ? "large" : "",
                    })}>
                    LogOut
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/login"
                    style={({ isActive }) => ({
                      color: isActive ? "white" : "",
                      fontSize: isActive ? "large" : "",
                    })}>
                    LogIn
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/register"
                    style={({ isActive }) => ({
                      color: isActive ? "white" : "",
                      fontSize: isActive ? "large" : "",
                    })}></NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}

export default MainNavigation;
