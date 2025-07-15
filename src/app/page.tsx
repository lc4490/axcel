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
  const [heightCM, setHeightCM] = useState("");
  const [heightFT, setHeightFT] = useState("");
  const [heightIN, setHeightIN] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");

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
            <Typography>
              {heightUnit === "cm" ? heightCM : heightFT + "/" + heightIN}
              {" " + heightUnit}
            </Typography>
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
                    身高
                  </Typography>
                  {/* heigh unit */}
                  <ToggleButtonGroup
                    size="small"
                    exclusive
                    value={heightUnit}
                    onChange={(_, newValue) => {
                      if (newValue !== null) {
                        if (newValue == "ft/in") {
                          setHeightFT(
                            String(Math.floor(parseFloat(heightCM) / 2.54 / 12))
                          );
                          setHeightIN(
                            String(
                              ((parseFloat(heightCM) / 2.54) % 12).toFixed(2)
                            )
                          );
                        } else {
                          setHeightCM(
                            String(
                              (
                                (parseInt(heightFT) * 12 +
                                  parseFloat(heightIN)) *
                                2.54
                              ).toFixed(2)
                            )
                          );
                        }
                        setHeightUnit(newValue);
                      }
                    }}
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
                {heightUnit === "cm" && (
                  <TextField
                    variant="outlined"
                    placeholder="輸入身高（cm）"
                    value={heightCM || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (parseFloat(value)) {
                        setHeightCM(String(parseFloat(value)));
                      } else {
                        setHeightCM("");
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
                )}
                {heightUnit === "ft/in" && (
                  <Stack display={"flex"} flexDirection={"row"}>
                    <TextField
                      variant="outlined"
                      placeholder="輸入身高（ft）"
                      value={heightFT || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (parseInt(value)) {
                          setHeightFT(String(parseInt(value)));
                        } else {
                          setHeightFT("");
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
                    <TextField
                      variant="outlined"
                      placeholder="輸入身高（in）"
                      value={heightIN || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (parseFloat(value) && parseFloat(value) <= 11) {
                          setHeightIN(value);
                        } else {
                          setHeightIN("");
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
                  </Stack>
                )}
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
