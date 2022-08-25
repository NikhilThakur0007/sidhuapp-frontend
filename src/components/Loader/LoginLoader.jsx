import React from "react";
import { Backdrop } from "@mui/material";

import "./Loader.css";
import Loader from "./Loader";

export default function Loginloader(props) {
  return (
    <>
      <Backdrop
        sx={{
          transform: "translateZ(0)",
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={props.visible}
        // onClick={handleClose}
      >
        <h3></h3>

        {/* <div class="loader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div> */}
        <Loader />
      </Backdrop>
    </>
  );
}
