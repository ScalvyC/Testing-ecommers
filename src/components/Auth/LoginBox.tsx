import { useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../services/dummyJsonApi";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type FormFields = z.infer<typeof schema>;

type LocationState = {
  from?: string;
};

export const LoginBox = () => {
  const [login, { isLoading }] = useLoginMutation();

  const location = useLocation();
  const navigate = useNavigate();

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

      navigate(from, { replace: true });
    } catch {
      setError("root", {
        message: "Invalid username or password",
      });
    }
  };

  return (
    <div>
      <div className="w-full max-w-[380px] rounded-xl bg-white p-[35px] shadow-lg">
        <h1 className="m-0 text-center text-[30px] font-bold text-[#1f2937]">
          Welcome Back
        </h1>

        <p className="mb-[30px] text-center text-[#6b7280]">
          Login to continue
        </p>

        {errors.root && (
          <div className="mb-5 rounded-xl border border-red-500 bg-red-50 p-3 text-center text-sm text-red-600">
            {errors.root.message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-[18px] flex flex-col">
            <label
              className="mb-[7px] text-sm font-semibold text-[#374151]"
              htmlFor="username"
            >
              Username
            </label>

            <input
              {...register("username")}
              type="text"
              id="username"
              placeholder="Enter your username"
              className={`rounded-[10px] border px-[14px] py-3 text-[15px] outline-none transition focus:ring-2 focus:ring-yellow-400 ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
            />

            {errors.username && (
              <p className="mt-1 text-sm text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="mb-[18px] flex flex-col">
            <label
              className="mb-[7px] text-sm font-semibold text-[#374151]"
              htmlFor="password"
            >
              Password
            </label>

            <input
              {...register("password")}
              type="password"
              id="password"
              placeholder="Enter your password"
              className={`rounded-[10px] border px-[14px] py-3 text-[15px] outline-none transition focus:ring-2 focus:ring-yellow-400 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-[22px] flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                id="remember-me"
                className="h-4 w-4 accent-yellow-500"
              />
              Remember Me
            </label>

            <button
              type="button"
              className="cursor-pointer text-yellow-500 transition hover:text-black"
            >
              Forgot Password?
            </button>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full rounded-[10px] bg-yellow-500 p-[13px] text-base font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-300"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>

        <hr className="mt-7 border-gray-200" />
      </div>
    </div>
  );
};
