import { View } from "@tarojs/components";
import { Cell } from "@nutui/nutui-react-taro";
import Taro from "@tarojs/taro";
import { ArrowRight } from "@nutui/icons-react-taro";

import "./index.scss";

const NAVS: { title: string; path?: string }[] = [
  {
    title: "战斗",
    path: "/pages/guides/battling/index",
  },
  {
    title: "最佳莫蒂",
    path: "/pages/guides/best-mortys/index",
  },
  {
    title: "制作食谱",
    path: "/pages/database/recipes/index",
  },
  {
    title: "挑战",
  },
  {
    title: "瑞克俱乐部",
    path: "/pages/guides/club-rick/index",
  },
  {
    title: "斗技场",
    path: "/pages/guides/fight-pits/index",
  },
  {
    title: "公式",
  },
  {
    title: "IV值和EV值",
    path: "/pages/guides/ivs-evs/index",
  },
  {
    title: "莫蒂合成表",
    path: "/pages/guides/morty-combinations/index",
  },
  {
    title: "莫蒂强度榜",
  },
  // {
  //   title: "新手指南",
  // },
  {
    title: "Raids (团队副本)",
    path: "/pages/guides/raids/index",
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
                  title: "暂不支持小程序, 请前往官网查看具体内容",
                  icon: "none",
                });
              }
            }}
          />
        ))}
      </Cell.Group>
    </View>
  );
}
