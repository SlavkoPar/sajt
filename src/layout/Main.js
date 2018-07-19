import React from "react";
import "./Main.css";
import Empty from "./Empty";
import MainWindow from "./MainWindow";

const Main = (activeId) => {

  const renderMainContent = () => {
    if (!activeId) {
      return <Empty />;
    } 
    else {
      return <MainWindow activeId={activeId} />;
    }
  };
  
  return <main className="Main">{renderMainContent()}</main>;
};

export default Main;