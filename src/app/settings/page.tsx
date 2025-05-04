"use client";
import TopAppBar from "@/ui/TopAppBar";
import { ThemeProvider } from "@mui/material/styles";
import { cacheRtl, theme } from "@/ui/theme";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/lib/store";
import SettingsTable from "@/ui/SettingsTable";
import { Box, Toolbar } from "@mui/material";
import DebateSectionAdder from "@/ui/DebateSectionAdder";
import { CacheProvider } from "@emotion/react";

export default function Home() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
            <TopAppBar />
            <Toolbar />
            <Box sx={{ m: 4 }}>
              <DebateSectionAdder />
              <SettingsTable />
            </Box>
          </ThemeProvider>
        </CacheProvider>
      </PersistGate>
    </Provider>
  );
}
