import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import "./Header.scss";

const Header = (props) => {
  return (
    <nav className="header navbar navbar-dark">
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <i className="fa fa-user-circle-o ml-2 fa-2x"/>
        <span>{props.text}</span>
      </Link>
    </nav>
  );
};

Header.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Header;
