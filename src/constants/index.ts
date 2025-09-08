import { POCKET_MORTYS_MEDIA_URL } from "@/api/request";

const CLOUD_BASE_URL = "cloud://cloudbase-0grapuis2753b5c0.636c-cloudbase-0grapuis2753b5c0-1375677752";

export const PAGE_SIZE = 10;

// 维度
export const DIMENSIONS: Record<string, { color: string; index: number }> = {
  Mortyland: {
    color: "rgb(33, 125, 19)",
    index: 1,
  },
  "Plumbubo Prime 51b": {
    color: "rgb(247, 5, 247)",
    index: 2,
  },
  Mortopia: {
    color: "rgb(202, 165, 3)",
    index: 3,
  },
  "GF Mortanic": {
    color: "rgb(107, 147, 164)",
    index: 4,
  },
  "Anime Dimension": {
    color: "rgb(202, 165, 3)",
    index: 5,
  },
  "Anatomy Park": {
    color: "rgb(202, 165, 3)",
    index: 6,
  },
  Froopyland: {
    color: "rgb(202, 165, 3)",
    index: 7,
  },
};

// 稀有度
export const RARITIES: Record<
  string,
  {
    img: string;
    color: {
      primary: string;
      light: string;
      dark: string;
    };
  }
> = {
  // 普通
  Common: {
    img: `${CLOUD_BASE_URL}/common.png`,
    color: {
      primary: "#85efff",
      light: "rgba(22, 171, 255, 0.1)",
      dark: "#16abff",
    },
  },
  // 稀有
  Rare: {
    img: `${CLOUD_BASE_URL}/rare.png`,
    color: {
      primary: "#00eb00",
      light: "rgba(46, 179, 46, 0.1)",
      dark: "#00a200",
    },
  },
  // 史诗
  Epic: {
    img: `${CLOUD_BASE_URL}/epic.png`,
    color: {
      primary: "#ffff01",
      light: "rgba(255, 255, 1, 0.15)",
      dark: "#ffce01",
    },
  },
  // 天外
  Exotic: {
    img: `${CLOUD_BASE_URL}/exotic.png`,
    color: {
      primary: "#f091ff",
      light: "rgba(240, 145, 255, 0.2)",
      dark: "#ff00ff",
    },
  },
};

// 莫蒂类型
export const MORTY_TYPES: Record<string, { img: string | null }> = {
  Normal: {
    img: null,
  },
  Rock: {
    img: `${POCKET_MORTYS_MEDIA_URL}/images/rock.png`,
  },
  Paper: {
    img: `${POCKET_MORTYS_MEDIA_URL}/images/paper.png`,
  },
  Scissors: {
    img: `${POCKET_MORTYS_MEDIA_URL}/images/scissors.png`,
  },
};

export const ITEM_TYPES = {
  Item: "物品",
  Part: "零件",
  Invention: "发明物",
};

export const GAME_MODES: { label: string; value: GAME_MODE }[] = [
  {
    label: "多人模式",
    value: "multiplayer",
  },
  {
    label: "战役",
    value: "campaign",
  },
];

export type GAME_MODE = "campaign" | "multiplayer";

export const SIDES = ["Up", "Down", "Side"] as const;
export const ORIENTATIONS = ["Front", "Back"] as const;

export const RAIDS_DIFFICULTY_LEVELS = [
  "松弛",
  "湿海绵",
  "可笑",
  "轻度危险",
  "川辣！",
  "疯狂！！",
  "恐慌！",
  "必死无疑",
  "致命",
  "痛苦世界",
  "无可救药",
  "荒唐可笑",
  "难以置信",
  "困难",
  "非常困难",
  "极其困难",
  "极端",
];
