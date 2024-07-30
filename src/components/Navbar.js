import React from "react";

const Navbar = ({ keyword, setKeyword, handleKeyPress, fetchMusicData }) => {
  return (
    <>
      <nav
        className="navbar bg-dark border-bottom border-body"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src="favicon.png"
              alt="Logo"
              width={30}
              height={24}
              className="d-inline-block align-text-top me-2"
            />
            Muzic
          </a>

          <div className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              onClick={() => fetchMusicData()}
            >
              Search
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
