import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    // Name of the component
    MuiTypography: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontFamily: "GE SS Two",
        },
      },
    },
  },
});
