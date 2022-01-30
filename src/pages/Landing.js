import React from "react";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../features/auth/authSlice";

const Landing = () => {
  const auth = useSelector(selectIsAuth);

  return auth ? <div className="landingAuth">WELCOME</div> : <div>LANDING</div>;
};

export default Landing;
