import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ setDisplayName }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:5000/logout");
      setDisplayName("لطفا وارد حساب کاربری تان شوید!");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <button
      onClick={handleLogout}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
    >
      خروج از حساب
    </button>
  );
};

export default LogoutButton;
