import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { Cookies } from "react-cookie";
import "./login.css";
const cookies = new Cookies();

export function Auth(props) {
  const { setIsAuth } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async (e) => {
    e.preventDefault();

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.log(err);
    }
    console.log(auth);
  };

  const logIn = async (e) => {
    e.preventDefault();

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.log(err);
    }
    console.log(auth);
  };
  return (
    <div className="form-2">
      <p>Log In</p>
      <div className="field">
        <input
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password..."
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button-2" onClick={signIn}>
          New user
        </button>
      </div>

      <div className="form-login">
        Already have an account
        <button className="button-2" onClick={logIn}>
          Log In
        </button>
      </div>
    </div>
  );
}
