import React from "react";
import Header from "./Header";
import Body from "./Body"; 
import Footer from "./Footer"
import "./MainWindow.css"

const MainWindow = ({ activeId }) => {
  const typing = ''

    return (
    <div className="MainWindow">
      <Header activeId={activeId} />
      <Body />
      <Footer value={typing} />
    </div>
  );
};

export default MainWindow;