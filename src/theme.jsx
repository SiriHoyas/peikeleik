import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#404040",
      dark: "#404040",
    },
    background: {
      default: "#2E3047",
    },
    text: {
      primary: "#3BBA9C",
    },
  },
  typography: {
    playerName: {
      fontFamily: '"Open Sans", sans-serif',
      fontSize: "18px",
      lineHeight: "auto",
    },
    homePageLabel: {
      fontFamily: '"Open Sans", sans-serif',
      fontWeight: 600,
      fontSize: "18px",
    },
    gameTypeHeading: {
      fontFamily: "'New Amsterdam', sans-serif",
      fontSize: "38px",
      letterSpacing: "3px",
    },
    gameQuestion: {
      fontFamily: '"Open Sans", sans-serif',
      fontSize: "24px",
    },
    duelQuestion: {
      fontFamily: '"Open Sans", sans-serif',
      fontSize: "18px",
      fontWeight: 600,
    },
    buttonLabel: {
      fontFamily: "'New Amsterdam', sans-serif",
      fontSize: "26px",
      letterSpacing: "3px",
    },
    vsHeading: {
      fontFamily: "'New Amsterdam', sans-serif",
      fontSize: "35px",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderRadius: "6px",
          bgcolor: "#404040",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "black",
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          // backgroundColor: "#FDEEB3",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          // backgroundColor: "#FDEEB3",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          // backgroundColor: "#FDEEB3",
        },
      },
    },
  },
});
