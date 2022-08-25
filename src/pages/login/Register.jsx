import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Loginup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");

  console.log(name, email, password, city, state, address);

  const getUser = async (e) => {
    try {
      e.preventDefault();

      const res = await axios.post(
        "https://sidhuapp.herokuapp.com/api/auth/signup",
        {
          name,
          email,
          password,
          city,
          state,
          address,
        }
      );

      const status = await res.data.statusDescription.statusCode;
      const statusMessage = await res.data.statusDescription.statusMessage;

      if (status == 200) {
        await setTimeout(() => {
          toast.success(statusMessage, {
            theme: "colored",
          });
          navigate("/");
        }, 100);
      } else {
        await setTimeout(() => {
          toast.error(statusMessage);
        }, 100);
      }

      // console.log("herocops", await res.data);
    } catch (error) {
      console.log(await error);
    }
  };

  //   getUser();

  return (
    <>
      <section class="vh-100">
        <div class="container h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-lg-12 col-xl-11">
              <div class="card text-black">
                {/* <div class="card-body p-md-5"> */}
                <div class="row justify-content-center">
                  <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>

                    <form onSubmit={getUser} class="mx-1 mx-md-4">
                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input
                            required
                            type="text"
                            id="form3Example1c"
                            class="form-control"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>

                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input
                            required
                            type="email"
                            id="form3Example3c"
                            class="form-control"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input
                            required
                            type="password"
                            id="form3Example4c"
                            class="form-control"
                            placeholder="Your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>

                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input
                            required
                            type="city"
                            id="form3Example4cd"
                            class="form-control"
                            placeholder="Your City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                          />
                        </div>
                      </div>
                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input
                            required
                            type="state"
                            id="form3Example4cd"
                            class="form-control"
                            placeholder="Your State"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                          />
                        </div>
                      </div>
                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input
                            required
                            type="address"
                            id="form3Example4cd"
                            class="form-control"
                            placeholder="Your Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                      </div>

                      <div class="form-check d-flex justify-content-center mb-5">
                        <input
                          class="form-check-input me-2"
                          type="checkbox"
                          value=""
                          id="form2Example3c"
                        />
                        <label class="form-check-label" for="form2Example3">
                          I agree all statements in{" "}
                          <a href="#!">Terms of service</a>
                        </label>
                      </div>

                      <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          // onClick={getUser}
                          type="submit"
                          class="btn btn-primary btn-lg"
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                  <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      class="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
