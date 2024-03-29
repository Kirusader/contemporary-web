/** @format */

import { createContext, useContext, useReducer, useEffect } from "react";
const initialState = {
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
  token: null,
  username: null,
  uid: null,
};
const AuthContext = createContext({
  state: initialState,
  dispatch: () => {},
});
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("uid", action.payload.uid);
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.username);
      return {
        isLoggedIn: true,
        uid: action.payload.uid,
        token: action.payload.token,
        username: action.payload.username,
      };
    case "LOGIN_FAILURE":
    case "LOGOUT":
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("token");
      localStorage.removeItem("uid");
      localStorage.removeItem("username");
      return { isLoggedIn: false, token: null, uid: null, username: null };
    default:
      return state;
  }
};
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    if (isLoggedIn && !state.isLoggedIn) {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          uid: localStorage.getItem("uid"),
          token: localStorage.getItem("token"),
          username: localStorage.getItem("username"),
        },
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
