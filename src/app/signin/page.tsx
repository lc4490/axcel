"use client";
import * as React from "react";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

import { t } from "@/i18n/translations";
import { useI18n } from "@/i18n/I18nContext";
import {
  createTheme,
  ThemeProvider,
  PaletteMode,
  alpha,
} from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useUser } from "@/providers/UserProvider";

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

export default function SignIn() {
  const { mode, toggle, theme } = useMode();
  const dark = mode === "dark";

  // If you already manage `lang` globally, pass it down as a prop and remove local state.
  const { lang, setLang } = useI18n();
  const tr = t(lang);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();
  const [errMsg, setErrMsg] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [showPwd, setShowPwd] = React.useState(false);
  const { setUser } = useUser();

  const handleSignIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setErrMsg(null);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "applications/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.status === 401) {
        return setErrMsg(tr("userDoesNotExist"));
      }
      if (res.status === 402) {
        return setErrMsg(tr("invalidPassword"));
      }
      if (!res.ok) {
        return setErrMsg(data?.error ?? tr("signinFailed"));
      }
      if (data?.userId) setUser({ id: String(data.userId) });
      router.refresh();
      router.push("/");
    } catch (err) {
      setErrMsg(tr("networkErrMsg"));
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
      >
        <CircularProgress />
      </Box>
    );
  }
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
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (email && password) {
              handleSignIn(email.toLowerCase(), password);
            }
          }
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
            <Button href="/">
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
            </Button>

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
            <Stack
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
              p={2}
              gap={2}
            >
              <Box
                width={{ xs: "100%", md: "50%" }}
                display="flex"
                justifyContent={{ xs: "center", md: "flex-start" }}
              >
                <Typography variant="h4">{tr("signIn")}</Typography>
              </Box>
              <Box
                width={{ xs: "100%", md: "50%" }}
                display="flex"
                flexDirection={"column"}
                gap={2}
              >
                <TextField
                  variant="outlined"
                  label={tr("email")}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ width: "100%" }}
                />
                <TextField
                  variant="outlined"
                  label={tr("password")}
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ width: "100%" }}
                  autoComplete="new-password"
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={
                              showPwd ? tr("hidePassword") : tr("showPassword")
                            }
                            onClick={() => setShowPwd((s) => !s)}
                            onMouseDown={(e) => e.preventDefault()} // keep focus on input
                            edge="end"
                          >
                            {showPwd ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
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
                    href="/signup"
                    sx={{
                      //   bgcolor: "#000",
                      color: dark ? "#9ad7ff" : "#000",
                      px: 4,
                      py: 2,
                      borderRadius: 12,
                      //   "&:hover": { bgcolor: "#cfd8ff" },
                      "&.Mui-disabled": { bgcolor: "#ccc", color: "#888" },
                    }}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {tr("createAccount")}
                    </Typography>
                  </Button>
                  <Button
                    onClick={() => handleSignIn(email.toLowerCase(), password)}
                    sx={{
                      bgcolor: "#9ad7ff",
                      color: "#000",
                      px: 4,
                      py: 2,
                      borderRadius: 12,
                      "&:hover": { bgcolor: "#cfd8ff" },
                      "&.Mui-disabled": { bgcolor: "#ccc", color: "#888" },
                    }}
                    disabled={!email || !password}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {tr("signIn")}
                    </Typography>
                  </Button>
                </Box>
              </Box>
            </Stack>
          </Paper>

          {/* Email error message */}
          <Snackbar
            open={!!errMsg}
            autoHideDuration={6000}
            onClose={() => setErrMsg(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={() => setErrMsg(null)}
              severity="error"
              variant="filled"
            >
              {errMsg}
            </Alert>
          </Snackbar>

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
