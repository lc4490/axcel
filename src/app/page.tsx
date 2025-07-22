"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import SportsIcon from "@mui/icons-material/Sports";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import Athlete from "./athlete"; // ✅ adjust the path as needed
import Coach from "./coach";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Home() {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  const [mode, setMode] = useState("");
  return (
    <Box>
      {/* select mode */}
      {mode === "" && (
        <Box width="100vw" height="100vh">
          <Stack
            width="100%"
            height="100%"
            display="flex"
            flexDirection={isMobile ? "column" : "row"}
            // justifyContent={"center"}
            // alignItems="center"
          >
            <Box
              width={isMobile ? "100%" : "50%"}
              height={isMobile ? "50%" : "100%"}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              onClick={() => setMode("athlete")}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#111",
                },
              }}
            >
              <FitnessCenterIcon sx={{ fontSize: "5rem" }} />
              <Typography sx={{ fontWeight: "500", fontSize: "1.2rem" }}>
                個人
              </Typography>
            </Box>
            <Box
              width={isMobile ? "100%" : "50%"}
              height={isMobile ? "50%" : "100%"}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              onClick={() => setMode("coach")}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#111",
                },
              }}
            >
              <SportsIcon sx={{ fontSize: "5rem" }} />
              <Typography sx={{ fontWeight: "500", fontSize: "1.2rem" }}>
                教練
              </Typography>
            </Box>
          </Stack>
        </Box>
      )}
      {/* athlete mode */}
      {mode === "athlete" && <Athlete />}
      {mode === "coach" && <Coach />}
    </Box>
  );
}
