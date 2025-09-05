import { View, Image, Text } from "@tarojs/components";
import { SafeArea, Segmented, Space, Table, TableColumnProps } from "@nutui/nutui-react-taro";
import { useEffect, useMemo, useState } from "react";
import { getItems, type Item } from "@/api/database";
import Taro from "@tarojs/taro";
import { POCKET_MORTYS_MEDIA_URL } from "@/api/request";
import { Link } from "@/components";
import { GAME_MODE, GAME_MODES, ITEM_TYPES } from "@/constants";

import "./index.scss";

export default function Items() {
  // 模式
  const [mode, setMode] = useState<GAME_MODE>("multiplayer");
  const [items, setItems] = useState<Item[]>([]);
  const multiplayerItems = useMemo(() => items.filter((item) => item.in_multiplayer), [items]);
  const campaignItems = useMemo(() => items.filter((item) => item.in_campaign), [items]);

  const commonColums: TableColumnProps[] = [
    {
      key: "id",
      title: "id",
    },
    {
      key: "name",
      title: "名称",
      fixed: "left",
      render: (record: Item) => {
        const { asset_id, name } = record;
        return (
          <Space>
            <Image
              src={`${POCKET_MORTYS_MEDIA_URL}/sprites/items/icon/50x50/${asset_id}Icon.png`}
              style={{ width: 18 }}
              mode="widthFix"
              lazyLoad
            />
            <Link
              onClick={() => {
                Taro.navigateTo({
                  url: `/pages/database/items/item/index?assetid=${asset_id}`,
                });
              }}
            >
              {name}
            </Link>
          </Space>
        );
      },
    },
  ];

  const multiplayerColumns: TableColumnProps[] = [
    ...commonColums,
    {
      key: "mp_type",
      title: "类型",
      render: ({ mp_type }: Item) => {
        return <Text>{ITEM_TYPES[mp_type]}</Text>;
      },
    },
    {
      key: "mp_cost",
      title: "花费",
      render: ({ mp_cost }: Item) => {
        return (
          <Space>
            <Image
              src={`${POCKET_MORTYS_MEDIA_URL}/images/ui/ItemCoinMPIcon.png`}
              style={{ width: 18 }}
              mode="widthFix"
              lazyLoad
            />
            <Text>{mp_cost}</Text>
          </Space>
        );
      },
    },
    {
      key: "mp_store_level",
      title: "获取等级",
      render: ({ mp_store_level }: Item) => {
        return <Text>{mp_store_level > 0 ? mp_store_level : ""}</Text>;
      },
    },
    {
      key: "mp_reward_level_lower",
      title: "奖励等级范围",
      render: ({ mp_reward_level_lower, mp_reward_level_upper }: Item) => {
        if (mp_reward_level_lower === mp_reward_level_upper) {
          return "";
        } else if (mp_reward_level_lower === 0 && mp_reward_level_upper === 1000) {
          return <Text>Any</Text>;
        } else if (mp_reward_level_lower > 0 && mp_reward_level_upper === 1000) {
          return <Text>{mp_reward_level_lower + "+"}</Text>;
        } else {
          return <Text>{mp_reward_level_lower + " - " + mp_reward_level_upper}</Text>;
        }
      },
    },
    {
      key: "mp_in_gacha",
      title: "在 Rick Club?",
      render: ({ mp_in_gacha }: Item) => {
        return <Text>{mp_in_gacha ? "是" : "否"}</Text>;
      },
    },
    {
      key: "description",
      title: "物品效果描述",
    },
  ];

  const campaignColumns: TableColumnProps[] = [
    ...commonColums,
    {
      key: "sp_type",
      title: "类型",
    },
    {
      key: "sp_type",
      title: "类型",
      render: ({ sp_type }: Item) => {
        return <Text>{ITEM_TYPES[sp_type]}</Text>;
      },
    },
    {
      key: "sp_cost",
      title: "花费",
      render: ({ sp_cost }: Item) => {
        return (
          <Space>
            <Image
              src={`${POCKET_MORTYS_MEDIA_URL}/images/ui/ItemCoinIcon.png`}
              style={{ width: 18 }}
              mode="widthFix"
              lazyLoad
            />
            <Text>{sp_cost}</Text>
          </Space>
        );
      },
    },
    {
      key: "sp_badge_requirement",
      title: "所需徽章",
    },
    {
      key: "sp_in_gacha",
      title: "在 Blips and Chitz?",
      render: ({ sp_in_gacha }: Item) => {
        return <Text>{sp_in_gacha ? "是" : "否"}</Text>;
      },
    },
    {
      key: "description",
      title: "物品效果描述",
    },
  ];

  useEffect(() => {
    Taro.showLoading({
      title: "加载物品中...",
    });
    getItems()
      .then((res) => {
        const data = res.result?.data?.data;
        setItems(data);
      })
      .catch(() => {
        Taro.showToast({
          title: "获取物品失败",
          icon: "error",
        });
      })
      .finally(() => {
        Taro.hideLoading();
      });
  }, []);

  return (
    <View>
      <Segmented
        style={{ marginBottom: 8 }}
        value={mode}
        onChange={(value) => {
          setMode(value as GAME_MODE);
        }}
        options={GAME_MODES}
      />

      <Table
        columns={mode === "campaign" ? campaignColumns : multiplayerColumns}
        data={mode === "campaign" ? campaignItems : multiplayerItems}
      />

      <SafeArea position="bottom" />
    </View>
  );
}
