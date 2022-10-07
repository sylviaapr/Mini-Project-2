import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_KEY } from "./Constants";
import "./Style.css";

function NavBar() {
  const [username, setUsername] = useState();

  useEffect(() => {
    if (localStorage.getItem("sessionID")) {
      const getAccount = async () => {
        try {
          let response = await axios.get(
            `https://api.themoviedb.org/3/account?api_key=${API_KEY}&session_id=${localStorage.getItem(
              "sessionID"
            )}`
          );
          setUsername(response.data.username);
        } catch (error) {
          console.error(error);
        }
      };
      getAccount();
    }
  }, []);

  const renderLoginLogout = () => {
    if (localStorage.getItem("sessionID")) {
      const handleLogout = async () => {
        try {
          await axios({
            method: "delete",
            url: `https://api.themoviedb.org/3/authentication/session?api_key=${API_KEY}`,
            data: {
              session_id: localStorage.getItem("sessionID"),
            },
          });
        } catch (error) {
          console.log(error);
        }
        localStorage.removeItem("sessionID");
        window.location.href = "/";
      };
      return (
        <>
          <li className="nav-item">
            <a className="nav-link" href="/watchlist">
              Watch List
            </a>
          </li>
          <li className="nav-item">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="nav-link" href="#" onClick={handleLogout}>
              Logout
            </a>
          </li>
        </>
      );
    }
    return (
      <li className="nav-item">
        <a className="nav-link" href="/login">
          Login
        </a>
      </li>
    );
  };

  const renderUserName = () => {
    return (
      <>
        <span className="navbar-text">{username}</span>
      </>
    );
  };

  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark background-color">
      <div className="container-md">
        <a className="navbar-brand" href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-snow2"
            viewBox="0 0 16 16"
          >
            <path d="M8 16a.5.5 0 0 1-.5-.5v-1.293l-.646.647a.5.5 0 0 1-.707-.708L7.5 12.793v-1.086l-.646.647a.5.5 0 0 1-.707-.708L7.5 10.293V8.866l-1.236.713-.495 1.85a.5.5 0 1 1-.966-.26l.237-.882-.94.542-.496 1.85a.5.5 0 1 1-.966-.26l.237-.882-1.12.646a.5.5 0 0 1-.5-.866l1.12-.646-.884-.237a.5.5 0 1 1 .26-.966l1.848.495.94-.542-.882-.237a.5.5 0 1 1 .258-.966l1.85.495L7 8l-1.236-.713-1.849.495a.5.5 0 1 1-.258-.966l.883-.237-.94-.542-1.85.495a.5.5 0 0 1-.258-.966l.883-.237-1.12-.646a.5.5 0 1 1 .5-.866l1.12.646-.237-.883a.5.5 0 0 1 .966-.258l.495 1.849.94.542-.236-.883a.5.5 0 0 1 .966-.258l.495 1.849 1.236.713V5.707L6.147 4.354a.5.5 0 1 1 .707-.708l.646.647V3.207L6.147 1.854a.5.5 0 1 1 .707-.708l.646.647V.5a.5.5 0 0 1 1 0v1.293l.647-.647a.5.5 0 1 1 .707.708L8.5 3.207v1.086l.647-.647a.5.5 0 1 1 .707.708L8.5 5.707v1.427l1.236-.713.495-1.85a.5.5 0 1 1 .966.26l-.236.882.94-.542.495-1.85a.5.5 0 1 1 .966.26l-.236.882 1.12-.646a.5.5 0 0 1 .5.866l-1.12.646.883.237a.5.5 0 1 1-.26.966l-1.848-.495-.94.542.883.237a.5.5 0 1 1-.26.966l-1.848-.495L9 8l1.236.713 1.849-.495a.5.5 0 0 1 .259.966l-.883.237.94.542 1.849-.495a.5.5 0 0 1 .259.966l-.883.237 1.12.646a.5.5 0 0 1-.5.866l-1.12-.646.236.883a.5.5 0 1 1-.966.258l-.495-1.849-.94-.542.236.883a.5.5 0 0 1-.966.258L9.736 9.58 8.5 8.866v1.427l1.354 1.353a.5.5 0 0 1-.707.708l-.647-.647v1.086l1.354 1.353a.5.5 0 0 1-.707.708l-.647-.647V15.5a.5.5 0 0 1-.5.5z" />
          </svg>
          Movieflakes
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            {renderLoginLogout()}
          </ul>
          {renderUserName()}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
