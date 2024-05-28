import React from "react";
import "./Layout.css";
import AdminNavbar from "../Adminnavbar/AdminNavbar";
import AdminHome from "../AdminHome";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const Layout = () => {
  const [selectedComponent, setSelectedComponent] = useState("");

  return (
    <div className="admin-home-container">
      <AdminHome setSelectedComponent={setSelectedComponent} />
      <div className="content-container">
        <AdminNavbar selectedComponent={selectedComponent} />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
