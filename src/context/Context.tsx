import { createContext, useState } from "react";

export const Context: any = createContext(null);

export const AuthContextProvider = ({ children }: any) => {
  const [isLogin, setIsLogin] = useState<boolean>(() => {
    const storedValue = localStorage.getItem("car_website_login");
    return storedValue ? JSON.parse(storedValue) === true : false;
  });

  const [role, setRole] = useState<string>(() => {
    const storedValue = localStorage.getItem("role");
    return storedValue || "user";
  });

  const [showLoginPage, setShowLoginPage] = useState<boolean>(false);
  const [type, setType] = useState<string>("login");

  const handleAuthSuccess = () => {
    localStorage.setItem("car_website_login", "true");
    setIsLogin(true);
    setShowLoginPage(false);
  };

  const handleLogout = () => {
    localStorage.setItem("car_website_login", "false");
    setIsLogin(false);
  };

  return (
    <Context.Provider
      value={{
        isLogin,
        setIsLogin,
        handleLogout,
        showLoginPage,
        setShowLoginPage,
        type,
        setType,
        handleAuthSuccess,
        role,
        setRole,
      }}
    >
      {children}
    </Context.Provider>
  );
};
