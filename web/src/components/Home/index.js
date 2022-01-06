import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";

import { getProducts } from "../../actions/productActions";
import Loader from "../Loader";
import ProductCard from "../Products/ProductCard";

function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();

  const { loading, products, error, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );

  const keyword = params.keyword;

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (error) return alert.error(error);

    dispatch(getProducts(keyword, currentPage));
  }, [dispatch, alert, error, keyword, currentPage]);

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

          {resPerPage <= productsCount && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Previous"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Home;
