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

export default { useAuthLayoutStyles };
