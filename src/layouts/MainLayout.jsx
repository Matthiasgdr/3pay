import React from "react";
import { Outlet } from "react-router-dom";
// import PropTypes from "prop-types";

const MainLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

MainLayout.propTypes = {};

export default MainLayout;
