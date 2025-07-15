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
  const [page, setPage] = useState(0);
  const [name, setName] = useState("");
  const [heightCM, setHeightCM] = useState("");
  const [heightFT, setHeightFT] = useState("");
  const [heightIN, setHeightIN] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [weightKG, setWeightKG] = useState("");
  const [weightLB, setWeightLB] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const labels = [
    "1.身體組成:",
    "2.垂直跳:",
    "3.30公尺衝刺:",
    "4.T-test:",
    "5.1 RM測驗:",
    "6.40公尺衝刺:",
    "7.卷腹、伏地挺身:",
    "8.折返跑:",
    "9.Yo-yo Test:",
  ];
  const [values, setValues] = useState(Array(9).fill(""));

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent={"center"}
      alignItems={"center"}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();

          if (page === 0) {
            if (
              name !== "" &&
              !(
                (heightUnit === "cm" && heightCM === "") ||
                (heightUnit === "ft/in" &&
                  (heightFT === "" || heightIN === "")) ||
                (weightUnit === "kg" && weightKG === "") ||
                (weightUnit === "lbs" && weightLB === "")
              )
            ) {
              setPage(page + 1);
            }
          }
          if (page === 1) {
            // const isComplete = values.every((v) => v !== "");
            // if (isComplete) {
            setOnboarded(true);
            // }
          }
        }
      }}
      tabIndex={0}
    >
      <>
        {onboarded ? (
          <Box>
            <Typography>{name}</Typography>
            <Typography>
              {heightUnit === "cm" ? heightCM : heightFT + "/" + heightIN}
              {" " + heightUnit}
            </Typography>
            <Typography>
              {weightUnit === "kg" ? weightKG : weightLB}
              {" " + weightUnit}
            </Typography>
            <Button onClick={() => setOnboarded(false)}></Button>
          </Box>
        ) : (
          <Box
            width="600px"
            height="70%"
            display="flex"
            sx={{
              bgcolor: "white",
              borderRadius: "16px",
              p: 3,
              boxShadow: 3,
              position: "relative",
            }}
          >
            {page === 0 && (
              <>
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
                        sx={{
                          color: "black",
                          fontWeight: "600",
                          fontSize: "1",
                        }}
                      >
                        身高
                      </Typography>
                      {/* height unit */}
                      <ToggleButtonGroup
                        size="small"
                        exclusive
                        value={heightUnit}
                        onChange={(_, newValue) => {
                          if (newValue !== null) {
                            if (newValue == "ft/in") {
                              setHeightFT(
                                heightCM
                                  ? String(
                                      Math.floor(
                                        parseFloat(heightCM) / 2.54 / 12
                                      )
                                    )
                                  : ""
                              );
                              setHeightIN(
                                heightCM
                                  ? String(
                                      (
                                        (parseFloat(heightCM) / 2.54) %
                                        12
                                      ).toFixed(2)
                                    )
                                  : ""
                              );
                            } else {
                              setHeightCM(
                                heightIN && heightFT
                                  ? String(
                                      (
                                        (parseInt(heightFT) * 12 +
                                          parseFloat(heightIN)) *
                                        2.54
                                      ).toFixed(2)
                                    )
                                  : ""
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
                  {/* weight */}
                  <Box sx={{ p: 1 }}>
                    <Stack
                      display={"flex"}
                      flexDirection={"row"}
                      sx={{ gap: 0.5, marginBottom: 1 }}
                      alignItems={"center"}
                    >
                      <Typography
                        sx={{
                          color: "black",
                          fontWeight: "600",
                          fontSize: "1",
                        }}
                      >
                        重量
                      </Typography>
                      {/* height unit */}
                      <ToggleButtonGroup
                        size="small"
                        exclusive
                        value={weightUnit}
                        onChange={(_, newValue) => {
                          if (newValue !== null) {
                            if (newValue == "lbs") {
                              setWeightLB(
                                weightKG
                                  ? String(
                                      (parseFloat(weightKG) * 2.2).toFixed(2)
                                    )
                                  : ""
                              );
                            } else {
                              setWeightKG(
                                weightLB
                                  ? String(
                                      (parseFloat(weightLB) / 2.2).toFixed(2)
                                    )
                                  : ""
                              );
                            }
                            setWeightUnit(newValue);
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
                        <ToggleButton value="kg">kg</ToggleButton>
                        <ToggleButton value="lbs">lbs</ToggleButton>
                      </ToggleButtonGroup>
                    </Stack>
                    {weightUnit === "kg" && (
                      <TextField
                        variant="outlined"
                        placeholder="輸入重量（kg）"
                        value={weightKG || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (parseFloat(value)) {
                            setWeightKG(String(parseFloat(value)));
                          } else {
                            setWeightKG("");
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
                    {weightUnit === "lbs" && (
                      <TextField
                        variant="outlined"
                        placeholder="輸入重量（lbs）"
                        value={weightLB || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (parseFloat(value)) {
                            setWeightLB(String(parseFloat(value)));
                          } else {
                            setWeightLB("");
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
                  </Box>
                </Box>
                <Button
                  onClick={() => setPage(page + 1)}
                  disabled={
                    name === "" ||
                    (heightUnit === "cm" && heightCM === "") ||
                    (heightUnit === "ft/in" &&
                      (heightFT === "" || heightIN === "")) ||
                    (weightUnit === "kg" && weightKG === "") ||
                    (weightUnit === "lbs" && weightLB === "")
                  }
                  sx={{
                    position: "absolute",
                    bottom: 16,
                    right: 16,
                    bgcolor: "#000",
                    color: "#fff",
                    "&:hover": { bgcolor: "#333" },
                    "&.Mui-disabled": {
                      bgcolor: "#ccc",
                      color: "#888",
                    },
                  }}
                >
                  下一步
                </Button>
              </>
            )}
            {page === 1 && (
              <Box width="100%" height="100%">
                <Box
                  height="90%"
                  sx={{
                    overflowY: "auto", //
                    pr: 1,
                    position: "relative",
                  }}
                >
                  {labels.map((label, index) => (
                    <Stack
                      key={index}
                      width="100%"
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      sx={{ p: 1, gap: 1 }}
                    >
                      <Typography
                        sx={{
                          color: "black",
                          fontWeight: "600",
                          fontSize: "1rem",
                          whiteSpace: "nowrap",
                          minWidth: "120px", // ✅ fix label width
                        }}
                      >
                        {label}
                      </Typography>
                      <TextField
                        variant="outlined"
                        placeholder={`輸入${label.replace(/^\d+\./, "")}`}
                        value={values[index] || ""}
                        onChange={(e) => {
                          const updatedValues = [...values];
                          updatedValues[index] = e.target.value;
                          setValues(updatedValues);
                        }}
                        sx={{
                          flex: 1, // ✅ makes all text fields fill the remaining space equally
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            backgroundColor: "#fafafa",
                            "& fieldset": {
                              borderColor: "#ddd",
                            },
                            "&:hover fieldset": {
                              borderColor: "#aaa",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#000",
                            },
                          },
                        }}
                      />
                    </Stack>
                  ))}
                </Box>

                <Button
                  onClick={() => setPage(page - 1)}
                  sx={{
                    position: "absolute",
                    bottom: 16,
                    left: 16,
                    bgcolor: "#000",
                    color: "#fff",
                    "&:hover": { bgcolor: "#333" },
                  }}
                >
                  上一步
                </Button>
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
          </Box>
        )}
      </>
    </Box>
  );
}
