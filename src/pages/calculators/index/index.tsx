import { View } from "@tarojs/components";
import { Cell } from "@nutui/nutui-react-taro";
import Taro from "@tarojs/taro";
import { ArrowRight } from "@nutui/icons-react-taro";

import "./index.scss";

const NAVS: { title: string; path?: string }[] = [
  // {
  //   title: "伤害",
  // },
  // {
  //   title: "服从性",
  // },
  // {
  //   title: "EV值",
  // },
  {
    title: "IV值",
    path: "/pages/calculators/ivs/index",
  },
  // {
  //   title: "属性值",
  // },
];

export default function Calculators() {
  return (
    <View>
      <Cell.Group>
        {NAVS.map(({ title, path }, index) => (
          <Cell
            key={index}
            title={title}
            clickable
            extra={<ArrowRight />}
            onClick={() => {
              if (path) {
                Taro.navigateTo({ url: path });
              } else {
                Taro.showToast({
                  title: "开发中敬请期待",
                  icon: "error",
                });
              }
            }}
          />
        ))}
      </Cell.Group>
    </View>
  );
}
