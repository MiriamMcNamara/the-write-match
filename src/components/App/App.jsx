import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lightGreen, cyan } from "@mui/material/colors";

import { useDispatch, useSelector } from "react-redux";
import Footer from "../Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import AboutPage from "../AboutPage/AboutPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import ViewProfile from "../ViewProfile/ViewProfile";
import CreateProfile from "../CreateProfile/CreateProfile";
import NewMatchesList from "../NewMatchesList/NewMatchesList";
import SelectedMatchesList from "../SelectedMatchesList/SelectedMatchesList";
import NewNav from "../NewNav/NewNav";

import "./App.css";

const theme = createTheme({
  palette: {
    primary: cyan,
    secondary: lightGreen,
  },
  typography: {
    fontFamily: "Padauk",
    fontWeightRegular: 400,
    fontWeightBold: 700,
  },
});

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <NewNav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/login */}
            <Redirect exact from="/" to="/login" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
            >
              <AboutPage />
            </Route>

            <ProtectedRoute
              // logged in shows ViewProfile else shows LoginPage
              exact
              path="/profile"
            >
              <ViewProfile />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows CreateProfile else shows LoginPage
              exact
              path="/createprofile"
            >
              <CreateProfile />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows NewMatches else shows LoginPage
              exact
              path="/newmatches"
            >
              <NewMatchesList />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows SelectedMatches else shows LoginPage
              exact
              path="/selectedmatches"
            >
              <SelectedMatchesList />
            </ProtectedRoute>

            <Route exact path="/login">
              {user.id ? (
                // If the user is already logged in,
                // redirect to the /profile page
                <Redirect to="/profile" />
              ) : (
                // Otherwise, show the login page
                <LoginPage />
              )}
            </Route>

            <Route exact path="/registration">
              {user.id ? (
                // If the user is already logged in,
                // redirect them to the /profile page
                <Redirect to="/profile" />
              ) : (
                // Otherwise, show the registration page
                <RegisterPage />
              )}
            </Route>

            <Route exact path="/home">
              {user.id ? (
                // If the user is already logged in,
                // redirect them to the /profile page
                <Redirect to="/profile" />
              ) : (
                // Otherwise, show the Login page
                <LoginPage />
              )}
            </Route>

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
