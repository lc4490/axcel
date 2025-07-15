"use client";

import {
  Box,
  Button,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { SetStateAction, useState } from "react";

export default function Home() {
  const [onboarded, setOnboarded] = useState(false);
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");

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
          <Box>
            <Typography>{name}</Typography>
            <Typography>{height}</Typography>
          </Box>
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
              {/* name */}
              <Box sx={{ p: 1 }}>
                <Typography
                  sx={{ color: "black", fontWeight: "600", fontSize: "1" }}
                >
                  名字
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder="輸入名字"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px", // rounded corners
                      backgroundColor: "#fafafa", // subtle background
                      "& fieldset": {
                        borderColor: "#ddd", // lighter border
                      },
                      "&:hover fieldset": {
                        borderColor: "#aaa", // darker border on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#000", // strong border on focus
                      },
                    },
                  }}
                />
              </Box>
              {/* height */}
              <Box sx={{ p: 1 }}>
                <Stack
                  display={"flex"}
                  flexDirection={"row"}
                  sx={{ gap: 0.5, marginBottom: 1 }}
                  alignItems={"center"}
                >
                  <Typography
                    sx={{ color: "black", fontWeight: "600", fontSize: "1" }}
                  >
                    高度
                  </Typography>
                  <ToggleButtonGroup
                    size="small"
                    exclusive
                    sx={{
                      "& .MuiToggleButton-root": {
                        padding: "4px 8px", // reduce vertical & horizontal padding
                        fontSize: "0.75rem", // smaller text
                        minWidth: "40px", // optional: reduce minimum width
                      },
                    }}
                  >
                    <ToggleButton value="cm">cm</ToggleButton>
                    <ToggleButton value="ft/in">ft/in</ToggleButton>
                  </ToggleButtonGroup>
                </Stack>
                <TextField
                  variant="outlined"
                  placeholder="輸入高度"
                  value={height || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (parseFloat(value)) {
                      setHeight(value);
                    } else {
                      setHeight("");
                    }
                  }}
                  sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px", // rounded corners
                      backgroundColor: "#fafafa", // subtle background
                      "& fieldset": {
                        borderColor: "#ddd", // lighter border
                      },
                      "&:hover fieldset": {
                        borderColor: "#aaa", // darker border on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#000", // strong border on focus
                      },
                    },
                  }}
                />
              </Box>
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
