import { Image, View, Text, ScrollView } from "@tarojs/components";
import { Cell, SafeArea, Space, Switch } from "@nutui/nutui-react-taro";
import { useEffect, useMemo, useState } from "react";
import { type MortyCombo, getMortyCombos } from "@/api/guides";
import Taro from "@tarojs/taro";
import { POCKET_MORTYS_MEDIA_URL } from "@/api/request";

import "./index.scss";

const CombineArrow = () => (
  <Image src={`${POCKET_MORTYS_MEDIA_URL}/images/combine.png`} style={{ width: 20 }} mode="widthFix" />
);

type MortyItemProps = {
  name: string;
  assetid: string;
  number: string;
  quantity: string | null;
};

const MortyItem = ({ name, assetid, number, quantity }: MortyItemProps) => {
  return (
    <Space direction="vertical" align="center" style={{ "--nutui-space-gap": "2px" } as React.CSSProperties}>
      <Space>
        <Image src={`${POCKET_MORTYS_MEDIA_URL}/assets/${assetid}Icon.png`} style={{ width: 24 }} mode="widthFix" />
        <Text style={{ marginLeft: 4 }}>{quantity ? ` (${quantity}) ` : ""}</Text>
      </Space>
      <Text
        className="link"
        onClick={() => {
          Taro.navigateTo({
            url: `/pages/database/mortys/morty/index?assetid=${assetid}`,
          });
        }}
      >
        #{number} - {name}
      </Text>
    </Space>
  );
};

export default function MortyCombinations() {
  const [combos, setCombos] = useState<MortyCombo[]>([]);
  const [showEvolvableOnly, setShowEvolvableOnly] = useState(true);

  const filteredCombos = useMemo(
    () => (showEvolvableOnly ? combos.filter((combo) => combo.morty_2_name) : combos),
    [combos, showEvolvableOnly]
  );

  useEffect(() => {
    Taro.showLoading({
      title: "加载合成列表中...",
    });
    getMortyCombos()
      .then((res) => {
        setCombos(res.result?.data?.data);
      })
      .catch(() => {
        Taro.showToast({
          title: "获取合成列表失败",
          icon: "error",
        });
      })
      .finally(() => {
        Taro.hideLoading();
      });
  }, []);

  return (
    <View>
      <Cell title={`共检索到 ${filteredCombos.length} 个合成方案`} />
      <Cell.Group>
        <Cell
          align="center"
          title="仅显示可进化的莫蒂"
          extra={
            <Switch
              checked={showEvolvableOnly}
              onChange={(value) => {
                setShowEvolvableOnly(value);
              }}
            />
          }
        />
        {filteredCombos.map((combo) => {
          const { id, morty_1_name, morty_2_name, morty_3_name, morty_4_name, morty_5_name, morty_6_name } = combo;
          // 过滤掉 null
          const mortys = [morty_1_name, morty_2_name, morty_3_name, morty_4_name, morty_5_name, morty_6_name].filter(
            Boolean
          );
          const mortyElements = mortys
            .flatMap((name, index) => {
              return [
                <MortyItem
                  key={`${id}-${index}-item`}
                  name={name!}
                  assetid={combo[`morty_${index + 1}_asset_id`]}
                  number={combo[`morty_${index + 1}_number`]}
                  quantity={combo[`morty_${index + 1}_quantity`]}
                />,
                <CombineArrow key={`${id}-${index}-arrow`} />,
              ];
            })
            .slice(0, -1);

          return (
            <Cell key={id} style={{ display: "block" }}>
              <ScrollView scrollX>
                <Space align="center">{mortyElements}</Space>
              </ScrollView>
            </Cell>
          );
        })}
      </Cell.Group>

      <SafeArea position="bottom" />
    </View>
  );
}
