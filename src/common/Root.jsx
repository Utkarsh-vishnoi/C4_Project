import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Copyright from "./Copyright";

const Root = ({ userInfo, setUserInfo }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();

  // Check if message is found and raise a toast
  useEffect(() => {
    if (location.state !== null) {
      let message = location.state.message;
      toast.success(message, { toastId: "success" });
    }

    return () => {
      window.history.replaceState({}, document.title);
    };
  }, [location.state]);

  return (
    <>
      <Navbar
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        setSearchQuery={setSearchQuery}
      />
      <Outlet context={{ userInfo, searchQuery }} />
      <Copyright sx={{ mt: 8, mb: 4 }} />
      <ToastContainer autoClose={2000} theme="colored" />
    </>
  );
};

export default Root;
