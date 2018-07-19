import React from "react";
import SidebarItem from "./SidebarItem"; 
import routes from '../routes';
import "./Sidebar.css";

const Sidebar = (activeId) => {
  return (
    <aside className="Sidebar">
      {routes.map(route => <SidebarItem route={route} key={route.id} />)} 
    </aside>
  );
};

export default Sidebar;