import axios from "axios";

import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const { createSlice } = require("@reduxjs/toolkit");

const customId = "custom-id-yes";
const customId1 = "custom-id-yess";
const customId2 = "custom-id-yesss";
export const initialState = {
  auth: !!localStorage.getItem("token"),
  loading: false,
  hasErrors: {
    value: false,
    message: "",
  },
  username: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LOGIN_START: (state) => {
      state.loading = true;
    },
    LOGIN_SUCCESS: (state, { payload }) => {
      state.loading = false;
      state.hasErrors = {
        value: "",
        message: "",
      };
      state.auth = true;
      state.username = payload;
    },
    LOGIN_FAILED: (state, { payload }) => {
      state.hasErrors = {
        value: true,
        message: payload,
      };
      state.auth = false;
      state.username = "";
      state.loading = false;
    },
    LOGOUT: (state, { payload }) => {
      state.auth = false;
      state.loading = false;
      state.hasErrors = {
        value: false,
        message: "",
      };
      state.username = "";
    },
    SET_AUTH: (state, { payload }) => {
      state.auth = payload;
    },
  },
});

export const { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT, SET_AUTH } =
  authSlice.actions;

export const authSelector = (state) => state.auth;

export default authSlice.reducer;

// export function fetchAuth(email, password) {
//   console.log(email, password);
//   return async (dispatch) => {
//     dispatch(LOGIN_START());

//     try {
//       alert("Enters");
//       // const res = await fetch("https://jsonplaceholder.typicode.com/posts");
//       const res = await axios.post(
//         "https://pharmawebb.herokuapp.com/api/auth/login",
//         {
//           email,
//           password,
//         }
//       );
//       const data = await res.json();
//       console.log(data);
//       localStorage.setItem("DATA", data);

//       dispatch(LOGIN_SUCCESS(data));
//     } catch (error) {
//       console.log(error);
//       dispatch(LOGIN_FAILED());
//     }
//   };
// }

export const login = (username, password) => async (dispatch) => {
  dispatch(LOGIN_START());
  try {
    const res = await axios.post(
      "https://sidhuapp.herokuapp.com/api/auth/login",
      {
        email: username,
        password,
      }
    );

    const status = await res.data.statusDescription.statusCode;

    console.log(res.data.statusDescription.statusMessage);

    if (status == 200) {
      await setTimeout(() => {
        toast.success("Logged In Successfully", {
          theme: "colored",
          toastId: customId2,
        });
      }, 100);
      localStorage.setItem("token", res.data.authtoken);
      localStorage.setItem("Username", username);

      // dispatch(loginSuccess());
      dispatch(LOGIN_SUCCESS(username));

      // dispatch(setAuth(res.data.token));
    } else {
      await toast.error(res.data.statusDescription.statusMessage, {
        theme: "colored",
        toastId: customId2,
      });
      dispatch(LOGIN_FAILED());
    }
  } catch (error) {
    console.log(error);
    await toast.error("Something Went Wrong", {
      theme: "colored",
      toastId: customId2,
    });
    dispatch(LOGIN_FAILED());
  }
};

export const logout = (username) => async (dispatch) => {
  try {
    const res = await axios.post(
      "http://192.168.146.187:8081/BMER/api/user/logout",
      {
        username,
      }
    );

    if (res.data.statusDescription.statusCode == 200) {
      localStorage.clear();
      dispatch(LOGOUT());
      // await (window.location.href = "/");
      setTimeout(() => {
        toast.success("Logged out ", {
          theme: "colored",
          toastId: customId1,
        });
      }, 200);
      console.log("Logout");
    } else {
      localStorage.clear();
      dispatch(LOGOUT());
      // await (window.location.href = "/");
      setTimeout(() => {
        toast.success("Logged out ", {
          theme: "colored",
          toastId: customId,
        });
      }, 200);
      console.log("Logout");
    }
  } catch (error) {
    localStorage.clear();
    dispatch(LOGOUT());
    await toast.error("Something Went Wrong", {
      theme: "colored",
    });
  }
};
