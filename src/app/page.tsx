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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  const [onboarded, setOnboarded] = useState(true);
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
  const [birthdate, setBirthdate] = useState<Dayjs | null>(null);
  const [team, setTeam] = useState("");
  const [jersey, setJersey] = useState("");
  const [position, setPosition] = useState("");
  const [maxHeartRate, setMaxHeartRate] = useState("");
  const [maxVelocity, setMaxVelocity] = useState("");
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
  // useEffect(() => {
  //   setSuggestions(Array(3).fill(""));
  // }, [values, heightCM, heightFT, heightIN, weightKG, weightLB]);
  const [suggestions, setSuggestions] = useState([
    `**[力量增強挑戰]**- **目標**: 提升全身力量，特別是下肢以提升跳躍與衝刺表現。- **原因**: 基於你的測試結果-垂直跳52cm與30公尺衝刺4.3秒與40公尺衝刺5.8秒表現，指出你的下肢力量還有上升的空間。此外，深蹲的1RM（一次最大重量）110kg與身高體重比例相較尚處於中等程度，故有加強的需要。- **重點**:  - 針對腿部力量的訓練，包含深蹲、腿舉等重量訓練，並逐步增加重量負荷以挑戰自我。  - 發展肌肉耐力是提升1RM的有效手段，如將重訓組數調整到3-4組，每組12-15次，讓肌肉適應後再調整到較重的重量，6-8次/組。  - 飲食上要保證足夠的蛋白質攝取，幫助肌肉恢復與成長。`,
    `**[速度魔咒突破]**- **目標**: 進一步提升衝刺速度與靈活度。- **原因**: 根據你的測試結果-30公尺衝刺4.3秒與40公尺衝刺5.8秒展現出你在短距離的速度表現已經很好，但仍能進一步提升。- **重點**:  - 重新設計你的跑步訓練計畫，包括間歇訓練、爆發力訓練與耐力訓練，使你的肌肉和神經系統適應更高的速度。  - 透過仿真訓練，模仿實戰中需要高速跑動的情況，提升你的應變能力與移動敏捷性。  - 確保適當的碳水化合物攝取，為你的訓練與恢復提供足夠的能量。`,
    `**[體能能量爆發]**- **目標**: 提升體能耐力並壓縮折返跑時間。- **原因**: 你的Yo-Yo Test Level 17.1 (~1800m)和折返跑8.5秒的測試結果顯示，你的耐力與爆發力均有出色的表現，但進一步的提升可以將你的全面體能拉到更高的層次。- **重點**:  - 多元化你的有氧訓練，如游泳、自行車、慢跑等，提高你的心肺功能並提高你的耐力。  - 加強核心肌群訓練，如俯臥撐、仰臥起坐、橋式運動等，進一步提升你的爆發力和速度。  - 飲食上要攝取足夠且均衡`,
  ]);
  // const [suggestions, setSuggestions] = useState(["", "", ""]);
  const [input, setInput] = useState("");
  // const [workouts, setWorkouts] = useState<string[]>([]);
  const [workouts, setWorkouts] = useState([
    "第1天 – 力量訓練 1. 深蹲 跳 – 4x6 @ 全力爆發 2. 俯臥推舉 – 4x6 @ 全力爆發 3. 無器械肩頭推舉 – 3x8 @ 60% 1RM 4. 腹部滾輪 – 3x15 ",
    "第2天 – 速度訓練 1. 30 公尺衝刺 – 6x1 @ 全力爆發 2. 鴨步走 – 3x20 @ 50% 1RM 3. 高位引體向上 – 3x8 @ 60% 1RM 4. 自由槓上推 – 3x8 @ 60% 1RM",
    "第3天 – 敏捷性訓練 1. 果糖梯式訓練 – 4x1 @ 全力爆發 2. 單腳深蹲 – 3x10 @ 50% 1RM 3. 俯臥挺身 – 3x10 @ 60% 1RM 4. 仰臥起坐 – 3x15",
    "第4天 – 整體訓練 1. 倒立步行 – 4x1 @ 全力爆發 2. 雙腿跳躍 – 3x15 @ 50% 1RM 3. 田徑投擲 – 3x6 @ 60% 1RM 4. 垂直躍起 – 3x10 @ 60% 1RM",
    "第1天 – 力量訓練 1. 深蹲 跳 – 4x6 @ 全力爆發 2. 俯臥推舉 – 4x6 @ 全力爆發 3. 無器械肩頭推舉 – 3x8 @ 60% 1RM 4. 腹部滾輪 – 3x15 ",
    "第2天 – 速度訓練 1. 30 公尺衝刺 – 6x1 @ 全力爆發 2. 鴨步走 – 3x20 @ 50% 1RM 3. 高位引體向上 – 3x8 @ 60% 1RM 4. 自由槓上推 – 3x8 @ 60% 1RM",
    "第3天 – 敏捷性訓練 1. 果糖梯式訓練 – 4x1 @ 全力爆發 2. 單腳深蹲 – 3x10 @ 50% 1RM 3. 俯臥挺身 – 3x10 @ 60% 1RM 4. 仰臥起坐 – 3x15",
    "第4天 – 整體訓練 1. 倒立步行 – 4x1 @ 全力爆發 2. 雙腿跳躍 – 3x15 @ 50% 1RM 3. 田徑投擲 – 3x6 @ 60% 1RM 4. 垂直躍起 – 3x10 @ 60% 1RM",
  ]);
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);

  // takes input and sends an openai request to get suggestions for goals, generates three possible goals
  const makeSuggestions = async () => {
    console.log("makesuggestions function running");
    if (suggestions[0] === "") {
      console.log("if statement passed");
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
      const res = await fetch("/api/goal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });
      const data = await res.json();
      const suggestions = data.result
        .split(/\*\*\d+\.\s*/) // split by "1.", "2.", etc.
        .filter(Boolean) // remove any empty strings
        .map((str: string) => `**${str}`); // add **

      console.log(suggestions);
      setSuggestions(suggestions);
    }
  };

  // takes input and goals and sends an openai request to craft a suggested workout plan, generates an array of individual workout plans
  const makePlan = async () => {
    // if (workouts.length === 0) {
    //   try {
    //     // setLoading(true); // show spinner
    //     const res = await fetch("/api/plan", {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({ input, goal }),
    //     });
    //     const data = await res.json();
    //     console.log("Generated Plan:", data.plan);
    //     setWorkouts(
    //       data.plan
    //         .split("天")
    //         .slice(2)
    //         .map((w: string, index: number) => {
    //           let text = "第" + (index + 1) + "天" + w;
    //           // Trim everything after ### or ---
    //           if (text.includes("###")) {
    //             text = text.split("###")[0].trim();
    //           }
    //           if (text.includes("---")) {
    //             text = text.split("---")[0].trim();
    //           }
    //           return text.trim();
    //         })
    //     );
    //   } catch (err) {
    //     console.error("Failed to generate workout plan", err);
    //   } finally {
    //     // setLoading(false); // hide spinner
    //   }
    // }
  };
  return (
    <Box
      width="100vw"
      height={isMobile ? "90vh" : "100vh"}
      bgcolor={"#eb834c"}
      display="flex"
      justifyContent={"center"}
      alignItems={"center"}
      onKeyDown={(e) => {
        // enter logic per page to go to next step
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
              ) &&
              birthdate !== null &&
              birthdate.isValid()
            ) {
              setPage(page + 1);
            }
          }
          if (page === 1) {
            if (
              !(
                team === "" ||
                jersey === "" ||
                position === "" ||
                maxHeartRate === "" ||
                maxVelocity === ""
              )
            ) {
              setPage(page + 1);
            }
          }
          if (page === 2) {
            const isComplete = values.every((v) => v !== "");
            if (isComplete) {
              setPage(page + 1);
              makeSuggestions();
            }
          }
          if (page === 3) {
            if (goal) {
              setOnboarded(true);
              makePlan();
            }
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
        {/* after the user inputs information */}
        {onboarded ? (
          <Box
            width={"100%"}
            height={"100%"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"flex-start"}
            sx={{ position: "relative" }}
          >
            {/* Header */}
            <Box
              sx={{
                position: "sticky", // keeps it fixed when scrolling
                top: 0,
                left: 0,
                right: 0,
                zIndex: 10,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                bgcolor: "#c86424", // header background
                color: "#fff",
                px: 3,
                py: 1,
                boxShadow: "0px 2px 8px rgba(0,0,0,0.2)", // subtle shadow
              }}
            >
              {/* Edit button */}
              <Button
                onClick={() => {
                  setOnboarded(false);
                  setPage(0);
                  setEditing(true);
                }}
                variant="outlined"
                sx={{
                  color: "#fff",
                  borderColor: "#fff",
                  "&:hover": { bgcolor: "#333", borderColor: "#fff" },
                }}
              >
                Edit
              </Button>

              {/* User button */}
              <Button
                variant="outlined"
                sx={{
                  color: "#fff",
                  borderColor: "#fff",
                  "&:hover": { bgcolor: "#333", borderColor: "#fff" },
                }}
              >
                <AccountCircleIcon />
              </Button>
            </Box>
            <Box
              width="100%"
              height="100%"
              display="flex"
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
            >
              {/* Logo / Title */}
              <Box
                width="100%"
                display="flex"
                justifyContent="center"
                padding={2}
              >
                <Box
                  component="img"
                  src="/logo_white.png"
                  alt="AXCEL Logo"
                  sx={{
                    color: "white",
                    height: 40, // adjust height
                    width: "auto", // maintain aspect ratio
                  }}
                />
              </Box>
              {workouts.length === 0 ? (
                <Stack
                  display="flex"
                  flexDirection={"column"}
                  alignItems="center"
                  justifyContent="center"
                  spacing={2}
                  height="300px"
                >
                  <Typography>正在為您指定訓練課程規劃...</Typography>
                  <CircularProgress />
                </Stack>
              ) : (
                // <Grid
                //   container
                //   maxHeight="400px"
                //   sx={{
                //     // marginTop: 16,
                //     p: 2,
                //     overflowY: "scroll",
                //     display: "grid", // ✅ turn into a CSS grid
                //     gridTemplateColumns:
                //       "repeat(auto-fill, minmax(300px, 1fr))", // ✅ dynamic columns
                //     gap: 4, // ✅ space between boxes
                //   }}
                // >
                <Stack
                  width="100%"
                  height="275px"
                  direction="row" // ✅ enforce horizontal flow
                  justifyContent={"flex-start"}
                  alignItems="center"
                  gap={2}
                  sx={{
                    overflowX: "auto", // ✅ horizontal scroll
                    overflowY: "hidden", // ✅ prevent vertical scroll
                    flexWrap: "nowrap", // ✅ prevent wrapping to new lines
                    padding: 1, // ✅ optional spacing inside scroll area
                    scrollSnapType: "x mandatory", // ✅ optional for snap scrolling
                  }}
                >
                  {workouts.map((item, index) => (
                    <Box
                      key={index}
                      onClick={() => setSelectedWorkout(item)} // ✅ make box clickable
                      sx={{
                        width: "250px", // ✅ fixed box width for scroll
                        height: "250px",
                        flex: "0 0 auto", // ✅ prevent resizing
                        backgroundColor: "#f9f9f9",
                        borderRadius: "4px",
                        boxShadow: 3,
                        padding: 3,
                        cursor: "pointer", // ✅ clickable indicator
                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                        overflow: "hidden",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: 5,
                        },
                      }}
                    >
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                          whiteSpace: "pre-wrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 8,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {item}
                      </Typography>
                    </Box>
                  ))}
                </Stack>

                // </Grid>
              )}

              {/* 🖼️ Modal for Workout Details */}
              <Dialog
                open={selectedWorkout !== null}
                onClose={() => setSelectedWorkout(null)}
                fullWidth
                maxWidth="md"
                slotProps={{
                  paper: {
                    sx: {
                      borderRadius: "20px",
                      height: "90vh", // ✅ almost fullscreen height
                    },
                  },
                }}
              >
                <DialogTitle
                  sx={{
                    fontSize: "1.8rem",
                    fontWeight: 700,
                    backgroundColor: "#1976d2", // ✅ primary color header
                    color: "white",
                    textAlign: "center",
                    py: 2,
                  }}
                >
                  🏋️‍♂️ 訓練課程詳情
                </DialogTitle>

                <DialogContent
                  sx={{
                    padding: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <Typography
                    sx={{
                      whiteSpace: "pre-wrap",
                      fontSize: "1.2rem",
                      lineHeight: 1.6,
                      color: "#333",
                    }}
                  >
                    {selectedWorkout}
                  </Typography>
                </DialogContent>

                <DialogActions
                  sx={{
                    justifyContent: "center",
                    paddingBottom: 2,
                  }}
                >
                  <Button
                    onClick={() => setSelectedWorkout(null)}
                    variant="contained"
                    size="large"
                    sx={{
                      borderRadius: "999px",
                      px: 5,
                      py: 1,
                      textTransform: "none",
                      fontSize: "1rem",
                    }}
                  >
                    结束
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Box>
        ) : (
          // onboarding page for user to input info
          <Box
            width="600px"
            height="75%"
            display="flex"
            flexDirection="column"
            sx={{
              bgcolor: "white",
              borderRadius: "16px",
              p: 3,
              boxShadow: 3,
              position: "relative",
            }}
          >
            {/* Logo  */}
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Box
                component="img"
                src="/logo.png"
                alt="AXCEL Logo"
                sx={{
                  height: 50,
                  width: "auto",
                  // cursor: "pointer",
                }}
              />
            </Box>
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
                <Box
                  width="100%"
                  height="80%"
                  sx={{
                    overflowY: "auto",
                    pr: 1,
                    position: "relative",
                  }}
                >
                  <Typography
                    sx={{
                      color: "black",
                      fontWeight: "500",
                      fontSize: "1.4rem",
                      // marginBottom: 2,
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
                            borderColor: "#1976d2", // strong border on focus
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
                          if (
                            value.slice(-1) === "." &&
                            !isNaN(parseFloat(value.slice(0, -1))) &&
                            !value.slice(0, -1).includes(".")
                          ) {
                            setHeightCM(
                              String(parseFloat(value.slice(0, -1)) + ".")
                            );
                          } else if (parseFloat(value)) {
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
                              borderColor: "#1976d2", // strong border on focus
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
                                borderColor: "#1976d2", // strong border on focus
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
                            if (
                              value.slice(-1) === "." &&
                              !isNaN(parseFloat(value.slice(0, -1))) &&
                              !value.slice(0, -1).includes(".")
                            ) {
                              setHeightIN(
                                String(parseFloat(value.slice(0, -1)) + ".")
                              );
                            } else if (parseFloat(value)) {
                              setHeightIN(String(parseFloat(value)));
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
                                borderColor: "#1976d2", // strong border on focus
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
                          if (
                            value.slice(-1) === "." &&
                            !isNaN(parseFloat(value.slice(0, -1))) &&
                            !value.slice(0, -1).includes(".")
                          ) {
                            setWeightKG(
                              String(parseFloat(value.slice(0, -1)) + ".")
                            );
                          } else if (parseFloat(value)) {
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
                              borderColor: "#1976d2", // strong border on focus
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
                          if (
                            value.slice(-1) === "." &&
                            !isNaN(parseFloat(value.slice(0, -1))) &&
                            !value.slice(0, -1).includes(".")
                          ) {
                            setWeightLB(
                              String(parseFloat(value.slice(0, -1)) + ".")
                            );
                          } else if (parseFloat(value)) {
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
                              borderColor: "#1976d2", // strong border on focus
                            },
                          },
                        }}
                      />
                    )}
                  </Box>
                  {/* birthdate */}
                  <Box sx={{ p: 1 }}>
                    <Typography
                      sx={{ color: "black", fontWeight: "600", fontSize: "1" }}
                    >
                      出生日期
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        // label="出生日期"
                        value={birthdate}
                        onChange={setBirthdate}
                        maxDate={dayjs()}
                        disableFuture
                        sx={{
                          width: "100%",
                        }}
                        slotProps={{
                          textField: {
                            // size: "small",
                            InputProps: {
                              sx: {
                                borderRadius: "12px",
                                backgroundColor: "#fafafa",
                              },
                            },
                          },
                        }}
                      />
                    </LocalizationProvider>
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
                    (weightUnit === "lbs" && weightLB === "") ||
                    birthdate === null ||
                    (birthdate !== null && !birthdate.isValid())
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
                  height="80%"
                  sx={{
                    overflowY: "auto",
                    pr: 1,
                    position: "relative",
                  }}
                >
                  {/* team */}
                  <Box sx={{ p: 1 }}>
                    <Typography
                      sx={{ color: "black", fontWeight: "600", fontSize: "1" }}
                    >
                      球队
                    </Typography>
                    <TextField
                      variant="outlined"
                      placeholder="輸入球队"
                      value={team}
                      onChange={(e) => setTeam(e.target.value)}
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
                            borderColor: "#1976d2", // strong border on focus
                          },
                        },
                      }}
                    />
                  </Box>
                  {/* jersey */}
                  <Box sx={{ p: 1 }}>
                    <Typography
                      sx={{ color: "black", fontWeight: "600", fontSize: "1" }}
                    >
                      球号
                    </Typography>
                    <TextField
                      variant="outlined"
                      placeholder="輸入球号"
                      value={jersey}
                      onChange={(e) => setJersey(e.target.value)}
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
                            borderColor: "#1976d2", // strong border on focus
                          },
                        },
                      }}
                    />
                  </Box>
                  {/* position */}
                  <Box sx={{ p: 1 }}>
                    <Typography
                      sx={{ color: "black", fontWeight: "600", fontSize: "1" }}
                    >
                      球位
                    </Typography>
                    <TextField
                      variant="outlined"
                      placeholder="輸入球位"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
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
                            borderColor: "#1976d2", // strong border on focus
                          },
                        },
                      }}
                    />
                  </Box>
                  {/* max hr */}
                  <Box sx={{ p: 1 }}>
                    <Typography
                      sx={{ color: "black", fontWeight: "600", fontSize: "1" }}
                    >
                      最高心跳
                    </Typography>
                    <TextField
                      variant="outlined"
                      placeholder="輸入最高心跳"
                      value={maxHeartRate || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (parseFloat(value)) {
                          setMaxHeartRate(String(parseFloat(value)));
                        } else {
                          setMaxHeartRate("");
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
                            borderColor: "#1976d2", // strong border on focus
                          },
                        },
                      }}
                    />
                  </Box>
                  {/* max vel */}
                  <Box sx={{ p: 1 }}>
                    <Typography
                      sx={{ color: "black", fontWeight: "600", fontSize: "1" }}
                    >
                      最快速度
                    </Typography>
                    <TextField
                      variant="outlined"
                      placeholder="輸入最快速度"
                      value={maxVelocity}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (
                          value.slice(-1) === "." &&
                          !isNaN(parseFloat(value.slice(0, -1))) &&
                          !value.slice(0, -1).includes(".")
                        ) {
                          setMaxVelocity(
                            String(parseFloat(value.slice(0, -1)) + ".")
                          );
                        } else if (parseFloat(value)) {
                          setMaxVelocity(String(parseFloat(value)));
                        } else {
                          setMaxVelocity("");
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
                            borderColor: "#1976d2", // strong border on focus
                          },
                        },
                      }}
                    />
                  </Box>
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
                  onClick={() => setPage(page + 1)}
                  disabled={
                    team === "" ||
                    jersey === "" ||
                    position === "" ||
                    maxHeartRate === "" ||
                    maxVelocity === ""
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
            {page === 2 && (
              <>
                <Box
                  width="100%"
                  height="80%"
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
                              borderColor: "#1976d2",
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
            {page === 3 && (
              <>
                <Box
                  width="100%"
                  height="75%"
                  display="flex"
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  flexDirection={"column"}
                  // gap={2}
                  sx={{
                    overflowY: "auto",
                    pr: 1,
                    position: "relative",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "2.5rem", fontWeight: 700, color: "black" }}
                  >
                    目標設定
                  </Typography>
                  <Stack width="100%" height="100%">
                    {suggestions[0] !== "" && (
                      <Stack
                        width="100%" // ✅ make it responsive
                        // maxWidth="500px" // ✅ optional: cap width on larger screens
                        direction="row"
                        // spacing={1}
                        paddingY={2}
                        justifyContent="space-between" // Align items to the start for horizontal scroll
                        alignItems="center"
                        flexWrap="nowrap" // Prevent wrapping
                        sx={{
                          // width: isMobile ? '100%' : '92.5%',
                          backgroundColor: "background.paper",
                          gap: 2,
                          // overflowX: "auto", // Enable horizontal scrolling
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
                          <Box
                            key={index}
                            onClick={() => {
                              setGoal(suggestion);
                            }}
                            sx={{
                              backgroundColor: "#f5f5f5", // light background
                              width: "100%",
                              height: "200px",
                              cursor: "pointer",
                              borderRadius: "12px", // smoother rounded corners
                              overflow: "auto", // auto-scroll if content overflows
                              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // subtle shadow
                              transition: "all 0.3s ease", // smooth hover effects
                              "&:hover": {
                                backgroundColor: "#e0e0e0", // light hover effect
                                boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)", // stronger shadow on hover
                                transform: "scale(1.02)", // slight grow
                              },
                              p: 2, // consistent inner padding
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "flex-start",
                            }}
                          >
                            <ReactMarkdown
                              components={{
                                p: ({ node, ...props }) => (
                                  <Typography
                                    sx={{
                                      color: "#444", // body text color
                                      fontSize: "0.95rem",
                                      lineHeight: 1.6,
                                      mb: 1,
                                      whiteSpace: "pre-wrap", // ✅ preserve line breaks + spaces
                                    }}
                                    {...props}
                                  />
                                ),
                                li: ({ node, ...props }) => (
                                  <li
                                    style={{
                                      marginBottom: "0.5rem",
                                      color: "#555", // muted list color
                                      whiteSpace: "pre-wrap", // ✅ preserve line breaks
                                    }}
                                    {...props}
                                  />
                                ),
                                strong: ({ node, ...props }) => (
                                  <Typography
                                    component="span"
                                    sx={{
                                      color: "#111", // darker bold text
                                      fontWeight: "bold",
                                      whiteSpace: "pre-wrap", // ✅ preserve spacing for bold too
                                    }}
                                    {...props}
                                  />
                                ),
                              }}
                            >
                              {suggestion}
                            </ReactMarkdown>
                          </Box>
                        ))}
                      </Stack>
                    )}
                    {suggestions[0] === "" && (
                      <Box
                        width="100%"
                        display="flex"
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <Stack
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          justifyContent="center"
                          spacing={2}
                          height={"200px"}
                        >
                          <Typography sx={{ color: "black" }}>
                            正在為您建立目標...
                          </Typography>
                          <CircularProgress />
                        </Stack>
                      </Box>
                    )}
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
                            borderColor: "#1976d2", // strong border on focus
                          },
                        },
                      }}
                    />
                  </Stack>
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
                    setOnboarded(true), makePlan();
                  }}
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
