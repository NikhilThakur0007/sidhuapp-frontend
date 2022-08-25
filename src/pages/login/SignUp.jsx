import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slice/authSlice";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import GoogleSign from "./GoogleSign";
import GoogleIcon from "@mui/icons-material/Google";
import LoginLoader from "../../components/Loader/LoginLoader";
import { Link, useNavigate } from "react-router-dom";

const theme = createTheme();

function SignUp(props) {
  const navigate = useNavigate();
  React.useEffect(() => {
    const auth = localStorage.getItem("token");
    if (auth) {
      navigate("/signup");
    }
  }, []);

  console.log(props.login, "prosp");
  console.log(props, "prosp");
  const dispatch = useDispatch();

  const handleSubmit = async (e, values) => {
    e.preventDefault();
    try {
      // setOpen(true);
      // console.log(values, e.target[0].value, e.target[2].value, e, "hello");

      dispatch(login(e.target[0].value, e.target[2].value));

      props.login(e.target[0].value, e.target[2].value);
    } catch (error) {
      // setOpen(true);
      console.log(error);

      await toast.error("Something Went Wrong", {
        theme: "colored",
      });
      // setOpen(false);
    }
  };
  return (
    <div className="container">
      <ThemeProvider theme={theme}>
        <ToastContainer autoClose={1000} />
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box sx={{ mt: 1 }}>
                <TextField
                  required
                  margin="normal"
                  fullWidth
                  type="email"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  required
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  min={6}
                  id="password"
                  autoComplete="current-password"
                />
                {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>

                {/* <h6 style={{ textAlign: "center" }}> Sign in with Google </h6> */}
              </Box>
            </Box>
          </form>
          <Link to="/register">
            <Button type="button" fullWidth variant="contained" sx={{ mb: 2 }}>
              Sign Up
            </Button>
          </Link>
          <GoogleSign />
          <LoginLoader visible={props.loading} />
          {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </Container>
      </ThemeProvider>
    </div>
  );
}
const mapStateToProps = (state) => ({
  loading: state.auth.loading,
});

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => dispatch(login(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
