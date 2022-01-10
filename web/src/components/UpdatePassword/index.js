import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";

import { updatePassword, clearErrors } from "../../actions/userActions";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";

import "./styles.css";

function UpdatePassword() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isUpdated, loading } = useSelector((state) => state.user);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.set("oldPassword", oldPassword);
    formData.set("password", password);

    dispatch(updatePassword(formData));
  };

  useEffect(() => {
    if (error) {
      console.log("error:", error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      console.log("password updated successfully");
      navigate("/me");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, alert, error, isUpdated]);

  return (
    <>
      <Helmet>
        <title>Change Password - ShopIT</title>
      </Helmet>

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handleSubmit}>
            <h1 className="mt-2 mb-5">Update Password</h1>
            <div className="form-group password-field">
              <label htmlFor="password_field">Password</label>
              <div className="button-password">
                <input
                  type={(showOldPassword && "text") || "password"}
                  placeholder="your password"
                  id="password_field"
                  className="form-control"
                  value={oldPassword}
                  onChange={(event) => setOldPassword(event.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {(showPassword && <BsEyeSlash size={20} color="#000" />) || (
                    <BsEye size={20} color="#000" />
                  )}
                </button>
              </div>
            </div>

            <div className="form-group password-field">
              <label htmlFor="password_field">Old password</label>
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
                  {(showPassword && <BsEyeSlash size={20} color="#000" />) || (
                    <BsEye size={20} color="#000" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
              disabled={(loading && true) || false}
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdatePassword;
