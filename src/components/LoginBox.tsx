import { useState } from "react";
import "./LoginBox.css";

export function LoginBox() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
        expiresInMins: 30,
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then(console.log);
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>Welcome Back</h1>
        <p className="login-subtitle">Login to continue</p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="login-options">
            <div className="remember-me">
              <input
                type="checkbox"
                id="remember-me"
                name="rememberMe"
              />
              <label htmlFor="remember-me">Remember Me</label>
            </div>

            <p className="forgot-password">Forgot Password?</p>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <hr />

      </div>
    </div>
  );
}