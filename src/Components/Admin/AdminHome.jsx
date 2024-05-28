import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faUser,
  faCartShopping,
  faPlus,
  faTruckArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logo.avif"; // Import the logo image
import { Link } from "react-router-dom";
import "./Admin.css";

const AdminHome = ({ setSelectedComponent }) => {
  const handleClick = (componentName) => {
    setSelectedComponent(componentName);
  };
  return (
    <div className="admin">
      <div className="logo">
        <img src={logo} alt="logo" /> {/* Use the logo variable */}
      </div>
      <ul className="admin-menu">
        <li>
          <FontAwesomeIcon icon={faGauge} />
          <Link to="/Userchart" onClick={() => handleClick("Dashboard")}>
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <FontAwesomeIcon icon={faUser} />
          <Link to="/ProductTable" onClick={() => handleClick("Users")}>
            <span>Users</span>
          </Link>
        </li>
        <li>
          <FontAwesomeIcon icon={faCartShopping} />
          <Link to="/UserTable" onClick={() => handleClick("Products")}>
            <span>Products</span>
          </Link>
        </li>
        <li>
          <FontAwesomeIcon icon={faTruckArrowRight} />
          <Link to="/OrderDetails" onClick={() => handleClick("Orders")}>
            <span>Orders</span>
          </Link>
        </li>
        <li>
          <FontAwesomeIcon icon={faPlus} />
          <Link to="/AddProducts" onClick={() => handleClick("AddProducts")}>
            <span>Add</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminHome;
