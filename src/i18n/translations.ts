export type Lang = "en" | "zh-TW";

export const messages: Record<Lang, Record<string, string>> = {
  "zh-TW": {
    // Home (mode)
    "home.mode.athlete": "個人",
    "home.mode.coach": "教練",

    // Common / buttons
    "common.edit": "編輯",
    "common.user": "使用者",
    "common.input": "輸入",
    "common.cancel": "取消",
    "common.save": "儲存",
    "common.saveGoal": "儲存目標",
    "common.close": "關閉",
    "common.finish": "完成",
    "common.next": "下一步",
    "common.prev": "上一步",
    "common.addPlayer": "加球員",
    "common.enterValue": "輸入數值",

    // Loading
    "loading.makingPlan": "正在為您指定訓練課程規劃...",
    "loading.makingGoals": "正在為您建立目標...",

    // Sensor dialog
    "sensor.title": "請輸入您的感測器號碼",
    "sensor.data": "感測器資料",

    // Onboarding – page 0
    "onboard.hello": "你好！讓我們先了解你，以便為你量身定制專屬體驗",
    "onboard.name": "名字",
    "onboard.placeholder.lastName": "輸入姓",
    "onboard.placeholder.firstName": "輸入名",
    "onboard.height": "身高",
    "onboard.placeholder.heightCm": "輸入身高（cm）",
    "onboard.placeholder.heightFt": "輸入身高（ft）",
    "onboard.placeholder.heightIn": "輸入身高（in）",
    "onboard.weight": "重量",
    "onboard.placeholder.weightKg": "輸入重量（kg）",
    "onboard.placeholder.weightLb": "輸入重量（lbs）",
    "onboard.birthdate": "出生日期",

    // Onboarding – page 1
    "onboard.team": "球隊",
    "onboard.placeholder.team": "輸入球隊",
    "onboard.jersey": "球號",
    "onboard.placeholder.jersey": "輸入球號",
    "onboard.position": "球位",
    "onboard.placeholder.position": "輸入球位",
    "onboard.maxHR": "最高心跳",
    "onboard.placeholder.maxHR": "輸入最高心跳",
    "onboard.maxVel": "最快速度",
    "onboard.placeholder.maxVel": "輸入最快速度",

    // Onboarding – page 2 labels (first component)
    "labels.1": "1.身體組成:",
    "labels.2": "2.垂直跳:",
    "labels.3": "3.30公尺衝刺:",
    "labels.4": "4.T-test:",
    "labels.5": "5.1 RM測驗:",
    "labels.6": "6.40公尺衝刺:",
    "labels.7": "7.卷腹、伏地挺身:",
    "labels.8": "8.折返跑:",
    "labels.9": "9.Yo-yo Test:",

    // Onboarding – page 3 (goals)
    "goals.title": "目標設定",
    "goals.placeholder": "輸入目標",

    // Athlete Table
    "table.title": "球隊",
    "table.actions.addAthlete": "加球員",
    "table.columns.players": "球員",
    "table.columns.actions": "功能",
    "table.columns.team": "球隊",
    "table.columns.firstName": "名",
    "table.columns.lastName": "姓",
    "table.columns.birthdate": "出生日期",
    "table.columns.jersey": "球號",
    "table.columns.position": "球位",
    "table.columns.weightKg": "重量 (kg)",
    "table.columns.heightCm": "身高 (cm)",
    "table.columns.maxHR": "最高心跳",
    "table.columns.maxVel": "最高速度",

    // Athlete Table labels (second file)
    "table.labels.bodyComp": "體脂/瘦體重",
    "table.labels.verticalJump": "垂直跳",
    "table.labels.sprint10m": "10M衝刺",
    "table.labels.sprint20m": "20M衝刺",
    "table.labels.bpSqRm": "臥推/深蹲",
    "table.labels.shuttleRun": "折返跑",
    "table.labels.coreTest": "核心測試",
    "table.labels.agilityTest": "敏捷測試",
    "table.labels.beepTest": "Beep Test",

    // Workout modal
    "workout.planFor": "{name} 的訓練計劃",
  },

  // ------------------- ENGLISH -------------------
  en: {
    // Home (mode)
    "home.mode.athlete": "Athlete",
    "home.mode.coach": "Coach",

    // Common / buttons
    "common.edit": "Edit",
    "common.user": "User",
    "common.input": "Submit",
    "common.cancel": "Cancel",
    "common.save": "Save",
    "common.saveGoal": "Save Goal",
    "common.close": "Close",
    "common.finish": "Finish",
    "common.next": "Next",
    "common.prev": "Back",
    "common.addPlayer": "Add Player",
    "common.enterValue": "Enter Value",

    // Loading
    "loading.makingPlan": "Generating your training plan...",
    "loading.makingGoals": "Creating goal suggestions...",

    // Sensor dialog
    "sensor.title": "Please enter your sensor ID",
    "sensor.data": "Sensor Data",

    // Onboarding – page 0
    "onboard.hello":
      "Hi! Let’s get to know you so we can tailor your experience.",
    "onboard.name": "Name",
    "onboard.placeholder.lastName": "Enter last name",
    "onboard.placeholder.firstName": "Enter first name",
    "onboard.height": "Height",
    "onboard.placeholder.heightCm": "Enter height (cm)",
    "onboard.placeholder.heightFt": "Enter height (ft)",
    "onboard.placeholder.heightIn": "Enter height (in)",
    "onboard.weight": "Weight",
    "onboard.placeholder.weightKg": "Enter weight (kg)",
    "onboard.placeholder.weightLb": "Enter weight (lbs)",
    "onboard.birthdate": "Date of Birth",

    // Onboarding – page 1
    "onboard.team": "Team",
    "onboard.placeholder.team": "Enter team",
    "onboard.jersey": "Jersey #",
    "onboard.placeholder.jersey": "Enter jersey number",
    "onboard.position": "Position",
    "onboard.placeholder.position": "Enter position",
    "onboard.maxHR": "Max Heart Rate",
    "onboard.placeholder.maxHR": "Enter max heart rate",
    "onboard.maxVel": "Top Speed",
    "onboard.placeholder.maxVel": "Enter top speed",

    // Onboarding – page 2 labels (first component)
    "labels.1": "1. Body Composition:",
    "labels.2": "2. Vertical Jump:",
    "labels.3": "3. 30 m Sprint:",
    "labels.4": "4. T-test:",
    "labels.5": "5. 1RM Test:",
    "labels.6": "6. 40 m Sprint:",
    "labels.7": "7. Sit-ups / Push-ups:",
    "labels.8": "8. Shuttle Run:",
    "labels.9": "9. Yo-yo Test:",

    // Onboarding – page 3 (goals)
    "goals.title": "Goal Setting",
    "goals.placeholder": "Enter goal",

    // Athlete Table
    "table.title": "Team",
    "table.actions.addAthlete": "Add Athlete",
    "table.columns.players": "Players",
    "table.columns.actions": "Actions",
    "table.columns.team": "Team",
    "table.columns.firstName": "First Name",
    "table.columns.lastName": "Last Name",
    "table.columns.birthdate": "Date of Birth",
    "table.columns.jersey": "Jersey",
    "table.columns.position": "Position",
    "table.columns.weightKg": "Weight (kg)",
    "table.columns.heightCm": "Height (cm)",
    "table.columns.maxHR": "Max HR",
    "table.columns.maxVel": "Top Speed",

    // Athlete Table labels (second file)
    "table.labels.bodyComp": "Body Fat / Lean Mass",
    "table.labels.verticalJump": "Vertical Jump",
    "table.labels.sprint10m": "10 m Sprint",
    "table.labels.sprint20m": "20 m Sprint",
    "table.labels.bpSqRm": "Bench / Squat",
    "table.labels.shuttleRun": "Shuttle Run",
    "table.labels.coreTest": "Core Test",
    "table.labels.agilityTest": "Agility Test",
    "table.labels.beepTest": "Beep Test",

    // Workout modal
    "workout.planFor": "Training Plan for {name}",
  },
};

export const t =
  (lang: Lang) => (key: string, vars?: Record<string, string | number>) => {
    let s = messages[lang][key] ?? key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        s = s.replace(new RegExp(`{${k}}`, "g"), String(v));
      }
    }
    return s;
  };
