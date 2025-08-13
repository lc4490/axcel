"use client";

import {
  Box,
  Button,
  Typography,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  CircularProgress,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import FlagIcon from "@mui/icons-material/Flag";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { t, type Lang } from "@/i18n/translations";

type Athlete = {
  id: number;
  team: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  jersey: string;
  position: string;
  weight: number;
  height: number;
  maxHR: number;
  maxVel: number;
  values: string[];
  suggestions: string[];
  goal: string;
  workouts: string[];
};

const defaultValues = [
  "體脂 16%、瘦體重 58.8 kg",
  "52 cm",
  "4.3 秒",
  "10.2 秒",
  "臥推: 85 kg、深蹲: 110 kg",
  "5.8 秒",
  "45 次/分鐘、伏地挺身: 35 次",
  "8.5 秒",
  "Level 17.1 (~1800 m)",
];

const defaultSuggestions = [
  `**[力量增強挑戰]**- **目標**: 提升全身力量，特別是下肢以提升跳躍與衝刺表現。- **原因**: 基於你的測試結果-垂直跳52cm與30公尺衝刺4.3秒與40公尺衝刺5.8秒表現，指出你的下肢力量還有上升的空間。此外，深蹲的1RM（一次最大重量）110kg與身高體重比例相較尚處於中等程度，故有加強的需要。- **重點**:  - 針對腿部力量的訓練，包含深蹲、腿舉等重量訓練，並逐步增加重量負荷以挑戰自我。  - 發展肌肉耐力是提升1RM的有效手段，如將重訓組數調整到3-4組，每組12-15次，讓肌肉適應後再調整到較重的重量，6-8次/組。  - 飲食上要保證足夠的蛋白質攝取，幫助肌肉恢復與成長。`,
  `**[速度魔咒突破]**- **目標**: 進一步提升衝刺速度與靈活度。- **原因**: 根據你的測試結果-30公尺衝刺4.3秒與40公尺衝刺5.8秒展現出你在短距離的速度表現已經很好，但仍能進一步提升。- **重點**:  - 重新設計你的跑步訓練計畫，包括間歇訓練、爆發力訓練與耐力訓練，使你的肌肉和神經系統適應更高的速度。  - 透過仿真訓練，模仿實戰中需要高速跑動的情況，提升你的應變能力與移動敏捷性。  - 確保適當的碳水化合物攝取，為你的訓練與恢復提供足夠的能量。`,
  `**[體能能量爆發]**- **目標**: 提升體能耐力並壓縮折返跑時間。- **原因**: 你的Yo-Yo Test Level 17.1 (~1800m)和折返跑8.5秒的測試結果顯示，你的耐力與爆發力均有出色的表現，但進一步的提升可以將你的全面體能拉到更高的層次。- **重點**:  - 多元化你的有氧訓練，如游泳、自行車、慢跑等，提高你的心肺功能並提高你的耐力。  - 加強核心肌群訓練，如俯臥撐、仰臥起坐、橋式運動等，進一步提升你的爆發力和速度。  - 飲食上要攝取足夠且均衡`,
];

const defaultWorkouts = [
  "第1天 – 力量訓練\n1. 深蹲 – 4x12 @ 60% 1RM\n2. 腿舉 – 4x12 @ 60% 1RM\n3. 30公尺衝刺 – 4x全力爆發\n4. 自身重量伏地挺身 – 5x15",
  "第2天 – 耐力訓練\n1. 站立式跳躍 – 4x15\n2. 單腿深蹲 – 4x12 @ 自身重量\n3. 40公尺衝刺 – 4x全力爆發\n4. 核心訓練（如捲腹）– 4x15",
  "第3天 – 力量訓練\n1. 深蹲 – 3x8 @ 70% 1RM\n2. 腿舉 – 3x8 @ 70% 1RM\n3. 30公尺衝刺 – 3x全力爆發\n4. 腕力",
  "第4天 – 力量訓練\n1. 深蹲 – 3x8 @ 70% 1RM\n2. 腿舉 – 3x8 @ 70% 1RM\n3. 30公尺衝刺 – 3x全力爆發\n4. 腕力",
];

type AthleteTableProps = {
  lang: Lang; // pass down from parent: <AthleteTable lang={lang} />
  onToggleLang?: () => void; // optional toggle button (global toggle if you want)
};

export default function AthleteTable({
  lang,
  onToggleLang,
}: AthleteTableProps) {
  const tr = t(lang);

  // localized metric labels (used for UI and for prompt-building)
  const labels = [
    tr("table.labels.bodyComp"), // 1
    tr("table.labels.verticalJump"), // 2
    tr("table.labels.sprint10m"), // 3
    tr("table.labels.sprint20m"), // 4
    tr("table.labels.bpSqRM"), // 5
    tr("table.labels.shuttleRun"), // 6
    tr("table.labels.coreTest"), // 7
    tr("table.labels.agilityTest"), // 8
    tr("table.labels.beepTest"), // 9
  ];

  const [rows, setRows] = useState<Athlete[]>([
    {
      id: 1,
      team: "Chinese Taipei Ice Hockey Team",
      firstName: "翔",
      lastName: "吳",
      birthdate: "03/12/2010",
      jersey: "F10",
      position: "C",
      weight: 40.0,
      height: 155.0,
      maxHR: 200,
      maxVel: 10.0,
      values: defaultValues,
      suggestions: defaultSuggestions,
      goal: "",
      workouts: defaultWorkouts,
    },
    {
      id: 2,
      team: "Chinese Taipei Ice Hockey Team",
      firstName: "瑋",
      lastName: "吳",
      birthdate: "08/08/2012",
      jersey: "F07",
      position: "F",
      weight: 36.0,
      height: 150.0,
      maxHR: 200,
      maxVel: 10.0,
      values: defaultValues,
      suggestions: defaultSuggestions,
      goal: "",
      workouts: [],
    },
    {
      id: 3,
      team: "Chinese Taipei Ice Hockey Team",
      firstName: "翔",
      lastName: "吳",
      birthdate: "03/12/2010",
      jersey: "F10",
      position: "C",
      weight: 40.0,
      height: 155.0,
      maxHR: 200,
      maxVel: 10.0,
      values: defaultValues,
      suggestions: Array(3).fill(""),
      goal: "",
      workouts: [],
    },
  ]);

  const [editingAthlete, setEditingAthlete] = useState<Athlete | null>(null);
  const [goalAthlete, setGoalAthlete] = useState<Athlete | null>(null);
  const [workoutAthlete, setWorkoutAthlete] = useState<Athlete | null>(null);
  const [goal, setGoal] = useState("");
  const [loadingSuggestionsID, setLoadingSuggestionsID] = useState<
    number | null
  >(null);
  const [loadingWorkoutsID, setLoadingWorkoutsID] = useState<number | null>(
    null
  );

  const handleSaveAthlete = () => {
    if (editingAthlete) {
      setLoadingSuggestionsID(editingAthlete.id);
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === editingAthlete.id ? editingAthlete : row
        )
      );
      makeSuggestions(editingAthlete);
      setEditingAthlete(null);
    }
  };

  const makeSuggestions = async (athlete: Athlete) => {
    if (athlete.suggestions[0] === "") {
      let input = "";
      input += `${tr("common.height")}：${athlete.height}cm\n`;
      input += `${tr("common.weight")}：${athlete.weight}kg\n`;
      for (let i = 0; i < labels.length; i++) {
        input += `${i + 1}. ${labels[i]}: ${athlete.values[i]}\n`;
      }
      try {
        const res = await fetch("/api/goal", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input }),
        });
        const data = await res.json();
        const suggestions = data.result
          .split(/\*\*\d+\.\s*/)
          .filter(Boolean)
          .map((str: string) => `**${str}`);
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === athlete.id ? { ...row, suggestions } : row
          )
        );
      } finally {
        setLoadingSuggestionsID(null);
      }
    } else {
      setLoadingSuggestionsID(null);
    }
  };

  const handleSaveGoal = () => {
    if (goalAthlete) {
      setLoadingWorkoutsID(goalAthlete.id);
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === goalAthlete.id ? { ...row, goal } : row
        )
      );
      makePlan(goalAthlete);
      setGoalAthlete(null);
      setGoal("");
    }
  };

  const makePlan = async (athlete: Athlete) => {
    if (athlete.workouts.length < 1) {
      let input = "";
      input += `${tr("common.height")}：${athlete.height}cm\n`;
      input += `${tr("common.weight")}：${athlete.weight}kg\n`;
      for (let i = 0; i < labels.length; i++) {
        input += `${i + 1}. ${labels[i]}: ${athlete.values[i]}\n`;
      }
      try {
        const res = await fetch("/api/plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input, goal }),
        });
        const data = await res.json();
        const workouts = data.plan
          .split("天")
          .slice(2)
          .map((w: string, index: number) => {
            let text =
              tr("table.workout.dayPrefix", { n: String(index + 1) }) + w;
            if (text.includes("###")) text = text.split("###")[0].trim();
            if (text.includes("---")) text = text.split("---")[0].trim();
            if (text.includes("\n\n")) text = text.split("\n\n")[0].trim();
            return text.trim();
          });
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === athlete.id ? { ...row, workouts } : row
          )
        );
      } catch (err) {
        console.error("Failed to generate workout plan", err);
      } finally {
        setLoadingWorkoutsID(null);
      }
    } else {
      setLoadingWorkoutsID(null);
    }
  };

  // Columns with translated headers
  const columns: GridColDef<Athlete>[] = [
    {
      field: "team",
      headerName: tr("table.columns.team"),
      width: 200,
      editable: true,
    },
    {
      field: "firstName",
      headerName: tr("table.columns.firstName"),
      width: 130,
      editable: true,
    },
    {
      field: "lastName",
      headerName: tr("table.columns.lastName"),
      width: 130,
      editable: true,
    },
    {
      field: "birthdate",
      headerName: tr("table.columns.birthdate"),
      width: 130,
      editable: true,
    },
    {
      field: "jersey",
      headerName: tr("table.columns.jersey"),
      width: 100,
      editable: true,
    },
    {
      field: "position",
      headerName: tr("table.columns.position"),
      width: 100,
      editable: true,
    },
    {
      field: "weight",
      headerName: tr("table.columns.weightKg"),
      width: 120,
      editable: true,
    },
    {
      field: "height",
      headerName: tr("table.columns.heightCm"),
      width: 120,
      editable: true,
    },
    {
      field: "maxHR",
      headerName: tr("table.columns.maxHR"),
      width: 120,
      editable: true,
    },
    {
      field: "maxVel",
      headerName: tr("table.columns.maxVel"),
      width: 120,
      editable: true,
    },
    {
      field: "actions",
      headerName: tr("table.columns.actions"),
      width: 150,
      sortable: false,
      renderCell: (params: GridRenderCellParams<Athlete>) => (
        <Box display="flex" gap={0.5} padding={0.5}>
          {/* Edit/Test button */}
          <IconButton
            onClick={() => setEditingAthlete(params.row)}
            sx={{
              backgroundColor: Object.entries(params.row).some(
                ([key, value]) =>
                  key !== "id" &&
                  key !== "workouts" &&
                  key !== "values" &&
                  key !== "goal" &&
                  (value === "" ||
                    value === null ||
                    value === undefined ||
                    value === 0)
              )
                ? "#ddd"
                : "#e3f2fd",
              color: Object.entries(params.row).some(
                ([key, value]) =>
                  key !== "id" &&
                  key !== "workouts" &&
                  key !== "values" &&
                  key !== "goal" &&
                  (value === "" ||
                    value === null ||
                    value === undefined ||
                    value === 0)
              )
                ? "#888"
                : "#1976d2",
              "&:hover": {
                backgroundColor: Object.entries(params.row).some(
                  ([key, value]) =>
                    key !== "id" &&
                    key !== "workouts" &&
                    key !== "values" &&
                    key !== "goal" &&
                    (value === "" ||
                      value === null ||
                      value === undefined ||
                      value === 0)
                )
                  ? "#ddd"
                  : "#bbdefb",
              },
            }}
            disabled={Object.entries(params.row).some(
              ([key, value]) =>
                key !== "id" &&
                key !== "workouts" &&
                key !== "values" &&
                key !== "goal" &&
                (value === "" ||
                  value === null ||
                  value === undefined ||
                  value === 0)
            )}
            aria-label={tr("table.actions.editMetrics")}
          >
            <EditIcon />
          </IconButton>

          {/* Goal button */}
          <IconButton
            onClick={() => {
              setGoalAthlete(params.row);
              setGoal(params.row.goal);
            }}
            sx={{
              backgroundColor:
                params.row.suggestions[0] === "" ? "#ddd" : "#e3f2fd",
              color: params.row.suggestions[0] === "" ? "#888" : "#1976d2",
              "&:hover": {
                backgroundColor:
                  params.row.suggestions[0] === "" ? "#ddd" : "#bbdefb",
              },
            }}
            disabled={params.row.suggestions[0] === ""}
            aria-label={tr("table.actions.setGoal")}
          >
            {params.row.id === loadingSuggestionsID ? (
              <CircularProgress size={20} thickness={5} />
            ) : (
              <FlagIcon />
            )}
          </IconButton>

          {/* Workout button */}
          <IconButton
            onClick={() => setWorkoutAthlete(params.row)}
            sx={{
              backgroundColor:
                params.row.workouts.length < 1 ? "#ddd" : "#e3f2fd",
              color: params.row.workouts.length < 1 ? "#888" : "#1976d2",
              "&:hover": {
                backgroundColor:
                  params.row.workouts.length < 1 ? "#ddd" : "#bbdefb",
              },
            }}
            disabled={params.row.workouts.length < 1}
            aria-label={tr("table.actions.viewWorkouts")}
          >
            {params.row.id === loadingWorkoutsID ? (
              <CircularProgress size={20} thickness={5} />
            ) : (
              <FitnessCenterIcon />
            )}
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: "90vh", width: "100%", p: 2 }}>
      {/* Optional global toggle */}
      {onToggleLang && (
        <Box sx={{ position: "fixed", top: 12, right: 12, zIndex: 20 }}>
          <Button size="small" variant="outlined" onClick={onToggleLang}>
            {lang === "zh-TW" ? "English" : "繁體中文"}
          </Button>
        </Box>
      )}

      {/* Toolbar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5">{tr("table.title")}</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            const newAthlete: Athlete = {
              id: rows.length + 1,
              team: "",
              firstName: "",
              lastName: "",
              birthdate: "",
              jersey: "",
              position: "",
              weight: 0,
              height: 0,
              maxHR: 0,
              maxVel: 0,
              values: Array(9).fill(""),
              suggestions: Array(3).fill(""),
              goal: "",
              workouts: [],
            };
            setRows((prev) => [...prev, newAthlete]);
          }}
        >
          {tr("table.actions.addAthlete")}
        </Button>
      </Box>

      {/* DataGrid */}
      <DataGrid
        rows={rows}
        columns={columns}
        paginationModel={{ pageSize: 10, page: 0 }}
        checkboxSelection
        disableRowSelectionOnClick
        sx={{
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      />

      {/* Edit Modal */}
      <Dialog
        open={!!editingAthlete}
        onClose={() => setEditingAthlete(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent dividers>
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
                  minWidth: 120,
                  whiteSpace: "nowrap",
                }}
              >
                {`${index + 1}. ${label}`}
              </Typography>
              <TextField
                variant="outlined"
                placeholder={`${tr("common.input")} ${label}`}
                value={editingAthlete?.values[index] || ""}
                onChange={(e) => {
                  if (editingAthlete) {
                    const updatedValues = [...editingAthlete.values];
                    updatedValues[index] = e.target.value;
                    setEditingAthlete({
                      ...editingAthlete,
                      values: updatedValues,
                    });
                  }
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingAthlete(null)}>
            {tr("common.cancel")}
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveAthlete}
            disabled={!editingAthlete?.values.every((v: string) => v !== "")}
          >
            {tr("common.save")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Goal-Setting Modal */}
      <Dialog
        open={!!goalAthlete}
        onClose={() => setGoalAthlete(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogContent dividers>
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
              {tr("table.goal.title")}
            </Typography>
            <Stack width="100%" height="100%">
              <Stack
                width="100%"
                direction="row"
                paddingY={2}
                justifyContent="space-between"
                alignItems="center"
                flexWrap="nowrap"
                sx={{
                  gap: 2,
                  whiteSpace: "nowrap",
                  "&::-webkit-scrollbar": { height: "6px" },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    borderRadius: "3px",
                  },
                }}
              >
                {goalAthlete?.suggestions.map((suggestion, index) => (
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
                    <ReactMarkdown
                      components={{
                        p: ({ node, ...props }) => (
                          <Typography
                            sx={{
                              color: "#444",
                              fontSize: "0.95rem",
                              lineHeight: 1.6,
                              mb: 1,
                              whiteSpace: "pre-wrap",
                            }}
                            {...props}
                          />
                        ),
                        li: ({ node, ...props }) => (
                          <li
                            style={{
                              marginBottom: "0.5rem",
                              color: "#555",
                              whiteSpace: "pre-wrap",
                            }}
                            {...props}
                          />
                        ),
                        strong: ({ node, ...props }) => (
                          <Typography
                            component="span"
                            sx={{
                              color: "#111",
                              fontWeight: "bold",
                              whiteSpace: "pre-wrap",
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
              <TextField
                variant="outlined"
                placeholder={tr("table.goal.placeholder")}
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                sx={{
                  width: "100%",
                  mt: 2,
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setGoalAthlete(null)}>
            {tr("common.cancel")}
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveGoal}
            disabled={goal === ""}
          >
            {tr("table.goal.save")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Workout Modal */}
      <Dialog
        open={!!workoutAthlete}
        onClose={() => setWorkoutAthlete(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {workoutAthlete?.firstName} {tr("table.workout.plan")}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ maxHeight: "500px", overflowY: "auto" }}>
            {workoutAthlete?.workouts.map((workout, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: "#f5f5f5",
                  p: 2,
                  borderRadius: 2,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                <ReactMarkdown>{workout}</ReactMarkdown>
              </Box>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setWorkoutAthlete(null)}>
            {tr("common.close")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
