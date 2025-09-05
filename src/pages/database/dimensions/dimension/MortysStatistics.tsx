import { MORTY_TYPES } from "@/constants";
import { Cell, SafeArea, Space } from "@nutui/nutui-react-taro";
import { Image, Text, View } from "@tarojs/components";

type MortysStatisticsProps = {
  // 莫蒂总数
  total: number;
  // 基于类型分类的莫蒂数量
  mortysAmountByType: Record<string, number>;
};

export default function MortysStatistics({ total, mortysAmountByType }: MortysStatisticsProps) {
  return (
    <View>
      <Cell.Group>
        <Cell title="总莫蒂数" extra={total} />
        {Object.entries(MORTY_TYPES).map(([value, { img }]) => (
          <Cell
            key={value}
            title={
              <Space>
                {img ? <Image src={img} mode="widthFix" style={{ width: 18 }} /> : null}
                <Text>{value}</Text>
              </Space>
            }
            extra={mortysAmountByType[value]}
          />
        ))}
      </Cell.Group>
      <SafeArea position="bottom" />
    </View>
  );
}
