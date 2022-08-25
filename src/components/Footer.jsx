import React from "react";

export default function Footer() {
  return (
    <>
      {/* <!-- Footer --> */}
      <footer
        className="text-center text-lg-start bg-light text-muted"
        style={{
          position: "absolute",
          textAlign: "center",
          width: "100%",
          bottom: "0%",
        }}
      >
        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2021 Copyright:
          <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
            MDBootstrap.com
          </a>
        </div>
        {/* <!-- Copyright --> */}
      </footer>
      {/* <!-- Footer --> */}
    </>
  );
}
