import React from "react";
import "./Header.css";
import Breadcrumbs from './Breadcrumbs'

function Header({ activeId }) {
  //const { name, status } = user;
  return (
    <header className="Header">
      <Breadcrumbs />
    </header>
  );
}

export default Header;