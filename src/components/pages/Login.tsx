import { useState } from "react";
import { useNavigate } from "react-router";
import { users } from "../../Data/dummy";

import type { User } from "../../Types/types";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user: User | undefined = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (user) {
      localStorage.setItem("taskflow_user", JSON.stringify(user));
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-stone200 via-stone-300 to-slate-400">
      <div className="max-w-md  bg-white p-5 border border-slate-400 shadow-2xl rounded-lg ">
        <div className="text-slate-600 text-2xl font-bold p-3 ">
          <h2>Sing in Your Account</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-3 space-y-3">
          <div>
            <label className="block text-xl text-slate-500 py-2 font-semibold">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder=" Email"
            className="text-sm border-b border-slate-400 placeholder:text-slate-400 w-full outline-none focus:ring focus:ring-blue-300 focus:rounded-lg  py-2 px-2"
          />
          </div>

         <div>
           <label className="block text-xl text-slate-500 py-2 font-semibold">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="pass"
            placeholder=" Password"
            className="text-sm border-b border-slate-400 placeholder:text-slate-400 w-full outline-none focus:ring focus:ring-blue-300 focus:rounded-lg py-2 px-2"
          />
         </div>
          {error && (
            <p
              className="text-red-4
          00 text-sm mt-2"
            >
              {error}
            </p>
          )}
          <button
            onSubmit={handleSubmit}
            type="submit"
            className="text-center w-full border rounded-full bg-green-400 text-white px-2 py-3"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
