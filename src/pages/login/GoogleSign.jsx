import React, { useState } from "react";

import { GoogleLogin, GoogleLogout } from "react-google-login";

export default function GoogleSign() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);

  const responseGoogle = (response) => {
    console.log(response);
    // setName(response.profileObj.name);
    // setEmail(response.profileObj.email);
    // setUrl(response.profileObj.imageUrl);
    // setLoginStatus(true);?
  };
  const logout = () => {
    console.log("logout");
    setLoginStatus(false);
  };

  const clientId =
    "687062889490-cu67l3r6l8odvjca7q8snsovo1unbesq.apps.googleusercontent.com";
  return (
    <div className="App">
      {!loginStatus && (
        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      )}
      {loginStatus && (
        <div>
          <br />
          <GoogleLogout
            clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={logout}
          />
        </div>
      )}
    </div>
  );
}
