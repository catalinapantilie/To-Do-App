import "./App.css";
import { Auth } from "./login/login";
import { auth } from "./config/firebase";
import { signOut } from "firebase/auth";
import { Cookies } from "react-cookie";
import { useState } from "react";
import ToDoList from "./components/ToDoList";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
  };

  if (!isAuth) {
    return (
      <div className="App">
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }
  return (
    <div className="App">
      <ToDoList />
      <button className="form-btn" onClick={signUserOut}>
        Sign Out
      </button>
    </div>
  );
}

export default App;
