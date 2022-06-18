import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/home/Home";
import Login from "../components/login/Login";
import { AuthProvider } from "../contexts/AuthContext";
import { LibraryProvider } from "../contexts/LibraryContext";
import RequireAuth from "./RequireAuth";

const Router = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LibraryProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            {/* Private routes */}
            <Route
              path="/home"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
          </Routes>
        </LibraryProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Router;
