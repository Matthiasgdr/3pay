import { createStyles } from "@mantine/core";

export const useAuthLayoutStyles = createStyles((theme) => {
  return {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      width: "100vw",
      backgroundColor: theme.colors.background.secondary,
    },
    wrapper: {
      height: "50vh",
      width: "480px",
      backgroundColor: theme.colors.background.primary,
      borderRadius: theme.radius.lg,
      boxShadow: theme.shadows.lg,
    },
  };
});

export default { useAuthLayoutStyles };
