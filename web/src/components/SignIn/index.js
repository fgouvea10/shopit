import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { BsEye, BsEyeSlash } from "react-icons/bs";

import Loader from "../Loader";
import { login, clearErrors } from "../../actions/userActions";
import "./styles.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error]);

  return (
    <>
      {(loading && <Loader />) || (
        <>
          <Helmet>
            <title>Sign In - ShopIT</title>
          </Helmet>

          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={handleSubmit}>
                <h1 className="mb-3">Login</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>

                <div className="form-group password-field">
                  <label htmlFor="password_field">Password</label>
                  <div className="button-password">
                    <input
                      type={(showPassword && "text") || "password"}
                      placeholder="your password"
                      id="password_field"
                      className="form-control"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {(showPassword && (
                        <BsEyeSlash size={20} color="#000" />
                      )) || <BsEye size={20} color="#000" />}
                    </button>
                  </div>
                </div>

                <Link to="/password/forgot" className="float-right mb-4">
                  Forgot Password?
                </Link>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  LOGIN
                </button>

                <Link
                  to="/register"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: "1rem",
                  }}
                >
                  New user? Sign up
                </Link>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default SignIn;
