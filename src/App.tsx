import "./App.css";
import Layout from "./components/layout/Layout";
import Login from "./components/login/Login";
import Home from "./components/home/Home";

import { AuthContext, AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <AuthContext.Consumer>
          {({token, user}) => {
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
      </AuthProvider>
    </>
  );
}

export default App;
