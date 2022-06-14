import { Button } from "@mui/material";
import "./Login.css";

function Login() {
  const spotifyLogin = () => {
    window.location.replace(`${process.env.REACT_APP_AUTH_ENDPOINT}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=${process.env.REACT_APP_RESPONSE_TYPE}`)
  }

  return (
    <>
      <img src="/logo.webp" width="600px" className="background-logo" />
      <div className="login-call-for-action">
        <h1>¡Musica para todos!</h1>
        <p>Proyecto creado como test para la empresa Partner Hero</p>
        <Button variant="outlined" color="success" onClick={spotifyLogin}>
          Login to Spotify
        </Button>
      </div>
    </>
  );
}

export default Login;
