import { AuthProvider } from "./contexts/AuthContext";
import { LibraryProvider } from "./contexts/LibraryContext";
import Router from "./router/Router";

import './App.css'

function App() {
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
