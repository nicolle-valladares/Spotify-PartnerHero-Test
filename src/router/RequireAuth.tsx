import { ReactNode, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";

const RequireAuth = (props: { children: JSX.Element }): JSX.Element => {
  const { user } = useContext(AuthContext);

  if (user?.id) {
    return <Layout>{props.children}</Layout>;
  }
  return <Navigate to="/" />;
};

export default RequireAuth;
