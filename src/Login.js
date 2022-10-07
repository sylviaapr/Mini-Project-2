import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";
import { API_KEY } from "./Constants";

async function generateRequestToken() {
  try {
    const response = await axios({
      method: "get",
      url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`,
    });
    console.log(response);
    return response.data.request_token;
  } catch (error) {
    console.error(error);
    return null;
  }
}
const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      generateRequestToken().then((requestToken) => {
        axios({
          method: "post",
          url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${API_KEY}`,
          data: {
            request_token: requestToken,
            username: values.username,
            password: values.password,
          },
        })
          .then((res) => {
            const verifiedRequestToken = res.data.request_token;
            axios({
              method: "post",
              url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}`,
              data: {
                request_token: verifiedRequestToken,
              },
            })
              .then((resp) => {
                const sessionID = resp.data.session_id;
                localStorage.setItem("sessionID", sessionID);
                alert("Login Success!");
                window.location.href = "/";
              })
              .catch((error) => {
                console.error(error);
              });
          })
          .catch((error) => {
            console.error(error);
          });
      });
    },
  });
  useEffect(() => {
    console.log(localStorage.getItem("sessionID"));
  }, []);
  return (
    <>
      <div className="container-md my-3 text-white">
        <div className="text-center">
          <h2>Login</h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  className="form-control"
                />
                {formik.touched.username && formik.errors.username ? (
                  <div>{formik.errors.username}</div>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="form-control"
                />
                {formik.touched.password && formik.errors.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}
              </div>
              <div className="text-center">
                <button type="submit" className="btn button-style text-white">
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
