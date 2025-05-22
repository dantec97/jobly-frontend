import { jwtDecode } from "jwt-decode";
import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import NavBar from './components/Navbar';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Companies from './pages/Companies';
import Admin from './pages/Admin';
import NotFound from './components/NotFound';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Profile from './components/Profile';
import CompanyDetail from './components/CompanyDetail';
import JoblyAPI from './API/JoblyAPI';
import UserContext from './auth/UserContext';
import RequireAuth from "./components/RequireAuth";

import './App.css';

function App() {
  const [token, setToken] = useLocalStorage("jobly-token", null);
  const [currentUser, setCurrentUser] = useState(null);
  const [userInfoLoaded, setUserInfoLoaded] = useState(false);

  // Load user info when token changes
  useEffect(() => {
    async function getUser() {
      setUserInfoLoaded(false);
      if (token) {
        try {
          const { username } = jwtDecode(token); // <-- use jwtDecode, not jwt_decode
          JoblyAPI.setToken(token);
          const user = await JoblyAPI.getUserProfile(username);
          setCurrentUser(user);
        } catch (err) {
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
      setUserInfoLoaded(true);
    }
    getUser();
  }, [token]);

  // Centralized login/signup/logout
  async function login(credentials) {
    const token = await JoblyAPI.login(credentials);
    setToken(token);
  }
  async function signup(data) {
    const token = await JoblyAPI.signup(data);
    setToken(token);
  }
  function logout() {
    setToken(null);
    setCurrentUser(null);
    JoblyAPI.setToken(null);
  }

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="App">
        <NavBar logout={logout} />
        {userInfoLoaded ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm login={login} />} />
            <Route path="/signup" element={<SignupForm signup={signup} />} />
            <Route
              path="/jobs"
              element={
                <RequireAuth>
                  <Jobs />
                </RequireAuth>
              }
            />
            <Route
              path="/companies"
              element={
                <RequireAuth>
                  <Companies />
                </RequireAuth>
              }
            />
            <Route
              path="/companies/:handle"
              element={
                <RequireAuth>
                  <CompanyDetail />
                </RequireAuth>
              }
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </UserContext.Provider>
  );
}

export default App;



