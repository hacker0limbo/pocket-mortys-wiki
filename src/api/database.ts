import { rawRequest, request, requestTable, POCKET_MORTYS_BASE_URL } from "./request";

export type Morty = {
  id: number;
  number: number;
  // 一段包含 html 的字符串, 需要解析, 例如: <a href=\"/cn/mortys/001-%E8%8E%AB%E8%92%82\"><span class=\"mortys_icon_20x20 mortys_icon_20x20_MortyDefaultIcon\"></span>莫蒂</a>
  name: string;
  // 类型, html 字符串需要解析 e.g. <span class="normal">Normal</span>
  type: string;
  // 对应资源 id, e.g. MortyDefault
  assetid: string;
  cssid: string;
  alias: string;
  raritysort: "D";
  // 稀有度字符串, 需要解析, e.g. '<span class="Exotic">Exotic</span>';
  rarity: string;
  basexp: string;
  basehp: string;
  baseatk: string;
  basedef: string;
  basespd: string;
  stattotal: string;
  evo_req: number | "";
  evo_req_campaign: number | "";
  badges: string;
  // 注意维度这里可能包含 <br> 需要去除, e.g. Mortopia 或者 <br>Mortopia
  dimensions: string;
  // html 字符串, 需要解析
  dimension_pools: string;
  // html 字符串, 需要解析
  where_found: string;
  raid_reward: number;
  from_raid_boss: null;
  fight_pit_reward: number;
  summers_van_reward: number;
  moving_mortys_reward: number;
  club_rick_seasonal_reward: number;
  gacha_exclusive: number;
};

export function getMortys() {
  return requestTable<{ data: Morty[] }>("/MortysTable_cn.json");
}

export type SignPost = {
  id: number;
  // e.g. "SignPostTutorialItem";
  signpost_id: string;
  random: number;
  // 需要的 badge 数量, 字符串数字
  badge_req: string;
  // 内容
  dialogue: string;
};

export function getSignPosts() {
  return requestTable<{ data: SignPost[] }>("/SignPostsTable_cn.json");
}

export type DimensionDetail = {
  id: number;
  // 维度
  dimension: string;
  // 稀有度, e.g. Exotics 注意会以 s 结尾
  rarity: string;
  morty_id: string;
  morty_asset_id: string;
  morty_name: string;
  morty_alias: string;
  // e.g. rock, 注意是小写的, 如果是 normal 类型会显示空字符串
  morty_type: string;
};

export function getDimensionDetails(index: number) {
  return requestTable<{ data: DimensionDetail[] }>(`/DimensionsTable_${index}_cn.json`);
}

// Attack 的所有返回值都是 html 结构包裹的字符串, 均需要解析
export type Attack = {
  number: string;
  name: string;
  type: string;
  power: string;
  accuracy: string;
  ap: string;
  description: string;
};

export function getAttacks(lang = "cn") {
  return requestTable<{ data: Attack[] }>("/AttacksTable_cn.json", lang);
}

// 头像的所有字符串均不需要解析
export type Avatar = {
  id: number;
  name: string;
  number: number;
  avatarid: string;
  assetid: string;
  category: string;
  combinedcost: string;
  multiplayeronly: string;
};

export function getAvatars() {
  return requestTable<{ data: Avatar[] }>("/AvatarsTable_cn.json");
}

// 物品, 零件, 发明品
export type ItemType = "Item" | "Part" | "Invention";

// mp 代表多人模式, sp 代表单人模式
export type Item = {
  id: 1;
  name: string;
  description: string;
  alias: string;
  number: number;
  item_id: string;
  asset_id: string;
  mp_type: ItemType;
  mp_cost: number;
  // req level, 几级可以获取到
  mp_store_level: number;
  // 上限为 100, 0-1000: any, 两边想等: 不显示,
  mp_reward_level_lower: number;
  mp_reward_level_upper: number;
  mp_effect_type: string;
  mp_effect_stat: any;
  mp_use_world: 0 | 1;
  mp_use_craft: 0 | 1;
  mp_use_battle: 0 | 1;
  mp_use_self: 0 | 1;
  mp_sortorder: number;
  // at club rick?
  mp_in_gacha: 0 | 1;
  sp_type: ItemType;
  sp_cost: number;
  sp_badge_requirement: number;
  sp_effect_type: string;
  sp_use_world: 0 | 1;
  sp_use_craft: 0 | 1;
  sp_use_battle: 0 | 1;
  sp_use_self: 0 | 1;
  sp_sortorder: number;
  // at blips and chitz?
  sp_in_gacha: 0 | 1;
  in_multiplayer: 0 | 1;
  in_campaign: 0 | 1;
};

export function getItems() {
  return requestTable<{ data: Item[] }>("/ItemsTable_cn.json");
}

export type NPC = {
  // 注意从 0 开始
  id: number;
  // 需要解析
  npc_name: string;
  alias: string;
  npc_type: string;
  npc_id: string;
  npc_asset: string;
  wanderer: "Yes" | "No";
  in_campaign: "Yes" | "No";
  // 需要解析
  purpose: string;
};

export function getNPCs() {
  return requestTable<{ data: NPC[] }>("/NPCsTable_cn.json");
}

// 所有属性值均为 html
export type Quest = {
  quest_number: 1;
  badges_required: string;
  quest_name: string;
  quest_giver: string;
  items_accepted: string;
  rewards: string;
};

export function getQuests() {
  return requestTable<{ data: Quest[] }>("/QuestsTable_cn.json");
}

// 所有属性值均为 html 字符串需解析
export type Raid = {
  event_number: number;
  raid_boss: string;
  type: string;
  special_reward: string;
};

export function getRaids() {
  return requestTable<{ data: Raid[] }>("/RaidsTable_cn.json");
}

export type Recipe = {
  quests_used_in: any[];
  quest_givers: any[];
  quest_givers_names: any[];
  number: number;
  recipe_id: string;
  in_multiplayer: 1 | 0;
  in_campaign: 1 | 0;
  language: string;
  item_id_1: string;
  item_id_2: string;
  item_id_3: string;
  item_id_result: string;
  slot_1: string;
  slot_2: string;
  slot_3: string;
  result_id: string;
  quests_rewarded_from: string;
  name_1: string;
  name_2: string;
  name_3: string;
  name_result: string;
  alias: string;
  alias_1: string;
  alias_2: string;
  alias_3: string;
  description: string;
  id: number;
};

export function getRecipes() {
  return requestTable<{ data: Recipe[] }>("/RecipesTable_cn.json");
}

export type Trainer = {
  id: number;
  name: string;
  alias: string;
  type: string;
  category: string;
  trainer_id: string;
  asset_id: string;
  trainer_items:
    | {
        item_id: string;
        // 数量
        quantity: string;
        name: string;
        alias: string;
      }[]
    | "Random";
  morties:
    | {
        id: number;
        morty_id: string;
        morty_name: string;
        element: string;
        asset_id: string;
        alias: string;
        language: string;
        level: string;
      }[]
    | "Random";
  rewards:
    | {
        type: "COIN" | "COUNCIL_BADGE" | "ITEM" | "BADGE" | "PORTAL_GUN" | "TROPHY" | "COUPON" | "TOURNAMENT_TICKET";
        chance: 100;
        quantity: null | number;
        badge_id?: number;
        item_id?: string;
        item_name?: string;
        item_alias?: string;
        trophy_id?: string;
        trophy_name?: string;
        trophy_alias?: string;
      }[]
    | "None";
};

export function getTrainers() {
  return requestTable<{ data: Trainer[] }>("/TrainersTable_cn.json");
}

export type MortyAttack = {
  id: string;
  value: string;
  label: string;
  disabled: boolean;
  customProperties: {
    attack: string;
    attack_element: string;
    attack_level: string;
  };
};

export function getMortyAttacks(assetid) {
  return request<MortyAttack[]>(`/morty-attacks/cn/${assetid}.json`);
}

// 根据某个技能获取相关的莫蒂
export function getMortysFromAttack(href: string) {
  return rawRequest(href);
}
