"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import SportsIcon from "@mui/icons-material/Sports";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import Athlete from "./athlete"; // ✅ adjust the path as needed
import Coach from "./coach";
import { t, type Lang } from "@/i18n/translations"; // ✅ tiny i18n helper

export default function Home() {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  // choose default language here: "zh-TW" or "en"
  const [lang, setLang] = useState<Lang>("zh-TW");
  const tr = t(lang);

  const [mode, setMode] = useState<"" | "athlete" | "coach">("");

  // small inline language toggle (no routing/middleware)
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
    <Box>
      {LangToggle}

      {/* select mode */}
      {mode === "" && (
        <Box width="100vw" height="100vh">
          <Stack
            width="100%"
            height="100%"
            display="flex"
            flexDirection={isMobile ? "column" : "row"}
          >
            <Box
              width={isMobile ? "100%" : "50%"}
              height={isMobile ? "50%" : "100%"}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              onClick={() => setMode("athlete")}
              sx={{
                cursor: "pointer",
                "&:hover": { backgroundColor: "#111" },
              }}
              aria-label={tr("home.mode.athlete")}
              role="button"
            >
              <FitnessCenterIcon sx={{ fontSize: "5rem" }} />
              <Typography sx={{ fontWeight: 500, fontSize: "1.2rem" }}>
                {tr("home.mode.athlete")}
              </Typography>
            </Box>

            <Box
              width={isMobile ? "100%" : "50%"}
              height={isMobile ? "50%" : "100%"}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              onClick={() => setMode("coach")}
              sx={{
                cursor: "pointer",
                "&:hover": { backgroundColor: "#111" },
              }}
              aria-label={tr("home.mode.coach")}
              role="button"
            >
              <SportsIcon sx={{ fontSize: "5rem" }} />
              <Typography sx={{ fontWeight: 500, fontSize: "1.2rem" }}>
                {tr("home.mode.coach")}
              </Typography>
            </Box>
          </Stack>
        </Box>
      )}

      {/* athlete / coach modes */}
      {mode === "athlete" && <Athlete lang={lang} />}
      {mode === "coach" && <Coach lang={lang} />}
    </Box>
  );
}
