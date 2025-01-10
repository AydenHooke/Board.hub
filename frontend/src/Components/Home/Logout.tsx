import { useContext, useEffect } from "react";
import { AccountContext } from "../../Context/AccountContext";
import { useNavigate } from "react-router-dom";

export function authorizationHander(error: any) {
  if (error.status == 401) {
    //navigate('/logout');
    window.location.href = "/logout";
  }
}

export default function Logout() {

  const accountContext = useContext(AccountContext);
  const navigate = useNavigate();

  useEffect(() => {
    accountContext?.setId("");
    accountContext?.setEmail("");
    accountContext?.setUsername("");
    accountContext?.setJwt("");
    accountContext?.setBggUsername("");

    navigate("/SignIn");
  }, []);

  return (
    <>
    </>
  );
}