import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-container mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="input-group shadow-sm rounded-pill overflow-hidden border">
            <span className="input-group-text bg-white border-0 ps-4">
              <i className="bi bi-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control border-0 py-3"
              placeholder="Search by event title or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ boxShadow: 'none' }}
            />
            {searchTerm && (
              <button 
                className="btn bg-white border-0 pe-4" 
                onClick={() => setSearchTerm("")}
              >
                <i className="bi bi-x-lg text-muted"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;