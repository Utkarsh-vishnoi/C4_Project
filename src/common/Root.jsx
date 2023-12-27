import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Root = ({ token, setToken }) => {
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState();

  useEffect(() => {
    // if there is a message from location, call Alert
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
        token={token}
        setToken={setToken}
        userRole={"ADMIN"}
        setSearchQuery={setSearchQuery}
      />
      <Outlet context={{ token, searchQuery }} />
      <ToastContainer autoClose={2000} theme="colored" />
    </>
  );
};

export default Root;
