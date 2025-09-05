import { View } from "@tarojs/components";
import { Cell } from "@nutui/nutui-react-taro";
import Taro from "@tarojs/taro";
import { ArrowRight } from "@nutui/icons-react-taro";

import "./index.scss";

const NAVS: { title: string; path?: string }[] = [
  {
    title: "战斗",
  },
  {
    title: "最佳莫蒂",
  },
  {
    title: "制作食谱",
  },
  {
    title: "挑战",
  },
  {
    title: "瑞克俱乐部",
  },
  {
    title: "战斗坑",
  },
  {
    title: "公式",
  },
  {
    title: "IV值和EV值",
  },
  {
    title: "莫蒂合成表",
  },
  {
    title: "莫蒂阶梯强度榜",
  },
  {
    title: "新手指南",
  },
  {
    title: "Raids (团队副本)",
  },
];

export default function Guides() {
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
