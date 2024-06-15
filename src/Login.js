import React, { useState } from "react";
import { auth } from "./firebase"; // Import from firebase.js
import "firebase/auth";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // New state to toggle between login and sign-up
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // User is logged in, handle successful login
      console.log("User logged in:", userCredential.user);
      onLoginSuccess(); // Call the callback function to update state in App.js
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setError("Invalid password.");
      } else if (error.code === "auth/user-not-found") {
        setError("User not found. Please create an account.");
      } else {
        setError(error.message); // Default error message
      }
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed up:", userCredential.user);
      onLoginSuccess(); // Call the callback function to update state in App.js
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("Email already in use. Please use a different email.");
      } else {
        setError(error.message); // Default error message
      }
    }
  };

  return (
    <div>
      <h1>{isSignUp ? "Sign Up" : "Login"}</h1>
      <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              console.log("Email:", e.target.value); // Optional log
            }}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              console.log("Password:", e.target.value); // Optional log
            }}
          />
        </label>
        <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp
          ? "Already have an account? Login"
          : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
}

export default Login;
