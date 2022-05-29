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
