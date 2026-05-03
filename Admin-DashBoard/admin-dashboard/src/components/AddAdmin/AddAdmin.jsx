import React, { useState } from "react";

export default function AddAdmin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);

  const [loading, setLoadin] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [imageError, setImageError] = useState(null);

  const [success, setSucess] = useState(false);
  const [generalError, setGeneralError] = useState("");

  async function createAccount(e) {
    e.preventDefault();

    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setPhoneError("");
    setImageError("");
    setGeneralError("");
    setSucess(false);

    setLoadin(true);

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);
      formData.append("phone", phone);

      if (image) {
        formData.append("image", image);
      }

      const res = await fetch(
        "https://e-commerce-backend-three-khaki.vercel.app/api/v1/auth/signup-admin",
        {
          method: "POST",
          headers: {
            autherization:
              "super-admin eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWVjZThkZWMzYmExMzUxNDczYzdmZTciLCJyb2xlIjoic3VwZXItYWRtaW4iLCJpYXQiOjE3Nzc4MDg4MjYsImV4cCI6MTgwOTM2NjQyNn0.S_d9mOMsraunIXKvzBCY7OFPYi3aj2XN7hgXAnElnX8",
          },
          body: formData,
        },
      );

      const data = await res.json();
      console.log("statuts", data);

      if (!res.ok || data.message === "Validation Error") {
        if (data.details) {
          data.details.forEach((err) => {
            const field = err.path[0];

            if (field === "name") setNameError(err.message);
            if (field === "email") setEmailError(err.message);
            if (field === "password") setPasswordError(err.message);
            if (field === "confirmPassword")
              setConfirmPasswordError(err.message);
            if (field === "phone") setPhoneError(err.message);
            if (field === "image") setImageError(err.message);
          });

          return;
        }
        const message = data.message || "Something went wrong";

        if (message === "email already exist") {
          setEmailError(message);
          return;
        }

        if (message === "passwords are not matched") {
          setConfirmPasswordError(message);
          return;
        }

        throw new Error(message);
      }

      setSucess(true);

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setPhone("");
      setImage(null);

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 3000);
    } catch (error) {
      setGeneralError(error.message || "somethong went wrong");
    } finally {
      setLoadin(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl shadow-lg sm:w-[600px] md:w-[50%] m space-y-5 text-white
      "
        onSubmit={createAccount}
      >
        {success && (
          <p className="text-green-500 text-xl ">
            Account Created Successfully
          </p>
        )}
        {generalError && (
          <p className="text-red-400 text-xl ">{generalError}</p>
        )}
        <h2 className="text-xl font-semibold text-center">Sign Up</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 gap-4">
          {/* Name */}
          <fieldset className="border border-white/20 px-2 py-1 rounded focus-within:border-blue-400 transition">
            <legend className="px-2 text-sm text-white/70">Name</legend>
            <input
              type="text"
              placeholder="Name"
              className="bg-transparent outline-none w-full p-2 placeholder:text-white/50"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && (
              <p className="text-red-400 text-sm mt-1">{nameError}</p>
            )}
          </fieldset>
          {/* Email */}
          <fieldset className="border border-white/20 px-2 py-1 rounded focus-within:border-blue-400 transition">
            <legend className="px-2 text-sm text-white/70">Email</legend>
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent outline-none w-full p-2 placeholder:text-white/50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && (
              <p className="text-red-400 text-sm mt-1">{emailError}</p>
            )}
          </fieldset>
          {/* Password */}
          <fieldset className="border border-white/20 px-2 py-1 rounded focus-within:border-blue-400 transition">
            <legend className="px-2 text-sm text-white/70">Password</legend>
            <input
              type="password"
              placeholder="password"
              className="bg-transparent outline-none w-full p-2 placeholder:text-white/50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <p className="text-red-400 text-sm mt-1">{passwordError}</p>
            )}
          </fieldset>
          {/* Confirm Password */}
          <fieldset className="border border-white/20 px-2 py-1 rounded focus-within:border-blue-400 transition">
            <legend className="px-2 text-sm text-white/70">
              Confirm Password
            </legend>
            <input
              type="password"
              placeholder="Confirm Password"
              className="bg-transparent outline-none w-full p-2 placeholder:text-white/50"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {confirmPasswordError && (
              <p className="text-red-400 text-sm mt-1">
                {confirmPasswordError}
              </p>
            )}
          </fieldset>
          {/* Phone */}
          <fieldset className="border border-white/20 px-2 py-1 rounded focus-within:border-blue-400 transition">
            <legend className="px-2 text-sm text-white/70">Phone</legend>
            <input
              type="tel"
              placeholder="Phone"
              className="bg-transparent outline-none w-full p-2 placeholder:text-white/50"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {phoneError && (
              <p className="text-red-400 text-sm mt-1">{phoneError}</p>
            )}
          </fieldset>
          {/* Photo */}
          <fieldset className="border border-white/20 px-2 py-1 rounded focus-within:border-blue-400 transition">
            <legend className="px-2 text-sm text-white/70">image</legend>
            <input
              type="file"
              className="bg-transparent outline-none w-full p-2 placeholder:text-white/50"
              onChange={(e) => setImage(e.target.files[0])}
            />
            {imageError && (
              <p className="text-red-400 text-sm mt-1">{imageError}</p>
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
          {loading ? <p>loading</p> : <p>Create Account</p>}
        </button>
      </form>
    </div>
  );
}
