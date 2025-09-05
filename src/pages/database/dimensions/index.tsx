import { View, Text } from "@tarojs/components";
import { Cell, Space } from "@nutui/nutui-react-taro";
import { DIMENSIONS } from "@/constants";
import { ArrowRight, Instocks } from "@nutui/icons-react-taro";
import Taro from "@tarojs/taro";

import "./index.scss";

export default function Dimensions() {
  return (
    <View>
      <Cell.Group>
        <Cell title="多人模式里的维度" />
        <Cell style={{ display: "block" }}>
          <View>在口袋莫蒂的多人模式中，目前共有 7 个可探索的维度. 它们分别是: </View>
          <ul>
            <li>Mortyland (Dimension 1)</li>
            <li>Plumbubo Prime (Dimension 2)</li>
            <li>Mortopia (Dimension 3)</li>
            <li>GF Mortanic (Dimension 4)</li>
            <li>Anime Dimension (Dimension 5)</li>
            <li>Anatomy Park (Dimension 6)</li>
            <li>Froopyland (Dimension 7)</li>
          </ul>
          <View>每个维度中可捕捉的莫蒂种类不同.</View>
        </Cell>
      </Cell.Group>
      <Cell.Group>
        {Object.entries(DIMENSIONS).map(([dimension, { color }]) => (
          <Cell
            onClick={() => {
              Taro.navigateTo({
                url: `/pages/database/dimensions/dimension/index?name=${dimension}`,
              });
            }}
            key={dimension}
            title={
              <Space>
                <Instocks color={color} />
                <Text style={{ color }}>{dimension}</Text>
              </Space>
            }
            extra={<ArrowRight />}
          />
        ))}
      </Cell.Group>
    </View>
  );
}
