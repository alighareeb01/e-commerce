import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(3, "password must be at least 3 char"),
});

export default function Login() {
  const [loading, setLoadin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loginToken = useAuthStore((state) => state.loginToken);
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  async function loginForm(formData) {
    setLoadin(true);
    setErrorMessage("");

    try {
      const res = await fetch(
        "https://e-commerce-backend-three-khaki.vercel.app/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.message || "Login failed");
        return;
      }
      console.log(data);

      loginToken({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });

      nav("/dashboard");
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message || "Something went wrong");
    } finally {
      setLoadin(false);
    }
  }
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <form
          className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl shadow-lg sm:w-[600px] md:w-[50%] m space-y-5 text-white
      "
          onSubmit={handleSubmit(loginForm)}
        >
          <h2 className="text-xl font-semibold text-center">Login</h2>
          {errorMessage && (
            <p className="text-red-400 text-xl">{errorMessage}</p>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-1 gap-4">
            {/* Email */}
            <fieldset className="border border-white/20 px-2 py-1 rounded focus-within:border-blue-400 transition">
              <legend className="px-2 text-sm text-white/70">Email</legend>
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent outline-none w-full p-2 placeholder:text-white/50"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-400 text-xl ">{errors.email.message}</p>
              )}
            </fieldset>
            {/* Password */}
            <fieldset className="border border-white/20 px-2 py-1 rounded focus-within:border-blue-400 transition">
              <legend className="px-2 text-sm text-white/70">Password</legend>
              <input
                type="password"
                placeholder="password"
                className="bg-transparent outline-none w-full p-2 placeholder:text-white/50"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-400 text-xl ">
                  {errors.password.message}
                </p>
              )}
            </fieldset>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white/10 hover:bg-violet-600 transition py-2 rounded-lg 
          disabled:opacity-50
          disabled:cursor-not-allowed
          disabled:hover:bg-white/10
          "
          >
            {loading ? <p>loading</p> : <p>Login </p>}
          </button>
        </form>
      </div>
    </>
  );
}
