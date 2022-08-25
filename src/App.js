import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./pages/login";
import Secure from "./pages/secure";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import SignUp from "./pages/login/SignUp.jsx";

function App(props) {
  const Routes = props.auth ? Secure : Login;
  const { history } = props;

  return <Routes />;
}
const mapStateToProps = (state) => (
  console.log(state),
  {
    auth: state.auth.auth,
  }
);

export default connect(mapStateToProps)(App);
