import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

import { forgotPassword, clearErrors } from "../../actions/userActions";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.set("email", email);

    dispatch(forgotPassword(formData));
  };

  useEffect(() => {
    if (error) {
      console.log("error:", error);
      dispatch(clearErrors());
    }

    if (message) {
      console.log(message);
    }
  }, [dispatch, alert, error, message]);

  return (
    <>
      <Helmet>
        <title>Forgot password - ShopIT</title>
      </Helmet>

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handleSubmit}>
            <h1 className="mb-3">Forgot Password</h1>
            <div className="form-group">
              <label htmlFor="email_field">Enter Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <button
              id="forgot_password_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={(loading && true) || false}
            >
              Send Email
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
