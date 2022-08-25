import React from "react";
import { Route, Routes } from "react-router-dom";
// import Page404 from "./Page404";
import SignUp from "./SignUp";
// import Forgot from "./Forgot";
import Loader from "../../components/Loader/Loader";
import LoginUp from "../login/Register.jsx";

export default function Index() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/Signin" element={<LoginUp />} />
        {/* <Route path="*" element={<Page404 />} /> */}
        {/* <Route path="/forget/password" element={<Forgot />} /> */}
        {/* <Route path="/sign" element={<SignUp />} /> */}
        <Route path="/signnn" element={<Loader />} />
      </Routes>
    </>
  );
}
