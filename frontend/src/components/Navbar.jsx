import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return <header>
    <div className="container">
      <Link to="/">Home</Link>
    </div>
  </header>;
};

export default Navbar;
