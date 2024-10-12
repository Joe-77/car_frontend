import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import { CiMenuFries } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import Login from "../login/Login";
import Reset from "../reset/Reset";

export default function Nav() {
  const { pathname } = useLocation();
  const {
    isLogin,
    handleLogout,
    showLoginPage,
    setShowLoginPage,
    type,
    setType,
    role,
  }: any = useContext(Context);

  const [show, setShow] = useState<boolean>(false);
  const route = useNavigate();

  useEffect(() => {
    if (showLoginPage || isLogin) {
      setShow(true);
    } else {
      setShow(false);
    }

    if (showLoginPage === false) {
      setShow(false);
    }
  }, [showLoginPage, isLogin]);

  useEffect(() => {
    role === "admin" && route("/dashboard");
  }, [role]);

  return (
    <nav>
      <header className="shadow-md bg-white">
        <div className="container mx-auto px-4 md:px-0 lg:w-[85%] flex items-center justify-between py-3">
          <div className="logo">
            <Link to="/" className="flex items-center gap-4">
              <img loading="lazy" src="/logo.png" alt="logo" className="w-20" />
              <p className="font-semibold">
                AutoPrice <br /> Estimator
              </p>
            </Link>
          </div>
          <ul className="custom-links  items-center gap-4 hidden sm:flex">
            {isLogin && role === "admin" ? (
              <li
                className={`${
                  pathname === "/dashboard" && "text-green-600 font-bold"
                }`}
              >
                <Link to="/dashboard">Dashboard</Link>
              </li>
            ) : (
              <>
                <li
                  className={`${
                    pathname === "/home" && "text-green-600 font-bold"
                  }`}
                >
                  <Link to="/home">Home</Link>
                </li>
                <li
                  className={`${
                    pathname === "/prediction" && "text-green-600 font-bold"
                  }`}
                >
                  <Link to="/prediction">Prediction</Link>
                </li>
              </>
            )}

            {isLogin ? (
              <button onClick={() => handleLogout()}>logout</button>
            ) : (
              <li
                onClick={() => {
                  setShowLoginPage(true);
                  setType("login");
                }}
                className="cursor-pointer"
              >
                Login
              </li>
            )}
          </ul>
          {/* Show Menu */}
          <div className="sm:hidden">
            <span
              onClick={() => setShow(true)}
              className="text-2xl font-bold cursor-pointer"
            >
              <CiMenuFries />
            </span>
            <div
              className={`fixed top-0 ${
                show ? "right-0" : "right-[-6000px]"
              } bg-white max-w-[300px] w-full h-screen duration-500 p-5 z-50`}
            >
              <span className="text-3xl" onClick={() => setShow(false)}>
                <IoClose />
              </span>

              <ul className="custom-links gap-4 flex flex-col mt-8">
                <li
                  className={`${
                    pathname === "/home" && "text-green-600 font-bold"
                  }`}
                >
                  <Link to="/home">Home</Link>
                </li>
                <li
                  onClick={() => setShow(false)}
                  className={`${
                    pathname === "/prediction" && "text-green-600 font-bold"
                  }`}
                >
                  <Link to="/prediction">Prediction</Link>
                </li>
                {isLogin ? (
                  <button onClick={() => handleLogout()}>logout</button>
                ) : (
                  <li
                    onClick={() => {
                      setShowLoginPage(true);
                      setType("login");
                    }}
                    className="cursor-pointer"
                  >
                    Login
                  </li>
                )}
              </ul>
            </div>
          </div>
          {show && (
            <div
              onClick={() => {
                setShow(false);
                setShowLoginPage(false);
              }}
              className="overlay fixed top-0 left-0 w-full h-screen bg-black/50 z-20"
            ></div>
          )}

          <div
            className={`fixed z-50 top-0  max-w-[300px] w-full h-screen bg-white py-5 duration-500 ${
              showLoginPage ? "right-0" : "right-[-600px]"
            }`}
          >
            <div className="flex justify-end px-4">
              <button
                onClick={() => setShowLoginPage(false)}
                className="text-xl font-bold"
              >
                <IoClose />
              </button>
            </div>

            {type === "login" && <Login setShowLoginPage={setShowLoginPage} />}
            {type === "reset" && <Reset setShowLoginPage={setShowLoginPage} />}
          </div>
        </div>
      </header>
    </nav>
  );
}
