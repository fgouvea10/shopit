import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Search from "../Search";

function Header() {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const searchHandler = (event) => {
    event.preventDefault();

    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/">
            <img src="./assets/logo.png" />
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search
          onChange={(event) => setKeyword(event.target.value)}
          onSubmit={searchHandler}
        />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <button className="btn" id="login_btn">
          Login
        </button>

        <span id="cart" className="ml-3">
          Cart
        </span>
        <span className="ml-1" id="cart_count">
          2
        </span>
      </div>
    </nav>
  );
}

export default Header;
