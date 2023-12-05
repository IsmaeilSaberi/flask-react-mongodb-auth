import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register({ setDisplayName }) {
  const [username, setUsername] = useState("");
  const [displayname1, setDisplayname1] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegistration = async () => {
    try {
      const response = await axios.post("http://localhost:5000/register", {
        username,
        displayname: displayname1,
        password,
      });
      setDisplayName(displayname1);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-emerald-200 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-vazir">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 font-vazir">
          ایجاد حساب کاربری
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md space-y-6">
        {/* نام کاربری */}
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            نام کاربری
          </label>
          <div className="mt-1">
            <input
              id="username"
              name="username"
              type="text"
              placeholder="نام کاربری"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        {/* نام نمایشی */}
        <div>
          <label
            htmlFor="displayName"
            className="block text-sm font-medium text-gray-700"
          >
            نام نمایشی
          </label>
          <div className="mt-1">
            <input
              id="displayName"
              name="displayName"
              type="text"
              placeholder="نام نمایشی"
              value={displayname1}
              onChange={(e) => setDisplayname1(e.target.value)}
              required
              className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        {/* رمز عبور */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            رمز عبور
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="رمز عبور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full pr-10 p-2 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
            />
            <button
              type="button"
              className="absolute inset-y-0 left-0 pl-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg
                  className="h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18c-4.39 0-8-3.61-8-8s3.61-8 8-8 8 3.61 8 8-3.61 8-8 8zm1-9a1 1 0 0 0-2 0v1a1 1 0 1 0 2 0V9zm0 5a1 1 0 1 0-2 0v1a1 1 0 1 0 2 0v-1z"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2C5.93 2 2 6.03 2 11s3.93 9 8 9 8-4.03 8-9-3.93-9-8-9zm0 16a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-2a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-7a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* دکمه ارسال */}
        <div>
          <button
            onClick={handleRegistration}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            ارسال
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
