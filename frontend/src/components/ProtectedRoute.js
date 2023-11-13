import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HashLoader } from "react-spinners";

import { CheckUserLogin } from "../api/auth";

const ProtectedRoute = ({ Component, LoginCom }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selector = useSelector((state) => state.userLoginStates);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      await CheckUserLogin(dispatch);
      setIsLoading(false);
    };
    checkAuthentication();
  }, [isLoading, dispatch]);

  useEffect(() => {
    if (!isLoading && !selector) {
      navigate("/login/signUp");
    } else if (LoginCom && !isLoading) {
      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    }
  }, [selector, isLoading, LoginCom]);

  // if (isLoading) {
  //   return (
  //     <div id="Loader">
  //       <HashLoader color="#61ce70" />
  //     </div>
  //   );
  // }

  return <Component />;
};

export default ProtectedRoute;
