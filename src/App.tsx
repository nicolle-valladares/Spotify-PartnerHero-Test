import React, { Fragment, useEffect } from "react";
import "./App.css";
import { AuthContext, AuthProvider } from './contexts/AuthContext'


function App() {
  return (
    <>
      <AuthProvider>
        <AuthContext.Consumer>{(token) => {
          return (
            <div className="App">
              {!token ? (
                <a
                  href={`${process.env.REACT_APP_AUTH_ENDPOINT}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=${process.env.REACT_APP_RESPONSE_TYPE}`}
                >
                  Login to Spotify
                </a>
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
