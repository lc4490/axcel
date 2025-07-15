"use client";

import {
  Box,
  Button,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  CircularProgress,
} from "@mui/material";
import { SetStateAction, useState } from "react";

export default function Home() {
  const [onboarded, setOnboarded] = useState(false);
  const [page, setPage] = useState(0);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [heightCM, setHeightCM] = useState("");
  const [heightFT, setHeightFT] = useState("");
  const [heightIN, setHeightIN] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [weightKG, setWeightKG] = useState("");
  const [weightLB, setWeightLB] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [goal, setGoal] = useState("");
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
  // const [values, setValues] = useState(Array(9).fill(""));
  const [values, setValues] = useState([
    "體脂 16%、瘦體重 58.8 kg",
    "52 cm",
    "4.3 秒",
    "10.2 秒",
    "臥推: 85 kg、深蹲: 110 kg",
    "5.8 秒",
    "45 次/分鐘、伏地挺身: 35 次",
    "8.5 秒",
    "Level 17.1 (~1800 m)",
  ]);
  const [suggestions, setSuggestions] = useState(Array(3).fill(""));
  const [input, setInput] = useState("");

  const makeSuggestions = async () => {
    let input = "";
    const height =
      heightUnit === "cm"
        ? heightCM + " " + heightUnit
        : heightFT + ", " + heightIN + " " + heightUnit;
    const weight =
      weightUnit === "kg"
        ? weightKG + " " + weightUnit
        : weightLB + " " + weightUnit;

    input += "身高：" + height + "\n";
    input += "體重：" + weight + "\n";
    input += "測試結果:\n";

    for (let i = 0; i < labels.length; i++) {
      input += labels[i] + values[i] + "\n";
    }
    setInput(input);

    const res = await fetch("/api/openai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    });

    const data = await res.json();
    console.log("AI Response:", data.result);
    const titles = data.result;
    setSuggestions(titles.split("\n"));
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent={"center"}
      alignItems={"center"}
      onKeyDown={(e) => {
        // enter to go to next step
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
            const isComplete = values.every((v) => v !== "");
            if (isComplete) {
              setPage(page + 1);
              makeSuggestions();
            }
          }
          if (page === 2) {
            setOnboarded(true);
          }
        }
        // escape to exit
        if (e.key === "Escape") {
          if (editing) {
            e.preventDefault();
            setOnboarded(true);
          }
        }
      }}
      tabIndex={0}
    >
      <>
        {onboarded ? (
          <Box>
            {/* Edit button */}
            <Button
              onClick={() => {
                setOnboarded(false), setPage(0), setEditing(true);
              }}
              sx={{
                position: "absolute",
                top: 16,
                left: 16,
                bgcolor: "#000",
                color: "#fff",
                "&:hover": { bgcolor: "#333" },
              }}
            >
              Edit
            </Button>
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
            {/* X button to close */}
            {editing && (
              <Button
                onClick={() => {
                  setOnboarded(true);
                }}
                sx={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  minWidth: "32px",
                  height: "32px",
                  padding: 0,
                  borderRadius: "50%",
                  // border: "1px solid #ccc", // subtle border
                  // backgroundColor: "#f5f5f5", // light gray background
                  color: "#333",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  lineHeight: 1,
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                    borderColor: "#999",
                  },
                  zIndex: 10,
                }}
              >
                ×
              </Button>
            )}
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
              <>
                <Box
                  width="100%"
                  height="90%"
                  sx={{
                    overflowY: "auto",
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
                    "&.Mui-disabled": {
                      bgcolor: "#ccc",
                      color: "#888",
                    },
                  }}
                >
                  上一步
                </Button>
                <Button
                  onClick={() => {
                    const isComplete = values.every((v) => v !== "");
                    if (isComplete) {
                      setPage(page + 1);
                      makeSuggestions();
                    }
                  }}
                  disabled={values.every((v) => v === "")}
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
            {page === 2 && (
              <>
                <Box
                  width="100%"
                  height="100%"
                  display="flex"
                  justifyContent={"center"}
                  alignItems={"center"}
                  flexDirection={"column"}
                  gap={2.5}
                >
                  <Typography
                    sx={{ fontSize: "2.5rem", fontWeight: 700, color: "black" }}
                  >
                    目標設定
                  </Typography>
                  {suggestions[0] !== "" && (
                    <Stack
                      width="500px"
                      direction="row"
                      spacing={1}
                      padding={2}
                      justifyContent="space-between" // Align items to the start for horizontal scroll
                      alignItems="center"
                      flexWrap="nowrap" // Prevent wrapping
                      sx={{
                        // width: isMobile ? '100%' : '92.5%',
                        backgroundColor: "background.paper",
                        gap: 2,
                        overflowX: "auto", // Enable horizontal scrolling
                        whiteSpace: "nowrap", // Prevent items from breaking to the next line
                        "&::-webkit-scrollbar": {
                          height: "6px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          backgroundColor: "rgba(0, 0, 0, 0.2)",
                          borderRadius: "3px",
                        },
                      }}
                    >
                      {suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outlined"
                          onClick={() => setGoal(suggestion)}
                          sx={{
                            textTransform: "none",
                            backgroundColor: "background.default",
                            color: "text.primary",
                            borderRadius: "9999px",
                            paddingX: 3,
                            paddingY: 1.5,
                            minWidth: 125,
                            height: "auto",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            whiteSpace: "normal",
                            boxShadow: 1,
                            "&:hover": {
                              backgroundColor: "primary.light",
                              boxShadow: 2,
                            },
                          }}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </Stack>
                  )}
                  {suggestions[0] === "" && <CircularProgress />}
                  <TextField
                    variant="outlined"
                    placeholder="輸入目標"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
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
                <Button
                  onClick={() => setPage(page - 1)}
                  sx={{
                    position: "absolute",
                    bottom: 16,
                    left: 16,
                    bgcolor: "#000",
                    color: "#fff",
                    "&:hover": { bgcolor: "#333" },
                    "&.Mui-disabled": {
                      bgcolor: "#ccc",
                      color: "#888",
                    },
                  }}
                >
                  上一步
                </Button>
                <Button
                  onClick={() => setOnboarded(true)}
                  disabled={goal === ""}
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
                  完成
                </Button>
              </>
            )}
          </Box>
        )}
      </>
    </Box>
  );
}
