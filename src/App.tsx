import "./App.css";
import Layout from "./components/layout/Layout";
import Login from "./components/login/Login";
import Home from "./components/home/Home";

import { AuthContext, AuthProvider } from "./contexts/AuthContext";
import { LibraryProvider } from "./contexts/LibraryContext";

function App() {
  return (
    <>
      <AuthProvider>
        <LibraryProvider>
          <AuthContext.Consumer>
            {({ token, user, library }) => {
              return (
                <div className="App">
                  {!token ? (
                    <>
                      <img src="/logo.webp" width="60px" className="logo" />
                      <Login />
                    </>
                  ) : (
                    <Layout>
                      <Home />
                    </Layout>
                    // TODO: Logout method
                  )}
                </div>
              );
            }}
          </AuthContext.Consumer>
        </LibraryProvider>
      </AuthProvider>
    </>
  );
}

export default App;
