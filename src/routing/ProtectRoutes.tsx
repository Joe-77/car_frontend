import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Context } from "../context/Context";

const ProtectRoutes = () => {
  const { isLogin, setShowLoginPage }: any = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      setShowLoginPage(true);
      navigate("/home");
    }
  }, [isLogin, navigate, setShowLoginPage]);

  return isLogin ? <Outlet /> : null;
};

export default ProtectRoutes;
