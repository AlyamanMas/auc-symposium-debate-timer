import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import Settings from '@mui/icons-material/Settings'

export default function TopAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                color="transparent"
                elevation={0}
            >
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }} />
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                    ملتقى الجامعة الأمريكية بالقاهرة
                    </Typography>
                    <IconButton
                        color="inherit"
                        size="large"
                    >
                        <Settings />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}