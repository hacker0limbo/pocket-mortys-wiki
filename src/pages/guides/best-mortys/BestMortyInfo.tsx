import { POCKET_MORTYS_MEDIA_URL } from "@/api/request";
import { Space } from "@nutui/nutui-react-taro";
import { View, Text, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";

export type BestMorty = {
  level: string;
  name: string;
  assetid: string;
  desc: string;
};

export function BestMortyInfo({ assetid, desc, level, name }: BestMorty) {
  return (
    <View key={assetid}>
      <h4>
        <Space align="center">
          <Text> {level} 级:</Text>
          <Image src={`${POCKET_MORTYS_MEDIA_URL}/assets/${assetid}Icon.png`} style={{ width: 18 }} mode="widthFix" />
          <Text
            className="link"
            onClick={() => {
              Taro.navigateTo({
                url: `/pages/database/mortys/morty/index?assetid=${assetid}`,
              });
            }}
          >
            {name}
          </Text>
        </Space>
      </h4>
      <Text>{desc}</Text>
    </View>
  );
}
