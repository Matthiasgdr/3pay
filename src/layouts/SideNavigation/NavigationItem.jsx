import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

import { Text, Group, UnstyledButton } from "@mantine/core";
import { SideNavigationStyles } from "../styles.layouts";
// import { useMoralis } from "react-moralis";

const NavigationItem = ({ label, icon, route }) => {
  const { classes } = SideNavigationStyles();
  const location = useLocation();
  const isCurrentPage = location.pathname === route;

  return (
    <UnstyledButton
      className={classes.navigationItem}
      component={Link}
      to={route}
      sx={
        isCurrentPage
          ? (theme) => ({
              color: theme.colors.blue[5],
              backgroundColor: theme.colors.blue[0],
              "&::before": {
                opacity: "1",
                width: "6px",
              },
            })
          : undefined
      }
    >
      <Group>
        {icon}
        <Text size="sm" weight={isCurrentPage && "600"}>
          {label}
        </Text>
      </Group>
    </UnstyledButton>
  );
};

NavigationItem.propTypes = {
  label: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};

export default NavigationItem;
