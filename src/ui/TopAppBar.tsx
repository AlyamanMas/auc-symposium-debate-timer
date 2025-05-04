import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import Settings from "@mui/icons-material/Settings";
import Home from "@mui/icons-material/Home";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopAppBar() {
  const pathname = usePathname();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="transparent" elevation={0}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            ملتقى الجامعة الأمريكية بالقاهرة
          </Typography>
          <IconButton
            color="inherit"
            size="large"
            href={pathname === "/settings" ? "/" : "/settings"}
            component={Link}
          >
            {pathname !== "/settings" ? <Settings /> : <Home />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
