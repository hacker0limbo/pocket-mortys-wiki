import commonImg from "@/img/common.png";
import epicImg from "@/img/epic.png";
import rareImg from "@/img/rare.png";
import exoticImg from "@/img/exotic.png";
import { POCKET_MORTYS_MEDIA_URL } from "@/api/request";

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
    img: commonImg,
    color: {
      primary: "#85efff",
      light: "rgba(22, 171, 255, 0.1)",
      dark: "#16abff",
    },
  },
  // 稀有
  Rare: {
    img: rareImg,
    color: {
      primary: "#00eb00",
      light: "rgba(46, 179, 46, 0.1)",
      dark: "#00a200",
    },
  },
  // 史诗
  Epic: {
    img: epicImg,
    color: {
      primary: "#ffff01",
      light: "rgba(255, 255, 1, 0.15)",
      dark: "#ffce01",
    },
  },
  // 天外
  Exotic: {
    img: exoticImg,
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
