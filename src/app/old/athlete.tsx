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
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useState } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ReactMarkdown, { type Components } from "react-markdown";
import type React from "react";
import { t, type Lang } from "@/i18n/translations";

const boxColors = ["#7badaf", "#f8ce7e", "#7eb1eb", "#aa6b87", "#e57974"];

type AthleteProps = {
  lang: Lang; // e.g. "en" | "zh-TW"
};

/** ---------- helpers (no `any`) ---------- */
const hasTrailingSingleDot = (s: string): boolean =>
  s.endsWith(".") && s.slice(0, -1).length > 0 && !s.slice(0, -1).includes(".");

const toInt = (s: string): number | null => {
  const n = Number.parseInt(s, 10);
  return Number.isNaN(n) ? null : n;
};

const toFloat = (s: string): number | null => {
  const n = Number.parseFloat(s);
  return Number.isNaN(n) ? null : n;
};

/** ---------- markdown components (typed) ---------- */
const mdComponents: Components = {
  p: ({ children }) => (
    <Typography
      sx={{
        color: "#444",
        fontSize: "0.95rem",
        lineHeight: 1.6,
        mb: 1,
        whiteSpace: "pre-wrap",
      }}
    >
      {children as React.ReactNode}
    </Typography>
  ),
  li: ({ children }) => (
    <li
      style={{
        marginBottom: "0.5rem",
        color: "#555",
        whiteSpace: "pre-wrap",
      }}
    >
      {children as React.ReactNode}
    </li>
  ),
  strong: ({ children }) => (
    <Typography
      component="span"
      sx={{ color: "#111", fontWeight: "bold", whiteSpace: "pre-wrap" }}
    >
      {children as React.ReactNode}
    </Typography>
  ),
};

export default function Athlete({ lang }: AthleteProps) {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  const tr = t(lang);

  const [onboarded, setOnboarded] = useState(false);
  const [page, setPage] = useState(0);
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [heightCM, setHeightCM] = useState("");
  const [heightFT, setHeightFT] = useState("");
  const [heightIN, setHeightIN] = useState("");
  const [heightUnit, setHeightUnit] = useState<"cm" | "ft/in">("cm");
  const [weightKG, setWeightKG] = useState("");
  const [weightLB, setWeightLB] = useState("");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");
  const [birthdate, setBirthdate] = useState<Dayjs | null>(null);
  const [team, setTeam] = useState("Lakers");
  const [jersey, setJersey] = useState("23");
  const [position, setPosition] = useState("PF");
  const [maxHeartRate, setMaxHeartRate] = useState("100");
  const [maxVelocity, setMaxVelocity] = useState("20");
  const [goal, setGoal] = useState("");

  // Page-2 labels
  const labels = Array.from({ length: 9 }, (_, i) => tr(`labels.${i + 1}`));

  const [values, setValues] = useState<string[]>([
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

  const [suggestions, setSuggestions] = useState<string[]>([
    `**[力量增強挑戰]**- **目標**: 提升全身力量，特別是下肢以提升跳躍與衝刺表現。- **原因**: 基於你的測試結果-垂直跳52cm與30公尺衝刺4.3秒與40公尺衝刺5.8秒表現，指出你的下肢力量還有上升的空間。此外，深蹲的1RM（一次最大重量）110kg與身高體重比例相較尚處於中等程度，故有加強的需要。- **重點**:  - 針對腿部力量的訓練，包含深蹲、腿舉等重量訓練，並逐步增加重量負荷以挑戰自我。  - 發展肌肉耐力是提升1RM的有效手段，如將重訓組數調整到3-4組，每組12-15次，讓肌肉適應後再調整到較重的重量，6-8次/組。  - 飲食上要保證足夠的蛋白質攝取，幫助肌肉恢復與成長。`,
    `**[速度魔咒突破]**- **目標**: 進一步提升衝刺速度與靈活度。- **原因**: 根據你的測試結果-30公尺衝刺4.3秒與40公尺衝刺5.8秒展現出你在短距離的速度表現已經很好，但仍能進一步提升。- **重點**:  - 重新設計你的跑步訓練計畫，包括間歇訓練、爆發力訓練與耐力訓練，使你的肌肉和神經系統適應更高的速度。  - 透過仿真訓練，模仿實戰中需要高速跑動的情況，提升你的應變能力與移動敏捷性。  - 確保適當的碳水化合物攝取，為你的訓練與恢復提供足夠的能量。`,
    `**[體能能量爆發]**- **目標**: 提升體能耐力並壓縮折返跑時間。- **原因**: 你的Yo-Yo Test Level 17.1 (~1800m)和折返跑8.5秒的測試結果顯示，你的耐力與爆發力均有出色的表現，但進一步的提升可以將你的全面體能拉到更高的層次。- **重點**:  - 多元化你的有氧訓練，如游泳、自行車、慢跑等，提高你的心肺功能並提高你的耐力。  - 加強核心肌群訓練，如俯臥撐、仰臥起坐、橋式運動等，進一步提升你的爆發力和速度。  - 飲食上要攝取足夠且均衡`,
  ]);

  const [input, setInput] = useState("");
  const [workouts, setWorkouts] = useState<string[]>([
    "第1天 – 力量訓練\n1. 深蹲 – 4x12 @ 60% 1RM\n2. 腿舉 – 4x12 @ 60% 1RM\n3. 30公尺衝刺 – 4x全力爆發\n4. 自身重量伏地挺身 – 5x15",
    "第2天 – 耐力訓練\n1. 站立式跳躍 – 4x15\n2. 單腿深蹲 – 4x12 @ 自身重量\n3. 40公尺衝刺 – 4x全力爆發\n4. 核心訓練（如捲腹）– 4x15",
    "第3天 – 力量訓練\n1. 深蹲 – 3x8 @ 70% 1RM\n2. 腿舉 – 3x8 @ 70% 1RM\n3. 30公尺衝刺 – 3x全力爆發\n4. 腕力",
    "第4天 – 力量訓練\n1. 深蹲 – 3x8 @ 70% 1RM\n2. 腿舉 – 3x8 @ 70% 1RM\n3. 30公尺衝刺 – 3x全力爆發\n4. 腕力",
  ]);
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);

  const [deviceID, setDeviceID] = useState("");
  const [tempID, setTempID] = useState("");

  // Generate goal suggestions
  const makeSuggestions = async () => {
    if (suggestions[0] !== "") return;

    let body = "";
    const height =
      heightUnit === "cm"
        ? `${heightCM} ${heightUnit}`
        : `${heightFT}, ${heightIN} ${heightUnit}`;
    const weight =
      weightUnit === "kg"
        ? `${weightKG} ${weightUnit}`
        : `${weightLB} ${weightUnit}`;
    body += `${tr("onboard.height")}：${height}\n`;
    body += `${tr("onboard.weight")}：${weight}\n`;
    body += `${tr("onboard.testResults")}\n`;
    for (let i = 0; i < labels.length; i++) {
      body += labels[i] + values[i] + "\n";
    }
    setInput(body);

    const res = await fetch("/api/goal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: body }),
    });
    const data: { result: string } = await res.json();
    const sgs = data.result
      .split(/\*\*\d+\.\s*/)
      .filter(Boolean)
      .map((str) => `**${str}`);
    setSuggestions(sgs);
  };

  // Generate workout plan
  const makePlan = async () => {
    if (workouts.length > 0) return;

    const res = await fetch("/api/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input, goal }),
    });
    const data: { plan: string } = await res.json();
    const days = data.plan
      .split("天")
      .slice(2)
      .map((w, index) => {
        let text = `第${index + 1}天${w}`;
        if (text.includes("###")) text = text.split("###")[0].trim();
        if (text.includes("---")) text = text.split("---")[0].trim();
        if (text.includes("\n\n")) text = text.split("\n\n")[0].trim();
        return text.trim();
      });

    setWorkouts(days);
  };

  const handleDeviceID = (temp: string) => {
    setDeviceID(temp);
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      bgcolor="#eb834c"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ overflow: "hidden" }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          if (page === 0) {
            if (
              firstName !== "" &&
              lastName !== "" &&
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
              setPage(1);
            }
          } else if (page === 1) {
            if (
              !(
                team === "" ||
                jersey === "" ||
                position === "" ||
                maxHeartRate === "" ||
                maxVelocity === ""
              )
            ) {
              setPage(2);
            }
          } else if (page === 2) {
            const isComplete = values.every((v) => v !== "");
            if (isComplete) {
              setPage(3);
              makeSuggestions();
            }
          } else if (page === 3) {
            if (goal) {
              setOnboarded(true);
              makePlan();
            }
          }
        }
        if (e.key === "Escape" && editing) {
          e.preventDefault();
          setOnboarded(true);
        }
      }}
      tabIndex={0}
    >
      {/* After onboarding */}
      {onboarded ? (
        <Box
          width="100%"
          height="100%"
          bgcolor="#eb834c"
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          sx={{ position: "relative" }}
        >
          {/* Header */}
          <Box
            sx={{
              position: "sticky",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 10,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: "#c86424",
              color: "#fff",
              px: 3,
              py: 1,
              boxShadow: "0px 2px 8px rgba(0,0,0,0.2)",
            }}
          >
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
              {tr("common.edit")}
            </Button>

            <Button
              variant="outlined"
              sx={{
                color: "#fff",
                borderColor: "#fff",
                "&:hover": { bgcolor: "#333", borderColor: "#fff" },
              }}
              aria-label={tr("common.user")}
            >
              <AccountCircleIcon />
            </Button>
          </Box>

          {/* Body */}
          <Box
            width="100%"
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            {/* Logo */}
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
                sx={{ height: 40, width: "auto" }}
              />
            </Box>

            {workouts.length === 0 ? (
              <Stack
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                spacing={2}
              >
                <Typography>{tr("loading.makingPlan")}</Typography>
                <CircularProgress />
              </Stack>
            ) : (
              <Stack
                width="100%"
                maxHeight={isMobile ? "90vh" : "auto"}
                direction={isMobile ? "column" : "row"}
                justifyContent={isMobile ? "flex-start" : "center"}
                alignItems={
                  isMobile
                    ? "center"
                    : workouts.length < 5
                    ? "center"
                    : "flex-start"
                }
                gap={2}
                sx={{
                  overflow: "auto",
                  flexWrap: "nowrap",
                  p: 1,
                  mb: "10vh",
                }}
              >
                {workouts.map((item, index) => (
                  <Box
                    key={index}
                    onClick={() => setSelectedWorkout(item)}
                    sx={{
                      width: "300px",
                      height: "300px",
                      flex: "0 0 auto",
                      backgroundColor: boxColors[index % boxColors.length],
                      borderRadius: "4px",
                      boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
                      p: 2,
                      cursor: "pointer",
                      position: "relative",
                      overflow: "hidden",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                      },
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="white"
                      sx={{
                        position: "absolute",
                        bottom: 16,
                        left: 16,
                        fontWeight: 600,
                        p: "4px 8px",
                        fontSize: "1.5rem",
                        maxWidth: "90%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.split("\n")[0]}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            )}

            {/* Workout Details */}
            <Dialog
              open={selectedWorkout !== null}
              onClose={() => setSelectedWorkout(null)}
              fullScreen
              slotProps={{
                transition: { timeout: 500 },
                paper: {
                  sx: {
                    backgroundColor: "#000",
                    color: "#fff",
                    width: "100vw",
                    height: "100vh",
                  },
                },
              }}
            >
              {deviceID === "" && (
                <DialogContent
                  sx={{
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#121212",
                    borderRadius: "12px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1.5rem",
                      fontWeight: 600,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    {tr("sensor.title")}
                  </Typography>
                  <Stack display="flex" flexDirection="row" gap={2}>
                    <TextField
                      variant="outlined"
                      value={tempID}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value.trim();
                        const n = toInt(value);
                        setTempID(n !== null ? String(n) : "");
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "white",
                          "& fieldset": { borderColor: "white" },
                          "&:hover fieldset": { borderColor: "#90caf9" },
                          "&.Mui-focused fieldset": { borderColor: "#90caf9" },
                        },
                        input: { color: "white" },
                      }}
                    />
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => handleDeviceID(tempID)}
                      sx={{
                        fontWeight: "bold",
                        px: 4,
                        py: 1.5,
                        textTransform: "none",
                        fontSize: "1.1rem",
                        bgcolor: "#fff",
                        color: "#000",
                        "&:hover": { bgcolor: "#333", color: "#fff" },
                      }}
                    >
                      {tr("common.input")}
                    </Button>
                  </Stack>
                </DialogContent>
              )}

              {deviceID !== "" && (
                <DialogContent
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <Stack
                    display="flex"
                    flexDirection={isMobile ? "column" : "row"}
                  >
                    <Box width={isMobile ? "100%" : "50%"} p={5}>
                      <Typography
                        sx={{
                          whiteSpace: "pre-wrap",
                          fontSize: "1.5rem",
                          lineHeight: 2.5,
                        }}
                      >
                        {selectedWorkout}
                      </Typography>
                    </Box>
                    <Box width={isMobile ? "100%" : "50%"} p={5}>
                      <Typography sx={{ fontSize: "1.5rem", lineHeight: 2.5 }}>
                        {tr("sensor.data")}
                      </Typography>
                    </Box>
                  </Stack>
                </DialogContent>
              )}

              <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
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
                  {tr("common.close")}
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Box>
      ) : (
        // Onboarding flow
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
          {/* Logo */}
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
              sx={{ height: 50, width: "auto" }}
            />
          </Box>

          {/* Close when editing */}
          {editing && (
            <Button
              onClick={() => setOnboarded(true)}
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                minWidth: "32px",
                height: "32px",
                p: 0,
                borderRadius: "50%",
                color: "#333",
                fontWeight: "bold",
                fontSize: "1.1rem",
                lineHeight: 1,
                "&:hover": { backgroundColor: "#e0e0e0", borderColor: "#999" },
                zIndex: 10,
              }}
              disabled={
                firstName === "" ||
                lastName === "" ||
                (heightUnit === "cm" && heightCM === "") ||
                (heightUnit === "ft/in" &&
                  (heightFT === "" || heightIN === "")) ||
                (weightUnit === "kg" && weightKG === "") ||
                (weightUnit === "lbs" && weightLB === "") ||
                birthdate === null ||
                (birthdate !== null && !birthdate.isValid()) ||
                team === "" ||
                jersey === "" ||
                position === "" ||
                maxHeartRate === "" ||
                maxVelocity === "" ||
                !values.every((v) => v !== "") ||
                goal === ""
              }
            >
              ×
            </Button>
          )}

          {/* Page 0 */}
          {page === 0 && (
            <>
              <Box
                width="100%"
                height="80%"
                sx={{ overflowY: "auto", pr: 1, position: "relative" }}
              >
                <Typography
                  sx={{ color: "black", fontWeight: 500, fontSize: "1.4rem" }}
                >
                  {tr("onboard.hello")}
                </Typography>

                {/* Name */}
                <Box sx={{ p: 1 }}>
                  <Typography
                    sx={{ color: "black", fontWeight: 600, fontSize: "1" }}
                  >
                    {tr("onboard.name")}
                  </Typography>
                  <Stack display="flex" flexDirection="row">
                    <TextField
                      variant="outlined"
                      placeholder={tr("onboard.placeholder.lastName")}
                      value={lastName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setLastName(e.target.value)
                      }
                      sx={{
                        width: "100%",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          backgroundColor: "#fafafa",
                          "& fieldset": { borderColor: "#ddd" },
                          "&:hover fieldset": { borderColor: "#aaa" },
                          "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                        },
                      }}
                    />
                    <TextField
                      variant="outlined"
                      placeholder={tr("onboard.placeholder.firstName")}
                      value={firstName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFirstName(e.target.value)
                      }
                      sx={{
                        width: "100%",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          backgroundColor: "#fafafa",
                          "& fieldset": { borderColor: "#ddd" },
                          "&:hover fieldset": { borderColor: "#aaa" },
                          "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                        },
                      }}
                    />
                  </Stack>
                </Box>

                {/* Height */}
                <Box sx={{ p: 1 }}>
                  <Stack
                    display="flex"
                    flexDirection="row"
                    sx={{ gap: 0.5, mb: 1 }}
                    alignItems="center"
                  >
                    <Typography
                      sx={{ color: "black", fontWeight: 600, fontSize: "1" }}
                    >
                      {tr("onboard.height")}
                    </Typography>
                    <ToggleButtonGroup
                      size="small"
                      exclusive
                      value={heightUnit}
                      onChange={(_, newValue) => {
                        if (newValue !== null) {
                          if (newValue === "ft/in") {
                            setHeightFT(
                              heightCM
                                ? String(
                                    Math.floor(
                                      Number.parseFloat(heightCM) / 2.54 / 12
                                    )
                                  )
                                : ""
                            );
                            setHeightIN(
                              heightCM
                                ? String(
                                    (
                                      (Number.parseFloat(heightCM) / 2.54) %
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
                                      (Number.parseInt(heightFT, 10) * 12 +
                                        Number.parseFloat(heightIN)) *
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
                          p: "4px 8px",
                          fontSize: "0.75rem",
                          minWidth: "40px",
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
                      placeholder={tr("onboard.placeholder.heightCm")}
                      value={heightCM || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value;
                        if (hasTrailingSingleDot(value)) {
                          setHeightCM(
                            `${Number.parseFloat(value.slice(0, -1))}.`
                          );
                          return;
                        }
                        const n = toFloat(value);
                        setHeightCM(n !== null ? String(n) : "");
                      }}
                      sx={{
                        width: "100%",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          backgroundColor: "#fafafa",
                          "& fieldset": { borderColor: "#ddd" },
                          "&:hover fieldset": { borderColor: "#aaa" },
                          "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                        },
                      }}
                    />
                  )}

                  {heightUnit === "ft/in" && (
                    <Stack display="flex" flexDirection="row">
                      <TextField
                        variant="outlined"
                        placeholder={tr("onboard.placeholder.heightFt")}
                        value={heightFT || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const n = toInt(e.target.value);
                          setHeightFT(n !== null ? String(n) : "");
                        }}
                        sx={{
                          width: "100%",
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            backgroundColor: "#fafafa",
                            "& fieldset": { borderColor: "#ddd" },
                            "&:hover fieldset": { borderColor: "#aaa" },
                            "&.Mui-focused fieldset": {
                              borderColor: "#1976d2",
                            },
                          },
                        }}
                      />
                      <TextField
                        variant="outlined"
                        placeholder={tr("onboard.placeholder.heightIn")}
                        value={heightIN || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const value = e.target.value;
                          if (hasTrailingSingleDot(value)) {
                            setHeightIN(
                              `${Number.parseFloat(value.slice(0, -1))}.`
                            );
                            return;
                          }
                          const n = toFloat(value);
                          setHeightIN(n !== null ? String(n) : "");
                        }}
                        sx={{
                          width: "100%",
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            backgroundColor: "#fafafa",
                            "& fieldset": { borderColor: "#ddd" },
                            "&:hover fieldset": { borderColor: "#aaa" },
                            "&.Mui-focused fieldset": {
                              borderColor: "#1976d2",
                            },
                          },
                        }}
                      />
                    </Stack>
                  )}
                </Box>

                {/* Weight */}
                <Box sx={{ p: 1 }}>
                  <Stack
                    display="flex"
                    flexDirection="row"
                    sx={{ gap: 0.5, mb: 1 }}
                    alignItems="center"
                  >
                    <Typography
                      sx={{ color: "black", fontWeight: 600, fontSize: "1" }}
                    >
                      {tr("onboard.weight")}
                    </Typography>
                    <ToggleButtonGroup
                      size="small"
                      exclusive
                      value={weightUnit}
                      onChange={(_, newValue) => {
                        if (newValue !== null) {
                          if (newValue === "lbs") {
                            setWeightLB(
                              weightKG
                                ? String(
                                    (Number.parseFloat(weightKG) * 2.2).toFixed(
                                      2
                                    )
                                  )
                                : ""
                            );
                          } else {
                            setWeightKG(
                              weightLB
                                ? String(
                                    (Number.parseFloat(weightLB) / 2.2).toFixed(
                                      2
                                    )
                                  )
                                : ""
                            );
                          }
                          setWeightUnit(newValue);
                        }
                      }}
                      sx={{
                        "& .MuiToggleButton-root": {
                          p: "4px 8px",
                          fontSize: "0.75rem",
                          minWidth: "40px",
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
                      placeholder={tr("onboard.placeholder.weightKg")}
                      value={weightKG || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value;
                        if (hasTrailingSingleDot(value)) {
                          setWeightKG(
                            `${Number.parseFloat(value.slice(0, -1))}.`
                          );
                          return;
                        }
                        const n = toFloat(value);
                        setWeightKG(n !== null ? String(n) : "");
                      }}
                      sx={{
                        width: "100%",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          backgroundColor: "#fafafa",
                          "& fieldset": { borderColor: "#ddd" },
                          "&:hover fieldset": { borderColor: "#aaa" },
                          "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                        },
                      }}
                    />
                  )}

                  {weightUnit === "lbs" && (
                    <TextField
                      variant="outlined"
                      placeholder={tr("onboard.placeholder.weightLb")}
                      value={weightLB || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value;
                        if (hasTrailingSingleDot(value)) {
                          setWeightLB(
                            `${Number.parseFloat(value.slice(0, -1))}.`
                          );
                          return;
                        }
                        const n = toFloat(value);
                        setWeightLB(n !== null ? String(n) : "");
                      }}
                      sx={{
                        width: "100%",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          backgroundColor: "#fafafa",
                          "& fieldset": { borderColor: "#ddd" },
                          "&:hover fieldset": { borderColor: "#aaa" },
                          "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                        },
                      }}
                    />
                  )}
                </Box>

                {/* Birthdate */}
                <Box sx={{ p: 1 }}>
                  <Typography
                    sx={{ color: "black", fontWeight: 600, fontSize: "1" }}
                  >
                    {tr("onboard.birthdate")}
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={birthdate}
                      onChange={(v: Dayjs | null) => setBirthdate(v)}
                      maxDate={dayjs()}
                      disableFuture
                      sx={{ width: "100%" }}
                      slotProps={{
                        textField: {
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
                onClick={() => setPage(1)}
                disabled={
                  firstName === "" ||
                  lastName === "" ||
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
                  "&.Mui-disabled": { bgcolor: "#ccc", color: "#888" },
                }}
              >
                {tr("common.next")}
              </Button>
            </>
          )}

          {/* Page 1 */}
          {page === 1 && (
            <>
              <Box
                width="100%"
                height="80%"
                sx={{ overflowY: "auto", pr: 1, position: "relative" }}
              >
                <Box sx={{ p: 1 }}>
                  <Typography
                    sx={{ color: "black", fontWeight: 600, fontSize: "1" }}
                  >
                    {tr("onboard.team")}
                  </Typography>
                  <TextField
                    variant="outlined"
                    placeholder={tr("onboard.placeholder.team")}
                    value={team}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setTeam(e.target.value)
                    }
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        backgroundColor: "#fafafa",
                        "& fieldset": { borderColor: "#ddd" },
                        "&:hover fieldset": { borderColor: "#aaa" },
                        "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                      },
                    }}
                  />
                </Box>

                <Box sx={{ p: 1 }}>
                  <Typography
                    sx={{ color: "black", fontWeight: 600, fontSize: "1" }}
                  >
                    {tr("onboard.jersey")}
                  </Typography>
                  <TextField
                    variant="outlined"
                    placeholder={tr("onboard.placeholder.jersey")}
                    value={jersey}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setJersey(e.target.value)
                    }
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        backgroundColor: "#fafafa",
                        "& fieldset": { borderColor: "#ddd" },
                        "&:hover fieldset": { borderColor: "#aaa" },
                        "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                      },
                    }}
                  />
                </Box>

                <Box sx={{ p: 1 }}>
                  <Typography
                    sx={{ color: "black", fontWeight: 600, fontSize: "1" }}
                  >
                    {tr("onboard.position")}
                  </Typography>
                  <TextField
                    variant="outlined"
                    placeholder={tr("onboard.placeholder.position")}
                    value={position}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPosition(e.target.value)
                    }
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        backgroundColor: "#fafafa",
                        "& fieldset": { borderColor: "#ddd" },
                        "&:hover fieldset": { borderColor: "#aaa" },
                        "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                      },
                    }}
                  />
                </Box>

                <Box sx={{ p: 1 }}>
                  <Typography
                    sx={{ color: "black", fontWeight: 600, fontSize: "1" }}
                  >
                    {tr("onboard.maxHR")}
                  </Typography>
                  <TextField
                    variant="outlined"
                    placeholder={tr("onboard.placeholder.maxHR")}
                    value={maxHeartRate || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const n = toFloat(e.target.value);
                      setMaxHeartRate(n !== null ? String(n) : "");
                    }}
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        backgroundColor: "#fafafa",
                        "& fieldset": { borderColor: "#ddd" },
                        "&:hover fieldset": { borderColor: "#aaa" },
                        "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                      },
                    }}
                  />
                </Box>

                <Box sx={{ p: 1 }}>
                  <Typography
                    sx={{ color: "black", fontWeight: 600, fontSize: "1" }}
                  >
                    {tr("onboard.maxVel")}
                  </Typography>
                  <TextField
                    variant="outlined"
                    placeholder={tr("onboard.placeholder.maxVel")}
                    value={maxVelocity}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value;
                      if (hasTrailingSingleDot(value)) {
                        setMaxVelocity(
                          `${Number.parseFloat(value.slice(0, -1))}.`
                        );
                        return;
                      }
                      const n = toFloat(value);
                      setMaxVelocity(n !== null ? String(n) : "");
                    }}
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        backgroundColor: "#fafafa",
                        "& fieldset": { borderColor: "#ddd" },
                        "&:hover fieldset": { borderColor: "#aaa" },
                        "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                      },
                    }}
                  />
                </Box>
              </Box>

              <Button
                onClick={() => setPage(0)}
                sx={{
                  position: "absolute",
                  bottom: 16,
                  left: 16,
                  bgcolor: "#000",
                  color: "#fff",
                  "&:hover": { bgcolor: "#333" },
                  "&.Mui-disabled": { bgcolor: "#ccc", color: "#888" },
                }}
              >
                {tr("common.prev")}
              </Button>
              <Button
                onClick={() => setPage(2)}
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
                  "&.Mui-disabled": { bgcolor: "#ccc", color: "#888" },
                }}
              >
                {tr("common.next")}
              </Button>
            </>
          )}

          {/* Page 2 */}
          {page === 2 && (
            <>
              <Box
                width="100%"
                height="80%"
                sx={{ overflowY: "auto", pr: 1, position: "relative" }}
              >
                {labels.map((label, index) => (
                  <Stack
                    key={index}
                    width="100%"
                    flexDirection="row"
                    alignItems="center"
                    sx={{ p: 1, gap: 1 }}
                  >
                    <Typography
                      sx={{
                        color: "black",
                        fontWeight: 600,
                        fontSize: "1rem",
                        whiteSpace: "nowrap",
                        minWidth: "120px",
                      }}
                    >
                      {label}
                    </Typography>
                    <TextField
                      variant="outlined"
                      placeholder={tr("common.enterValue")}
                      value={values[index] || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const updated = [...values];
                        updated[index] = e.target.value;
                        setValues(updated);
                      }}
                      sx={{
                        flex: 1,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          backgroundColor: "#fafafa",
                          "& fieldset": { borderColor: "#ddd" },
                          "&:hover fieldset": { borderColor: "#aaa" },
                          "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                        },
                      }}
                    />
                  </Stack>
                ))}
              </Box>

              <Button
                onClick={() => setPage(1)}
                sx={{
                  position: "absolute",
                  bottom: 16,
                  left: 16,
                  bgcolor: "#000",
                  color: "#fff",
                  "&:hover": { bgcolor: "#333" },
                  "&.Mui-disabled": { bgcolor: "#ccc", color: "#888" },
                }}
              >
                {tr("common.prev")}
              </Button>
              <Button
                onClick={() => {
                  const isComplete = values.every((v) => v !== "");
                  if (isComplete) {
                    setPage(3);
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
                  "&.Mui-disabled": { bgcolor: "#ccc", color: "#888" },
                }}
              >
                {tr("common.next")}
              </Button>
            </>
          )}

          {/* Page 3 */}
          {page === 3 && (
            <>
              <Box
                width="100%"
                height="75%"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexDirection="column"
                sx={{ overflowY: "auto", pr: 1, position: "relative" }}
              >
                <Typography
                  sx={{ fontSize: "2.5rem", fontWeight: 700, color: "black" }}
                >
                  {tr("goals.title")}
                </Typography>

                <Stack width="100%" height="100%">
                  {suggestions[0] !== "" ? (
                    <Stack
                      width="100%"
                      direction="row"
                      py={2}
                      justifyContent="space-between"
                      alignItems="center"
                      flexWrap="nowrap"
                      sx={{
                        backgroundColor: "background.paper",
                        gap: 2,
                        whiteSpace: "nowrap",
                        "&::-webkit-scrollbar": { height: "6px" },
                        "&::-webkit-scrollbar-thumb": {
                          backgroundColor: "rgba(0,0,0,0.2)",
                          borderRadius: "3px",
                        },
                      }}
                    >
                      {suggestions.map((suggestion, index) => (
                        <Box
                          key={index}
                          onClick={() => setGoal(suggestion)}
                          sx={{
                            backgroundColor: "#f5f5f5",
                            width: "100%",
                            height: "200px",
                            cursor: "pointer",
                            borderRadius: "12px",
                            overflow: "auto",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              backgroundColor: "#e0e0e0",
                              boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
                              transform: "scale(1.02)",
                            },
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                          }}
                        >
                          <ReactMarkdown components={mdComponents}>
                            {suggestion}
                          </ReactMarkdown>
                        </Box>
                      ))}
                    </Stack>
                  ) : (
                    <Box
                      width="100%"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Stack
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        spacing={2}
                        height="200px"
                      >
                        <Typography sx={{ color: "black" }}>
                          {tr("loading.makingGoals")}
                        </Typography>
                        <CircularProgress />
                      </Stack>
                    </Box>
                  )}

                  <TextField
                    variant="outlined"
                    placeholder={tr("goals.placeholder")}
                    value={goal}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setGoal(e.target.value)
                    }
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        backgroundColor: "#fafafa",
                        "& fieldset": { borderColor: "#ddd" },
                        "&:hover fieldset": { borderColor: "#aaa" },
                        "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                      },
                    }}
                  />
                </Stack>
              </Box>

              <Button
                onClick={() => setPage(2)}
                sx={{
                  position: "absolute",
                  bottom: 16,
                  left: 16,
                  bgcolor: "#000",
                  color: "#fff",
                  "&:hover": { bgcolor: "#333" },
                  "&.Mui-disabled": { bgcolor: "#ccc", color: "#888" },
                }}
              >
                {tr("common.prev")}
              </Button>
              <Button
                onClick={() => {
                  setOnboarded(true);
                  makePlan();
                  window.scrollTo({ top: 0, behavior: "auto" });
                }}
                disabled={goal === ""}
                sx={{
                  position: "absolute",
                  bottom: 16,
                  right: 16,
                  bgcolor: "#000",
                  color: "#fff",
                  "&:hover": { bgcolor: "#333" },
                  "&.Mui-disabled": { bgcolor: "#ccc", color: "#888" },
                }}
              >
                {tr("common.finish")}
              </Button>
            </>
          )}
        </Box>
      )}
    </Box>
  );
}
