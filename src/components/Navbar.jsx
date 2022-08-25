import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slice/authSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import { connect, useDispatch, useSelector } from "react-redux";
import Logout from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginLoader from "../components/Loader/LoginLoader";
import { ToastContainer } from "react-toastify";

function Navbar(props) {
  const navigate = useNavigate();
  const handleClick = async (e) => {
    await props.logout();

    navigate("/", { replace: true });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <ToastContainer autoClose={1000} />
          <Link to="/" className="navbar-brand">
            <HomeIcon />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/products"
                  className="nav-link active"
                  aria-current="page"
                >
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/addproducts"
                  className="nav-link active"
                  aria-current="page"
                >
                  Add Product
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link to="/updateproducts" className="nav-link active">
                  Update Product
                </Link>
              </li> */}
            </ul>

            <div className="mx-1">
              {/* <Link to="/signup">
                <button className="btn btn-outline-success" type="submit">
                  Sign Up
                </button>
              </Link> */}
            </div>
            <div className="mx-1">
              <Link to="/logout">
                <LoginLoader visible={props.loading} />
                <LogoutIcon onClick={handleClick} />
              </Link>
              <Link to="/updateProfile" className="mx-1">
                <AccountCircleIcon />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

const mapStateToProps = (state) => (
  console.log(state, "state"),
  {
    username: state.auth.username,
  }
);

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout(localStorage.getItem("Username"))),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
