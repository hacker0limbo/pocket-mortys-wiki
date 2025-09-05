import { View, Text, Image } from "@tarojs/components";
import { useEffect, useMemo, useState } from "react";
import { getRecipes, type Recipe } from "@/api/database";
import Taro from "@tarojs/taro";
import { HoverButton, Popup, SafeArea, Segmented, Space, Table, TableColumnProps } from "@nutui/nutui-react-taro";
import { POCKET_MORTYS_MEDIA_URL } from "@/api/request";
import { Ask } from "@nutui/icons-react-taro";
import { GAME_MODE, GAME_MODES } from "@/constants";
import RecipesNote from "./RecipesNote";

import "./index.scss";

export default function Recipes() {
  const [mode, setMode] = useState<GAME_MODE>("multiplayer");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const multiplayerRecipes = useMemo(() => recipes.filter((r) => r.in_multiplayer), [recipes]);
  const campaignRecipes = useMemo(() => recipes.filter((r) => r.in_campaign), [recipes]);
  const [showRecipesNote, setShowRecipesNote] = useState(false);

  const columns: TableColumnProps[] = [
    {
      key: "number",
      title: "#",
    },
    {
      key: "name_result",
      title: "物品名称",
      fixed: "left",
      render: ({ name_result, result_id }: Recipe) => {
        return (
          <Space>
            <Image
              src={`${POCKET_MORTYS_MEDIA_URL}/assets/${result_id}Icon.png`}
              style={{ width: 18 }}
              mode="widthFix"
              lazyLoad
            />
            <Text
              className="link"
              onClick={() => {
                Taro.navigateTo({
                  url: `/pages/database/items/item/index?assetid=${result_id}`,
                });
              }}
            >
              {name_result}
            </Text>
          </Space>
        );
      },
    },
    {
      key: "items",
      title: "所需配方",
      render: ({ slot_1, slot_2, slot_3, name_1, name_2, name_3 }: Recipe) => {
        return (
          <>
            {[slot_1, slot_2, slot_3].filter(Boolean).map((itemId, index) => (
              <Space key={index}>
                <Image
                  src={`${POCKET_MORTYS_MEDIA_URL}/assets/${itemId}Icon.png`}
                  style={{ width: 18 }}
                  mode="widthFix"
                  lazyLoad
                />
                <Text
                  className="link"
                  onClick={() => {
                    Taro.navigateTo({
                      url: `/pages/database/items/item/index?assetid=${itemId}`,
                    });
                  }}
                >
                  {[name_1, name_2, name_3][index]}
                </Text>
              </Space>
            ))}
          </>
        );
      },
    },
    {
      key: "description",
      title: "描述",
    },
  ];

  useEffect(() => {
    Taro.showLoading({
      title: "加载配方中...",
    });
    getRecipes()
      .then((res) => {
        setRecipes(res.result?.data?.data);
      })
      .catch(() => {
        Taro.showToast({
          title: "获取配方失败",
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

      <Table data={mode === "campaign" ? campaignRecipes : multiplayerRecipes} columns={columns} />

      <HoverButton
        icon={<Ask />}
        onClick={() => {
          setShowRecipesNote(true);
        }}
      />
      <Popup
        position="bottom"
        title="配方说明"
        visible={showRecipesNote}
        closeable
        onClose={() => {
          setShowRecipesNote(false);
        }}
      >
        <RecipesNote />
      </Popup>

      <SafeArea position="bottom" />
    </View>
  );
}
