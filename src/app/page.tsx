"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [onboarded, setOnboarded] = useState(false);
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent={"center"}
      alignItems={"center"}
    >
      <>
        {onboarded ? (
          <Box>onboard complete</Box>
        ) : (
          <Box
            width="600px"
            height="80%"
            display="flex"
            sx={{
              bgcolor: "white",
              borderRadius: "16px",
              p: 3,
              boxShadow: 3,
              position: "relative",
            }}
          >
            <Box>
              <Typography
                sx={{
                  color: "black",
                  fontWeight: "500",
                  fontSize: "1.4rem",
                  marginBottom: 2,
                }}
              >
                你好！讓我們先了解你，以便為你量身定制專屬體驗
              </Typography>
              <Typography sx={{ color: "black", fontWeight: "600" }}>
                名字
              </Typography>
              <TextField sx={{ width: "100%" }}></TextField>
            </Box>
            <Button
              onClick={() => setOnboarded(true)}
              sx={{
                position: "absolute",
                bottom: 16,
                right: 16,
                bgcolor: "#000",
                color: "#fff",
                "&:hover": { bgcolor: "#333" },
              }}
            >
              完成
            </Button>
          </Box>
        )}
      </>
    </Box>
  );
}
