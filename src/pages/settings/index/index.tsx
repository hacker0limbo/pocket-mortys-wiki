import { View, Text } from "@tarojs/components";
import { Button, Cell, SafeArea } from "@nutui/nutui-react-taro";
import { ArrowRight } from "@nutui/icons-react-taro";
import Taro from "@tarojs/taro";

import "./index.scss";

export default function Settings() {
  return (
    <View>
      <Cell.Group>
        <Cell
          title="关于口袋莫蒂"
          extra={<ArrowRight />}
          clickable
          onClick={() => {
            Taro.navigateTo({ url: "/pages/settings/about/index" });
          }}
        />
      </Cell.Group>

      <SafeArea position="bottom" />
    </View>
  );
}
