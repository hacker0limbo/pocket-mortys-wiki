import { View, Text, Image } from "@tarojs/components";
import { Cell, Space } from "@nutui/nutui-react-taro";
import { POCKET_MORTYS_BASE_URL } from "@/api/request";
import "./index.scss";

const CurrentCreditPrices = [
  {
    credits: 5,
    prices: "$3.99",
  },
  {
    credits: 15,
    prices: "$9.99",
  },
  {
    credits: 40,
    prices: "19.99",
  },
  {
    credits: 125,
    prices: "49.99",
  },
  {
    credits: 300,
    prices: "99.99",
  },
];

export default function ClubRick() {
  return (
    <View>
      <Cell style={{ display: "block" }}>
        <Text>
          你可以在瑞克俱乐部购买莫蒂卡包，使用的是瑞克俱乐部积分。瑞克俱乐部
          积分可以通过在多人模式中提升你的训练师等级获得，或者通过游戏内购买获得
        </Text>
      </Cell>
      <Cell.Group>
        <Cell title="当前积分价格" />
        {CurrentCreditPrices.map(({ credits, prices }, index) => (
          <Cell
            key={index}
            title={
              <Space>
                <Image
                  src={`${POCKET_MORTYS_BASE_URL}/images/assets/CouponPack05.png`}
                  style={{ width: 18 }}
                  mode="widthFix"
                />
                <Text>{credits}</Text>
              </Space>
            }
            extra={prices}
          />
        ))}
      </Cell.Group>
    </View>
  );
}
