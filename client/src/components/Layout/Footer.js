import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
      <h4 className="text-center">All rights reserved &copy; IDOL </h4>
      <p className="text-center mt-3" >
        <Link to='/about'> ABOUT </Link>|

        <Link to='/contact'> CONTACT </Link>|

        <Link to='/policy'> PRIVACY POLICY </Link>

      </p>
    </div>
  );
};

export default Footer;
