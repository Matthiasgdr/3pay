import { createStyles } from "@mantine/core";

export const useAuthLayoutStyles = createStyles((theme) => {
  return {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      width: "100vw",
      backgroundColor: theme.colors.background.primary,
    },
    wrapper: {
      width: "396px",
      backgroundColor: theme.colors.background.primary,
      borderRadius: theme.radius.lg,
    },
  };
});

export const SideNavigationStyles = createStyles((theme) => {
  return {
    navigationContainer: {
      width: "257px",
      boxShadow: theme.shadows.md,
    },
    navigationItem: {
      position: "relative",
      width: "100%",
      padding: `${theme.spacing.md}px ${theme.spacing.lg}px`,
      color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
      textAlign: "left",
      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
      },
      "&::before": {
        content: '""',
        position: "absolute",
        left: "0",
        top: "0",
        bottom: "0",
        opacity: 0,
        width: "0px",
        backgroundColor: "blue",
        transition: "width 0.3s",
      },
    },
  };
});

export const MainLayoutStyles = createStyles(() => {
  return {
    mainLayoutContainer: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
    },
  };
});

export default { useAuthLayoutStyles, SideNavigationStyles };
