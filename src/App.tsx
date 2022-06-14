import React, { Fragment, useEffect } from "react";
import "./App.css";
import Login from "./components/login/Login";
import { AuthContext, AuthProvider } from './contexts/AuthContext'


function App() {
  return (
    <>
      <img src="/logo.webp" width="60px" className="logo" />
      <AuthProvider>
        <AuthContext.Consumer>{(token) => {
          return (
            <div className="App">
              {!token ? (
                <Login />
              ) : (
                <p>Log out</p>
              )}
            </div>
          )
        }}
        </AuthContext.Consumer>
      </AuthProvider>
    </>
  );
}

export default App;
