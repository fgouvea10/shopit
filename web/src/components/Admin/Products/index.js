import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../../Loader";
import Sidebar from "../Sidebar";
import { getAdminProducts, clearErrors } from "../../../actions/productActions";

function AdminProducts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    products.forEach((product) => {
      data.rows.push({
        id: product._id,
        name: product.name,
        price: `$${product.price}`,
        stock: product.stock,
        actions: (
          <>
            <Link
              to={`/admin/product/${product._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button className="btn btn-danger py-1 px-2 ml-2">
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });

    return data;
  };

  useEffect(() => {
    dispatch(getAdminProducts());

    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <>
      <Helmet>
        <title>Products | Admin - ShopIT</title>
      </Helmet>

      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <h1 className="my-5">All products</h1>
          <MDBDataTable
            data={setProducts}
            className="px-3"
            bordered
            striped
            hover
          />
        </div>
      </div>
    </>
  );
}

export default AdminProducts;
