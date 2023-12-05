import React, { useState } from "react";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";
import ProfileComponent from "./ProfileComponent";

const Header = ({ setDisplayName, displayName }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-500 p-4">
      <nav className="flex justify-between items-center container mx-auto">
        <div className="text-white text-3xl font-bold">بیمار آنلاین</div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <LogoutButton
              setDisplayName={setDisplayName}
              displayName={displayName}
            />
          </div>
          <ProfileComponent
            setDisplayName={setDisplayName}
            displayName={displayName}
          />
        </div>

        <button
          className="lg:hidden text-white text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <span>&times;</span>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>

        <div className="hidden lg:flex items-center gap-3 space-x-6">
          <Link to="/" className="text-white hover:text-emerald-500 text-lg">
            خانه
          </Link>
          <Link
            to="/login"
            className="text-white hover:text-emerald-500 text-lg"
          >
            ورود
          </Link>
          <Link
            to="/register"
            className="text-white hover:text-emerald-500 text-lg"
          >
            ثبت نام
          </Link>
          <Link to="#" className="text-white hover:text-emerald-500 text-lg">
            پشتیبانی
          </Link>
          <Link to="#" className="text-white hover:text-emerald-500 text-lg">
            خدمات
          </Link>
        </div>

        {menuOpen && (
          <div className="lg:hidden flex flex-col mt-4">
            <Link to="/" className="text-white hover:text-emerald-500 text-lg">
              خانه
            </Link>
            <Link
              to="/login"
              className="text-white hover:text-emerald-500 text-lg"
            >
              ورود
            </Link>
            <Link
              to="/register"
              className="text-white hover:text-emerald-500 text-lg"
            >
              ثبت نام
            </Link>
            <Link to="#" className="text-white hover:text-emerald-500 text-lg">
              پشتیبانی
            </Link>
            <Link to="#" className="text-white hover:text-emerald-500 text-lg">
              خدمات
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
