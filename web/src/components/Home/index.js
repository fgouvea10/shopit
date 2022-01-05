import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";

import { getProducts } from "../../actions/productActions";
import ProductCard from "../Products/ProductCard";

function Home() {
  const dispatch = useDispatch();

  const { loading, products, error, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Buy best products online - ShopIT</title>
      </Helmet>
      {(loading && <h1>Loading...</h1>) || (
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
