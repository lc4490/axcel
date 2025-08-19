"use client";
import * as React from "react";

import {
  Box,
  Button,
  Chip,
  Container,
  CssBaseline,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

import { t, type Lang } from "@/i18n/translations";
import {
  createTheme,
  ThemeProvider,
  PaletteMode,
  alpha,
} from "@mui/material/styles";

// ---------- Theme (dark-mode first, with toggle + persistence) ----------
const useMode = () => {
  const [mode, setMode] = React.useState<PaletteMode>("dark");

  // Load initial mode from localStorage or prefers-color-scheme
  React.useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("axcel-mode") : null;
    if (stored === "light" || stored === "dark") {
      setMode(stored);
    } else if (typeof window !== "undefined") {
      const prefersDark = window.matchMedia?.(
        "(prefers-color-scheme: dark)"
      ).matches;
      setMode(prefersDark ? "dark" : "light");
    }
  }, []);

  const toggle = React.useCallback(() => {
    setMode((prev) => {
      const next: PaletteMode = prev === "dark" ? "light" : "dark";
      if (typeof window !== "undefined")
        localStorage.setItem("axcel-mode", next);
      return next;
    });
  }, []);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "dark"
            ? {
                background: {
                  default: "#0d0f13",
                  paper: "#111318",
                },
                text: {
                  primary: "#f5f7ff",
                  secondary: alpha("#f5f7ff", 0.65),
                },
              }
            : {
                background: {
                  default: "#f6f8fb",
                  paper: "#ffffff",
                },
                text: {
                  primary: "#0f1320",
                  secondary: alpha("#0f1320", 0.65),
                },
              }),
          primary: {
            main: mode === "dark" ? "#7aa7ff" : "#2957d0",
          },
        },
        shape: { borderRadius: 14 },
        typography: {
          fontWeightBold: 800,
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
              },
            },
          },
          MuiListItemButton: {
            styleOverrides: {
              root: {
                transition: "all .18s ease",
              },
            },
          },
        },
      }),
    [mode]
  );

  return { mode, toggle, theme };
};

export default function Login() {
  const { mode, toggle, theme } = useMode();
  const dark = mode === "dark";

  // If you already manage `lang` globally, pass it down as a prop and remove local state.
  const [lang, setLang] = React.useState<Lang>("zh-TW");
  const tr = t(lang);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          py: { xs: 4, md: 8 },
          background: dark
            ? "radial-gradient(1200px 500px at -10% -10%, rgba(255,255,255,0.06), transparent 60%), linear-gradient(140deg, #0b0c10 0%, #0f1116 60%, #151821 100%)"
            : "linear-gradient(140deg, #f7f9fc 0%, #ffffff 50%, #f4f6fb 100%)",
        }}
      >
        {/* top controls */}
        <Container maxWidth="lg" sx={{ mb: 2 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                letterSpacing: "-0.5px",
                background: dark
                  ? "linear-gradient(90deg, #ffffff 0%, #cfd8ff 40%, #9ad7ff 100%)"
                  : "linear-gradient(90deg, #111 0%, #2b3a63 40%, #1663a5 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              AXCEL
            </Typography>

            <Stack direction="row" spacing={1}>
              <Button
                size="small"
                variant="outlined"
                aria-label={tr("home.toggleLang")}
                onClick={() => setLang(lang === "zh-TW" ? "en" : "zh-TW")}
                sx={{
                  borderRadius: 999,
                  px: 1.6,
                  color: "text.primary",
                  borderColor: dark
                    ? "rgba(255,255,255,0.25)"
                    : "rgba(0,0,0,0.2)",
                  bgcolor: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                  backdropFilter: "blur(8px)",
                  "&:hover": {
                    bgcolor: dark
                      ? "rgba(255,255,255,0.12)"
                      : "rgba(0,0,0,0.08)",
                  },
                }}
              >
                {lang === "zh-TW" ? "English" : "繁體中文"}
              </Button>

              <IconButton
                aria-label="Toggle dark mode"
                onClick={toggle}
                sx={{
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: dark
                    ? "rgba(255,255,255,0.25)"
                    : "rgba(0,0,0,0.18)",
                  bgcolor: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                  "&:hover": {
                    bgcolor: dark
                      ? "rgba(255,255,255,0.12)"
                      : "rgba(0,0,0,0.08)",
                  },
                }}
              >
                {dark ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
              </IconButton>
            </Stack>
          </Stack>

          <Typography
            sx={{ color: "text.secondary", mt: 1.5, mb: 1.5, fontSize: 14.5 }}
          >
            {tr("signInMessage")}
          </Typography>
        </Container>

        {/* content */}
        <Container maxWidth="lg">
          <Paper
            elevation={0}
            sx={{
              minHeight: { xs: "60vh", md: "50vh" },
              py: { xs: 4, md: 8 },
              position: "relative",
              overflow: "hidden",
              p: 2.25,
              borderRadius: 3,
              border: (theme) =>
                `1px solid ${
                  dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"
                }`,
              background: dark
                ? `linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))`
                : `linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.88))`,
            }}
          >
            {/* soft accent wash */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(90deg, 0.15), transparent 35%)`,
                pointerEvents: "none",
              }}
            />
            <Stack display="flex" flexDirection={"row"} p={2}>
              <Box width="50%">
                <Typography variant="h4">{tr("createAccount")}</Typography>
              </Box>
              <Box width="50%" display="flex" flexDirection={"column"} gap={2}>
                <TextField
                  variant="outlined"
                  label={tr("email")}
                  sx={{ width: "100%" }}
                />
                <TextField
                  variant="outlined"
                  label={tr("password")}
                  sx={{ width: "100%" }}
                />
                <Box
                  display="flex"
                  gap={2}
                  sx={{
                    position: "absolute",
                    right: 32,
                    bottom: 32,
                  }}
                >
                  <Button
                    href="/"
                    sx={{
                      bgcolor: "#9ad7ff",
                      color: "#000",
                      px: 4,
                      py: 2,
                      borderRadius: 12,
                      "&:hover": { bgcolor: "#cfd8ff" },
                      "&.Mui-disabled": { bgcolor: "#ccc", color: "#888" },
                    }}
                  >
                    {tr("createAccount")}
                  </Button>
                </Box>
              </Box>
            </Stack>
          </Paper>

          {/* <Divider
            sx={{
              mt: 4,
              borderColor: dark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)",
            }}
          /> */}
          {/* <Typography
            sx={{
              color: "text.secondary",
              mt: 2,
              fontSize: 12.5,
              opacity: 0.85,
            }}
          >
            {tr("home.footerNote")}
          </Typography> */}
        </Container>
      </Box>
    </ThemeProvider>
  );
}
