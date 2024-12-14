import React, { useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";

const Search = () => {
  const [values] = useSearch();

  useEffect(() => {
    // Clear the search query in the URL after results are displayed
    const url = new URL(window.location);
    url.searchParams.delete('search');
    window.history.replaceState({}, '', url.toString());
  }, [values?.result]);

  return (
    <Layout title={"Search Results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.result.length < 1
              ? "No products found"
              : `Found ${values?.result.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4 similar-products">
            {values?.result.map((p) => (
              <div className="card m-2" key={p._id}>
                <div className="card-img-container">
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                </div>
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title" title={p.name}>
                      {p.name}
                    </h5>
                    <p className="card-price">₹ {p.price}</p>
                  </div>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <div className="card-footer">
                    <button className="btn btn-primary">More Details</button>
                    <button className="btn btn-secondary">Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
