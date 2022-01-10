import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";

import { resetPassword, clearErrors } from "../../actions/userActions";

function NewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { error, success } = useSelector((state) => state.forgotPassword);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(params.token, formData));
  };

  useEffect(() => {
    if (error) {
      console.log("error:", error);
      dispatch(clearErrors());
    }

    if (success) {
      console.log("password updated successfully");
      navigate("/login");
    }
  }, [dispatch, alert, error, success]);

  return (
    <>
      <Helmet>
        <title>New password reset - ShopIT</title>
      </Helmet>

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handleSubmit}>
            <h1 className="mb-3">New Password</h1>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm_password_field">Confirm Password</label>
              <input
                type="password"
                id="confirm_password_field"
                className="form-control"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>

            <button
              id="new_password_button"
              type="submit"
              className="btn btn-block py-3"
            >
              Apply changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewPassword;
