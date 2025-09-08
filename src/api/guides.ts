import { requestTable } from "./request";

export type MortyCombo = {
  id: 1;
  morty_1_id: string;
  morty_2_id: string | null;
  morty_3_id: string | null;
  morty_4_id: string | null;
  morty_5_id: string | null;
  morty_6_id: string | null;
  // 元素, e.g. Normal, Rock
  morty_1_element: string;
  morty_2_element: string | null;
  morty_3_element: string | null;
  morty_4_element: string | null;
  morty_5_element: string | null;
  morty_6_element: string | null;
  morty_1_asset_id: string;
  morty_2_asset_id: string | null;
  morty_3_asset_id: string | null;
  morty_4_asset_id: string | null;
  morty_5_asset_id: string | null;
  morty_6_asset_id: string | null;
  morty_1_number: string;
  morty_2_number: string | null;
  morty_3_number: string | null;
  morty_4_number: string | null;
  morty_5_number: string | null;
  morty_6_number: string | null;
  morty_1_name: string;
  morty_2_name: string | null;
  morty_3_name: string | null;
  morty_4_name: string | null;
  morty_5_name: string | null;
  morty_6_name: string | null;
  morty_1_alias: string;
  morty_2_alias: string | null;
  morty_3_alias: string | null;
  morty_4_alias: string | null;
  morty_5_alias: string | null;
  morty_6_alias: string | null;
  // 合成下一个莫蒂所需的数量
  morty_1_quantity: string | null;
  morty_2_quantity: string | null;
  morty_3_quantity: string | null;
  morty_4_quantity: string | null;
  morty_5_quantity: string | null;
  morty_6_quantity: string | null;
};

export function getMortyCombos() {
  return requestTable<{ data: MortyCombo[] }>("/CombosTable_cn.json");
}
