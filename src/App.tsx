import React, { Fragment, useEffect } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Login from "./components/login/Login";
import { AuthContext, AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <AuthContext.Consumer>
          {([token, user]) => {
            return (
              <div className="App">
                {!token ? (
                  <>
                    <img src="/logo.webp" width="60px" className="logo" />
                    <Login />
                  </>
                ) : (
                  <Navbar user={user} />
                  // TODO: Logout method 
                )}
              </div>
            );
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    </>
  );
}

export default App;
