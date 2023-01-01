import React, { useContext } from "react";
import { FaFacebookMessenger, FaBell, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import logo from "../../images/logo.png";

const Navbar = () => {
  const { userData, user, editEmail } = useContext(AuthContext);

  return (
    <div>
      <div className="navbar bg-green-600 z-20 fixed">
        <div className="navbar-start">
          <Link to="/">
            <img src={logo} alt="" className="w-28 h-auto" />
          </Link>
        </div>
        <div className="navbar-center">
          <div className="form-control">
            <label className="input-group">
              <span className="bg-none">
                <FaSearch />
              </span>
              <input
                type="text"
                placeholder="info@site.com"
                className="input input-success"
              />
            </label>
          </div>
        </div>
        <div className="navbar-end">
          <div className="hidden md:flex">
            <button className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-2xl text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <FaFacebookMessenger />
                </svg>
                <span className="badge badge-xs badge-primary indicator-item"></span>
              </div>
            </button>
            <button className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-2xl text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <FaBell />
                </svg>
                <span className="badge badge-xs badge-primary indicator-item"></span>
              </div>
            </button>
            <div className="dropdown  hidden md:flex">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <img
                  src={userData?.img}
                  alt=""
                  className="rounded-full w-10 h-10"
                />
              </label>
              <ul
                tabIndex={0}
                className="menu -right-2 top-11 menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/editProfile">Edit Profile</Link>
                </li>
                <li>
                  <Link>Edit Password</Link>
                </li>
                <li>
                  <button onClick={editEmail}>Edit Password</button>
                </li>
              </ul>
            </div>
          </div>
          <div className="dropdown flex md:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu right-0 menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link>Homepage</Link>
              </li>
              <li>
                <Link>Portfolio</Link>
              </li>
              <li>
                <Link>About</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
