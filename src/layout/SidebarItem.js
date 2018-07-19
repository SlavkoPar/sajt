import React from "react";
import "./SidebarItem.css";
import { Link } from 'react-router-dom'

const SidebarItem = ({ route }) => {

  const { name, path, profile_pic, status } = route;

  return (
    <div className="SidebarItem">
      <Link to={process.env.PUBLIC_URL + path}><img src={profile_pic} alt={name} className="SidebarItem__pic" /></Link>
      <div className="SidebarItem__details">
        <Link to={process.env.PUBLIC_URL + path}><p className="SidebarItem__details-name">{name}</p></Link>
        {/* <p className="SidebarItem__details-status">{status}</p> */}
      </div>
    </div>
  );
};

export default SidebarItem;

