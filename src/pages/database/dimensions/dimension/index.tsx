import { View, Image, Text, ScrollView } from "@tarojs/components";
import Taro, { useRouter, useDidShow } from "@tarojs/taro";
import { useEffect, useMemo, useState } from "react";
import { Cell, HoverButton, Popup, SafeArea, Space } from "@nutui/nutui-react-taro";
import { DIMENSIONS, MORTY_TYPES, RARITIES } from "@/constants";
import { POCKET_MORTYS_MEDIA_URL } from "@/api/request";
import { getDimensionDetails, type DimensionDetail } from "@/api/database";
import { groupBy, capitalize, mapValues } from "lodash-es";
import { Tips } from "@nutui/icons-react-taro";

import "./index.scss";
import MortysStatistics from "./MortysStatistics";

export default function Dimension() {
  // name 为维度名称
  const {
    params: { name },
  } = useRouter<{ name: string }>();
  const dimensionIndex = DIMENSIONS[name]?.index;
  const [dimensionDetails, setDimensionDetails] = useState<DimensionDetail[]>([]);
  // 基于稀有度分类
  const mortysByRarity = useMemo(() => groupBy(dimensionDetails, "rarity"), [dimensionDetails]);
  // 基于类型分类
  const mortysAmountByType = useMemo(
    () => mapValues(groupBy(dimensionDetails, "morty_type"), (details) => details.length ?? 0),
    [dimensionDetails]
  );
  const [showStatistics, setShowStatistics] = useState(false);

  useDidShow(() => {
    Taro.setNavigationBarTitle({
      title: name,
    });
  });

  useEffect(() => {
    if (dimensionIndex) {
      Taro.showLoading({
        title: "加载维度信息中...",
      });
      getDimensionDetails(dimensionIndex)
        .then((res) => {
          // 这里稀有度去掉结尾的 s, 同时类型改成首字母大写, Normal 类型不再为空字符串
          const details =
            res.result?.data?.data?.map((item) => ({
              ...item,
              rarity: item.rarity.replace(/s$/, ""),
              morty_type: capitalize(item.morty_type) || "Normal",
            })) || [];
          setDimensionDetails(details);
        })
        .catch(() => {
          Taro.showToast({
            title: "获取维度失败",
            icon: "error",
          });
        })
        .finally(() => {
          Taro.hideLoading();
        });
    }
  }, [dimensionIndex]);

  return (
    <View>
      <Cell>
        <Image
          src={`${POCKET_MORTYS_MEDIA_URL}/images/ui/dimensions/Background_${dimensionIndex}.png`}
          style={{ width: "100%" }}
          mode="widthFix"
        />
      </Cell>

      {Object.entries(mortysByRarity)?.map(([rarity, details]) => (
        <Cell.Group divider={false} key={rarity}>
          <Cell
            radius={0}
            title={
              <Space>
                <Image src={RARITIES[rarity]?.img} lazyLoad mode="widthFix" style={{ width: 18 }} />
                <Text>{rarity}</Text>
              </Space>
            }
            extra={details?.length}
            style={{ "--nutui-cell-background-color": RARITIES[rarity]?.color?.primary } as React.CSSProperties}
          />
          <ScrollView style={{ maxHeight: 300 }} scrollY>
            {details.map(({ id, morty_name, morty_type, morty_asset_id }) => {
              return (
                <Cell
                  radius={0}
                  key={id}
                  style={{ "--nutui-cell-background-color": RARITIES[rarity]?.color?.light } as React.CSSProperties}
                  title={
                    <Space>
                      <Image
                        src={`${POCKET_MORTYS_MEDIA_URL}/assets/${morty_asset_id}Icon.png`}
                        lazyLoad
                        mode="widthFix"
                        style={{ width: 18 }}
                      />
                      <Text>{morty_name}</Text>
                    </Space>
                  }
                  extra={
                    MORTY_TYPES[morty_type]?.img ? (
                      <Image src={MORTY_TYPES[morty_type]?.img} style={{ width: 18 }} mode="widthFix" />
                    ) : (
                      <Text>Type</Text>
                    )
                  }
                />
              );
            })}
          </ScrollView>
        </Cell.Group>
      ))}

      <Popup
        closeable
        visible={showStatistics}
        title={`${name} 莫蒂统计`}
        onClose={() => {
          setShowStatistics(false);
        }}
        position="bottom"
      >
        <MortysStatistics total={dimensionDetails.length} mortysAmountByType={mortysAmountByType} />
      </Popup>

      <HoverButton
        icon={<Tips />}
        onClick={() => {
          setShowStatistics(true);
        }}
      />

      <SafeArea position="bottom" />
    </View>
  );
}
