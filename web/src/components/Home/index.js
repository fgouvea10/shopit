import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import { getProducts } from "../../actions/productActions";
import Loader from "../Loader";
import ProductCard from "../Products/ProductCard";

function Home() {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, products, error, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) return alert.error(error);
    
    dispatch(getProducts());

  }, [dispatch, alert, error]);

  return (
    <>
      <Helmet>
        <title>Buy best products online - ShopIT</title>
      </Helmet>
      {(loading && <Loader />) || (
        <>
          <h1 id="products_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} data={product} />
                ))}
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default Home;
