import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { Cookies } from "react-cookie";

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
    <div>
      <p>Log In</p>
      <div className="field input">
        <input
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password..."
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="button" onClick={signIn}>
        New user
      </button>
      <div className="form-link">
        Already have an account
        <button className="button" onClick={logIn}>
          Log In
        </button>
      </div>
    </div>
  );
}
