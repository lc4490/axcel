"use client";

import * as React from "react";
import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Paper,
  Button,
  Chip,
  Stack,
  IconButton,
  CssBaseline,
} from "@mui/material";
import {
  createTheme,
  ThemeProvider,
  PaletteMode,
  alpha,
} from "@mui/material/styles";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { t, type Lang } from "@/i18n/translations";
import { JSX } from "react";

// ---------- Types ----------
type KeyNavNode = { key: string; href?: string; children?: KeyNavNode[] };
type NavNode = {
  key: string;
  label: string;
  href?: string;
  children?: NavNode[];
};

// ---------- Nav keys (labels come from i18n) ----------
const NAV_KEYS: KeyNavNode[] = [
  {
    key: "nav.viewData",
    children: [
      { key: "nav.viewData.playerSummary", href: "/view-data/player-summary" },
      {
        key: "nav.viewData.playerTracking",
        href: "/view-data/player-tracking",
      },
      {
        key: "nav.viewData.playerLongTracking",
        href: "/view-data/player-long-tracking",
      },
      { key: "nav.viewData.teamReport", href: "/view-data/team-report" },
      { key: "nav.viewData.goalieReport", href: "/view-data/goalie-report" },
      { key: "nav.viewData.dailyReport", href: "/view-data/daily-report" },
    ],
  },
  { key: "nav.reload", href: "/" },
  {
    key: "nav.setup",
    children: [
      { key: "nav.setup.players", href: "/setup/players" },
      { key: "nav.setup.ipad", href: "/setup/ipad" },
      { key: "nav.setup.eventManagement", href: "/setup/eventManagement" },
      { key: "nav.setup.cloudReference", href: "/setup/cloudReference" },
      { key: "nav.setup.intervals", href: "/setup/intervals" },
      { key: "nav.setup.parameter", href: "/setup/parameter" },
      { key: "nav.setup.fieldPosition", href: "/setup/fieldPosition" },
      { key: "nav.setup.fileManagement", href: "/setup/fileManagement" },
      { key: "nav.setup.labels", href: "/setup/labels" },
      { key: "nav.setup.teams", href: "/setup/teams" },
      { key: "nav.setup.users", href: "/setup/users" },
      { key: "nav.setup.site", href: "/setup/site" },
      { key: "nav.setup.account", href: "/setup/account" },
    ],
  },
  { key: "nav.productNews", href: "/" },
  {
    key: "nav.notifications",
    children: [
      { key: "nav.notifications.all", href: "/notifications/all" },
      { key: "nav.notifications.account", href: "/notifications/account" },
      { key: "nav.notifications.event", href: "/notifications/event" },
    ],
  },
  {
    key: "nav.faq",
    children: [
      { key: "nav.faq.manual", href: "/faq/manual" },
      { key: "nav.faq.support", href: "/faq/support" },
    ],
  },
  {
    key: "nav.account",
    children: [
      { key: "nav.account.my", href: "/account/my" },
      { key: "nav.account.lang", href: "/account/language" },
      { key: "nav.account.logout", href: "/account/logout" },
    ],
  },
];

// ---------- Helpers ----------
const buildNav = (nodes: KeyNavNode[], tr: (k: string) => string): NavNode[] =>
  nodes.map((n) => ({
    key: n.key,
    label: tr(n.key),
    href: n.href,
    children: n.children ? buildNav(n.children, tr) : undefined,
  }));

const ICONS: Record<string, JSX.Element> = {
  "nav.viewData": <InsightsOutlinedIcon />,
  "nav.reload": <UpdateOutlinedIcon />,
  "nav.setup": <SettingsOutlinedIcon />,
  "nav.productNews": <NewspaperOutlinedIcon />,
  "nav.notifications": <NotificationsNoneOutlinedIcon />,
  "nav.faq": <HelpOutlineOutlinedIcon />,
  "nav.account": <PersonOutlineOutlinedIcon />,
};

const ACCENTS: Record<string, string> = {
  "nav.viewData": "#7aa7ff",
  "nav.reload": "#7fe0b0",
  "nav.setup": "#ffc66e",
  "nav.productNews": "#d9a6ff",
  "nav.notifications": "#ff9db2",
  "nav.faq": "#9bb4ff",
  "nav.account": "#96ddff",
};

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

// ---------- UI Pieces ----------
const NavLeaf: React.FC<{ node: NavNode }> = ({ node }) => (
  <ListItemButton
    component={Link}
    href={node.href ?? "#"}
    disabled={!node.href}
    sx={{
      borderRadius: 1.5,
      px: 1.25,
      py: 0.9,
      "&.Mui-disabled": { opacity: 0.45 },
      "&:hover": { transform: "translateX(3px)" },
      "&:focus-visible": {
        outline: "2px solid",
        outlineColor: "primary.main",
        outlineOffset: "2px",
      },
    }}
  >
    <ListItemText
      primary={node.label}
      primaryTypographyProps={{ fontSize: 14, fontWeight: 600 }}
    />
    <ArrowForwardIosRoundedIcon sx={{ fontSize: 14, opacity: 0.6 }} />
  </ListItemButton>
);

const SectionCard: React.FC<{ node: NavNode; dark: boolean }> = ({
  node,
  dark,
}) => {
  const icon = ICONS[node.key] ?? <InsightsOutlinedIcon />;
  const accent = ACCENTS[node.key] ?? "#9ad0ff";
  const hasChildren = Boolean(node.children?.length);

  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        overflow: "hidden",
        p: 2.25,
        borderRadius: 3,
        border: (theme) =>
          `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"}`,
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
          background: `linear-gradient(90deg, ${alpha(
            accent,
            0.15
          )}, transparent 35%)`,
          pointerEvents: "none",
        }}
      />

      {/* header */}
      <Stack
        direction="row"
        spacing={1.25}
        alignItems="center"
        sx={{ mb: 1.25 }}
      >
        <Chip
          icon={icon}
          label={node.label}
          variant="outlined"
          sx={{
            borderRadius: 2,
            px: 1,
            ".MuiChip-icon": { color: accent },
            borderColor: alpha(accent, 0.4),
            color: "text.primary",
            fontWeight: 700,
            background: dark ? alpha("#fff", 0.02) : alpha("#000", 0.02),
          }}
        />
      </Stack>

      <Divider
        sx={{
          mb: 1.25,
          borderColor: dark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)",
        }}
      />

      {/* content */}
      {hasChildren ? (
        <List
          dense
          disablePadding
          sx={{
            display: "grid",
            gap: 0.25,
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          }}
        >
          {node.children!.map((child) =>
            child.children?.length ? (
              <Box key={child.key} sx={{ px: 0.5 }}>
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    mb: 0.5,
                    ml: 0.5,
                    color: "text.secondary",
                    letterSpacing: 0.4,
                    textTransform: "uppercase",
                    fontWeight: 800,
                  }}
                >
                  {child.label}
                </Typography>
                <List dense disablePadding>
                  {child.children!.map((grand) => (
                    <NavLeaf key={grand.key} node={grand} />
                  ))}
                </List>
              </Box>
            ) : (
              <Box key={child.key} sx={{ px: 0.5 }}>
                <NavLeaf node={child} />
              </Box>
            )
          )}
        </List>
      ) : (
        <List dense disablePadding>
          <NavLeaf node={node} />
        </List>
      )}
    </Paper>
  );
};

// ---------- Page ----------
export default function HomePage() {
  const { mode, toggle, theme } = useMode();
  const dark = mode === "dark";

  // If you already manage `lang` globally, pass it down as a prop and remove local state.
  const [lang, setLang] = React.useState<Lang>("zh-TW");
  const tr = t(lang);
  const NAV = React.useMemo(() => buildNav(NAV_KEYS, tr), [tr]);

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

              {/* desktop user icon */}
              <Button
                size="small"
                variant="outlined"
                aria-label="User log in"
                href="/login"
                startIcon={<PersonOutlineOutlinedIcon />}
                sx={{
                  display: { xs: "none", md: "inline-flex" },
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
                {tr("signIn")}
              </Button>

              {/* mobile user icon*/}
              <IconButton
                aria-label="Toggle dark mode"
                href="/login"
                sx={{
                  display: { xs: "inline-flex", md: "none" },
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
                {<PersonOutlineOutlinedIcon />}
              </IconButton>
            </Stack>
          </Stack>

          <Typography
            sx={{ color: "text.secondary", mt: 1.5, mb: 1.5, fontSize: 14.5 }}
          >
            {tr("home.subtitle")}
          </Typography>
        </Container>

        {/* content */}
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            }}
          >
            {NAV.map((section) => (
              <SectionCard key={section.key} node={section} dark={dark} />
            ))}
          </Box>

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
