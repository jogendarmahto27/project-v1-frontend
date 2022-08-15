
import React from "react";
import './Navbar.css';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div class="navbars">
        <div>
            <img src="https://www.dbs.com/dbstechindia/public/images/dbs-tech-logo.png" alt=""/>
        </div>
      <div class="right-nav">
        <Link style={{ textDecoration: 'none', color: 'blue' }} to="/transactiondetails" className="navLink">
              Transaction Details{" "}
            </Link>
            <Link style={{ textDecoration: 'none', color: 'blue' }} to="/customer" className="navLink">
              Customer details{" "}
            </Link>
            <Link style={{ textDecoration: 'none', color: 'blue' }} to="/logout" className="navLink">
              Logout{" "}
            </Link>
      </div>
    </div>
  );
};

export default Navbar;