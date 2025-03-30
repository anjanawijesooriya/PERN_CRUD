import React from "react";

const NavBar = ({ onOpen, onSearch }) => {
  const handleSearchChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">ClientsUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            onChange={handleSearchChange}
            className="input input-bordered w-48 md:w-auto"
          />
        </div>
      </div>
      <div className="navbar-end">
        <a className="btn btn-primary" onClick={onOpen}>
          Add Client
        </a>
      </div>
    </div>
  );
};

export default NavBar;
