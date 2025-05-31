import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import Settings from "@mui/icons-material/Settings";
import Home from "@mui/icons-material/Home";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#000000",
    },
  },
});

interface TopAppBarProps {
  showButtons?: boolean;
}

export default function TopAppBar({ showButtons = true }: TopAppBarProps) {
  const pathname = usePathname();

  const handleHomeNavigation = () => {
    if (pathname === "/settings") {
      // Set counter to 1 when navigating from settings to home
      sessionStorage.setItem("skipAnimationCounter", "1");
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="transparent" elevation={0}>
        <Toolbar className="justify-center items-center">
          <div className="flex-1">
            <ThemeProvider theme={theme}>
              <IconButton
                color={pathname === "/settings" ? "secondary" : "primary"}
                size="large"
                href={pathname === "/settings" ? "/" : "/settings"}
                component={Link}
                onClick={handleHomeNavigation}
                className={`transition-opacity duration-300 ${
                  showButtons ? "opacity-100" : "opacity-0"
                }`}
              >
                {pathname !== "/settings" ? <Settings /> : <Home />}
              </IconButton>
            </ThemeProvider>
          </div>
          {pathname !== "/settings" && (
            <>
              <div className="flex-1 grow-3">
                <img
                  src="/symp-logo.png"
                  alt="Symposium Logo"
                  className="h-20 mt-2 mx-auto"
                />
              </div>
              <div className="flex-1">
                <img
                  src="/dean-logo.png"
                  alt="Dean's Office Logo"
                  className="h-16 mt-2 mr-auto"
                />
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
