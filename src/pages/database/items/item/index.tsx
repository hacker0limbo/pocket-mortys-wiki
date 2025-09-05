import { View, Image, Text } from "@tarojs/components";
import { Cell, SafeArea, Space } from "@nutui/nutui-react-taro";
import Taro, { useRouter } from "@tarojs/taro";
import { useEffect, useState } from "react";
import { type Item, getItems, type Recipe, getRecipes } from "@/api/database";
import { POCKET_MORTYS_MEDIA_URL } from "@/api/request";
import { Link } from "@/components";

import "./index.scss";

// 根据一个配方渲染公式
function renderRecipeFormula(recipe?: Recipe) {
  if (!recipe) {
    return null;
  }
  const { slot_1, slot_2, slot_3, name_1, name_2, name_3, result_id, name_result } = recipe;
  const recipes = [
    [slot_1, name_1],
    [slot_2, name_2],
    [slot_3, name_3],
    [result_id, name_result],
  ].filter(([id]) => Boolean(id));

  const recipeElements = recipes.map(([assetid, name]) => (
    <Space
      key={assetid}
      style={{ "--nutui-space-gap": "0px" } as React.CSSProperties}
      direction="vertical"
      align="center"
    >
      <Image src={`${POCKET_MORTYS_MEDIA_URL}/assets/${assetid}Icon.png`} style={{ width: 18 }} mode="widthFix" />
      <Text
        style={{ fontSize: 12 }}
        className="link"
        onClick={() => {
          Taro.navigateTo({
            url: `/pages/database/items/item/index?assetid=${assetid}`,
          });
        }}
      >
        {name}
      </Text>
    </Space>
  ));

  return (
    <Space align="center">
      {recipeElements
        .flatMap((value, index) => {
          if (index === recipeElements.length - 2) {
            return [value, " = "];
          }
          return [value, " + "];
        })
        .slice(0, -1)}
    </Space>
  );
}

export default function ItemInfo() {
  const [itemDetails, setItemDetails] = useState<Item>();
  const {
    params: { assetid = "" },
  } = useRouter();
  const [loading, setLoading] = useState(false);
  // 作为合成物的合成路径
  const [recipeForCreation, setRecipeForCreation] = useState<Recipe>();
  // 作为配方的多个合成路径
  const [recipesUsedIn, setRecipesUsedIn] = useState<Recipe[]>([]);

  useEffect(() => {
    if (assetid) {
      setLoading(true);
      getItems()
        .then((res) => {
          const item = res.result?.data?.data?.find((i) => i.asset_id === assetid);
          setItemDetails(item);
          Taro.setNavigationBarTitle({
            title: item?.name || "默认物品",
          });
        })
        .catch(() => {
          Taro.showToast({
            title: "获取物品信息失败",
            icon: "error",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [assetid]);

  useEffect(() => {
    if (assetid) {
      setLoading(true);
      getRecipes().then((res) => {
        const recipes = res.result?.data?.data;
        setRecipeForCreation(recipes?.find((r) => r.result_id === assetid));
        setRecipesUsedIn(recipes?.filter(({ slot_1, slot_2, slot_3 }) => [slot_1, slot_2, slot_3].includes(assetid)));
      });
    }
  }, [assetid]);

  useEffect(() => {
    if (loading) {
      Taro.showLoading({
        title: "加载物品信息中...",
      });
    } else {
      Taro.hideLoading();
    }
  }, [loading]);

  return (
    <View>
      <Cell.Group title="基本信息">
        <Cell
          title="物品名称"
          extra={
            itemDetails ? (
              <Space>
                <Image
                  src={`${POCKET_MORTYS_MEDIA_URL}/sprites/items/icon/50x50/${itemDetails?.asset_id || ""}Icon.png`}
                  style={{ width: 18 }}
                  mode="widthFix"
                  lazyLoad
                />
                <Text>{itemDetails?.name}</Text>
              </Space>
            ) : null
          }
        />
        <Cell title="物品类型" extra={itemDetails?.in_multiplayer ? itemDetails?.mp_type : itemDetails?.sp_type} />
        <Cell
          title="花费"
          extra={
            <Space>
              <Image
                src={`${POCKET_MORTYS_MEDIA_URL}/images/ui/${
                  itemDetails?.in_multiplayer ? "ItemCoinMPIcon" : "ItemCoinIcon"
                }.png`}
                style={{ width: 18 }}
                mode="widthFix"
                lazyLoad
              />
              <Text>{itemDetails?.in_multiplayer ? itemDetails?.mp_cost : itemDetails?.sp_cost}</Text>
            </Space>
          }
        />
        <Cell title="物品描述" extra={itemDetails?.description} />
      </Cell.Group>

      <Cell.Group title="合成路径">
        <Cell style={{ display: "block" }}>
          {recipeForCreation ? renderRecipeFormula(recipeForCreation) : <Text>暂无合成路径</Text>}
        </Cell>
      </Cell.Group>

      <Cell.Group title="作为配方">
        {recipesUsedIn?.length ? (
          recipesUsedIn.map((recipe) => (
            <Cell key={recipe.id} style={{ display: "block" }}>
              {renderRecipeFormula(recipe)}
            </Cell>
          ))
        ) : (
          <Cell style={{ display: "block" }}>
            <Text>暂无被作为配方使用</Text>
          </Cell>
        )}
      </Cell.Group>

      <SafeArea position="bottom" />
    </View>
  );
}
