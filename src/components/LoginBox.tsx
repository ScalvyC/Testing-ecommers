import { useLocation } from "react-router-dom";
import { useLoginMutation } from "../services/dummyJsonApi";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./LoginBox.css";

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type FormFields = z.infer<typeof schema>;

type LocationState = {
  from?: string;
};

export function LoginBox() {
  const [login, { isLoading }] = useLoginMutation();

  const location = useLocation();
  const state = location.state as LocationState | null;
  const from = state?.from || "/";

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
  try {
    const result = await login({
      username: data.username,
      password: data.password,
      expiresInMins: 30,
    }).unwrap();

    localStorage.setItem("accessToken", result.accessToken);
    localStorage.setItem("refreshToken", result.refreshToken);
    localStorage.setItem("userId", String(result.id));

    window.location.replace(from);
  } catch {
    setError("root", {
      message: "Invalid username or password",
    });
  }
};

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>Welcome Back</h1>
        <p className="login-subtitle">Login to continue</p>

        {errors.root && (
          <div className="message">
            <p className="login-message">{errors.root.message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              {...register("username")}
              type="text"
              id="username"
              placeholder="Enter your username"
            />

            {errors.username && (
              <div className="error-message">{errors.username.message}</div>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              {...register("password")}
              type="password"
              id="password"
              placeholder="Enter your password"
            />

            {errors.password && (
              <div className="error-message">{errors.password.message}</div>
            )}
          </div>

          <div className="login-options">
            <div className="remember-me">
              <input type="checkbox" id="remember-me" name="rememberMe" />
              <label htmlFor="remember-me">Remember Me</label>
            </div>

            <p className="forgot-password">Forgot Password?</p>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className={
              isLoading ? "login-button-disabled" : "login-button-enabled"
            }
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>

        <hr />
      </div>
    </div>
  );
}
