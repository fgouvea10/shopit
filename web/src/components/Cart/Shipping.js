import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";

import { saveShippingInfo } from "../../actions/cartActions";

function Shipping() {
  const { shippingInfo } = useSelector((state) => state.cart);
  const [adress, setAdress] = useState("");

  return (
    <>
      <Helmet>
        <title>Shipping info - ShopIT</title>
      </Helmet>

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg">
            <h1 className="mb-4">Shipping Info</h1>
            <div className="form-group">
              <label htmlFor="address_field">Address</label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                value=""
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city_field">City</label>
              <input
                type="text"
                id="city_field"
                className="form-control"
                value=""
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone_field">Phone No</label>
              <input
                type="phone"
                id="phone_field"
                className="form-control"
                value=""
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="postal_code_field">Postal Code</label>
              <input
                type="number"
                id="postal_code_field"
                className="form-control"
                value=""
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="country_field">Country</label>
              <select id="country_field" className="form-control" value="" required>
                <option>USA</option>
              </select>
            </div>

            <button id="shipping_btn" type="submit" className="btn btn-block py-3">
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Shipping;
