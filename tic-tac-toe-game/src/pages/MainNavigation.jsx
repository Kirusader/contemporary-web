/** @format */
import { NavLink } from "react-router-dom";
import "../navigation.css";
function MainNavigation() {
  return (
    <>
      <header className="header">
        <nav>
          <ul className="list">
            <li>
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  color: isActive ? "red" : "",
                  fontSize: isActive ? "large" : "",
                })}>
                Game
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/quiz"
                style={({ isActive }) => ({
                  color: isActive ? "red" : "",
                })}>
                Quiz
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default MainNavigation;
