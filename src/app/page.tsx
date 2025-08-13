"use client";

import * as React from "react";
import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Paper,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { t, type Lang } from "@/i18n/translations";

// ---------- Types ----------
type KeyNavNode = { key: string; href?: string; children?: KeyNavNode[] };
type NavNode = { label: string; href?: string; children?: NavNode[] };

// ---------- Nav keys (labels come from i18n) ----------
const NAV_KEYS: KeyNavNode[] = [
  {
    key: "nav.viewData",
    children: [
      {
        key: "nav.viewData.playerSummary",
        href: "/view-data/player-summary",
      },
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
      {
        key: "nav.setup.players",
        href: "/setup/players",
      },
      {
        key: "nav.setup.ipad",
        href: "/setup/ipad",
      },
      {
        key: "nav.setup.eventManagement",
        href: "/setup/eventManagement",
      },
      {
        key: "nav.setup.cloudReference",
        href: "/setup/cloudReference",
      },
      {
        key: "nav.setup.intervals",
        href: "/setup/intervals",
      },
      {
        key: "nav.setup.parameter",
        href: "/setup/parameter",
      },
      {
        key: "nav.setup.fieldPosition",
        href: "/setup/fieldPosition",
      },
      {
        key: "nav.setup.fileManagement",
        href: "/setup/fileManagement",
      },
      {
        key: "nav.setup.labels",
        href: "/setup/labels",
      },
      {
        key: "nav.setup.teams",
        href: "/setup/teams",
      },
      {
        key: "nav.setup.users",
        href: "/setup/users",
      },
      {
        key: "nav.setup.site",
        href: "/setup/site",
      },
      {
        key: "nav.setup.account",
        href: "/setup/account",
      },
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
    label: tr(n.key),
    href: n.href,
    children: n.children ? buildNav(n.children, tr) : undefined,
  }));

const idFromKey = (key: string): string => key.replace(/[^\w-]/g, "_");

// ---------- Renderers ----------
const Leaf: React.FC<{ node: NavNode }> = ({ node }) => (
  <ListItemButton
    component={Link}
    href={node.href ?? "#"}
    disabled={!node.href}
    sx={{ borderRadius: 1 }}
  >
    <ListItemText primary={node.label} />
  </ListItemButton>
);

const Branch: React.FC<{ node: NavNode; id?: string }> = ({ node }) => {
  if (!node.children?.length) return <Leaf node={node} />;
  const contentId = `${idFromKey(node.label)}-content`;
  return (
    <Accordion
      disableGutters
      elevation={0}
      square
      sx={{ "&::before": { display: "none" } }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={contentId}
        id={contentId}
      >
        <Typography fontWeight={600}>{node.label}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 0 }}>
        <List dense disablePadding>
          {node.children.map((child) =>
            child.children ? (
              <Box key={child.label} sx={{ mb: 1 }}>
                <Typography
                  variant="caption"
                  sx={{ ml: 2, color: "text.secondary" }}
                >
                  {child.label}
                </Typography>
                <List disablePadding>
                  {child.children.map((grand) => (
                    <Leaf key={grand.href ?? grand.label} node={grand} />
                  ))}
                </List>
              </Box>
            ) : (
              <Leaf key={child.href ?? child.label} node={child} />
            )
          )}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

// ---------- Page ----------
export default function HomePage() {
  // If you already manage `lang` globally, receive it as a prop instead.
  const [lang, setLang] = React.useState<Lang>("zh-TW");
  const tr = t(lang);

  const NAV = React.useMemo(() => buildNav(NAV_KEYS, tr), [tr]);
  const LangToggle = (
    <Box
      sx={{
        position: "fixed",
        bottom: 12,
        right: 12,
        zIndex: 20,
      }}
    >
      <Button
        size="small"
        variant="outlined"
        onClick={() => setLang(lang === "zh-TW" ? "en" : "zh-TW")}
        sx={{
          bgcolor: "#000",
          color: "#fff",
          borderColor: "#fff",
          "&:hover": { bgcolor: "#333" },
          "&.Mui-disabled": {
            bgcolor: "#ccc",
            color: "#888",
          },
        }}
      >
        {lang === "zh-TW" ? "English" : "繁體中文"}
      </Button>
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {LangToggle}
      <Paper variant="outlined" sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          AXCEL
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          {tr("home.subtitle")}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {NAV.map((section) => (
          <Box key={section.label} sx={{ mb: 1.5 }}>
            <Branch node={section} />
          </Box>
        ))}
      </Paper>
    </Container>
  );
}
