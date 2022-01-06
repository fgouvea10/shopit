import React from "react";

function Search({ onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Enter Product Name ..."
          onChange={onChange}
        />
        <div className="input-group-append">
          <button id="search_btn" className="btn" type="submit">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  );
}

export default Search;
