import { View, Image } from "@tarojs/components";
import Taro, { setClipboardData } from "@tarojs/taro";
import { Cell, SafeArea } from "@nutui/nutui-react-taro";
import { ArrowRight, Tips } from "@nutui/icons-react-taro";
import { POCKET_MORTYS_BASE_URL } from "@/api/request";

import "./index.scss";

const DOWNLOAD_IMAGES = [
  {
    path: `${POCKET_MORTYS_BASE_URL}/images/download-app-store.png`,
    address: "https://apps.apple.com/us/app/rick-and-morty-pocket-mortys/id992640880",
  },
  {
    path: `${POCKET_MORTYS_BASE_URL}/images/download-google-play.png`,
    address: "https://play.google.com/store/apps/details?id=com.turner.pocketmorties",
  },
];

const NAVS = [
  {
    title: "数据库",
    path: "/pages/database/index/index",
  },
  {
    title: "指南",
    path: "/pages/guides/index/index",
  },
  {
    title: "计算器",
    path: "/pages/calculators/index/index",
  },
  {
    title: "强度榜",
    path: "/pages/guides/morty-tiers/index",
  },
  {
    title: "常见问题解答",
    path: "/pages/faq/index",
  },
];

export default function Index() {
  return (
    <View>
      <Cell>
        <Image
          src={`${POCKET_MORTYS_BASE_URL}/templates/g5_hydrogen/custom/images/pm-logo-2023.jpg`}
          mode="widthFix"
          style={{ width: "100%" }}
        />
      </Cell>

      <Cell.Group>
        <Cell
          title="下载口袋莫蒂"
          extra={
            <Tips
              onClick={() => {
                Taro.showToast({
                  title: "点击图片复制下载链接后请在浏览器中打开",
                  icon: "none",
                  duration: 3000,
                });
              }}
            />
          }
        />
        <Cell>
          <View style={{ display: "flex", width: "100%", gap: 12 }}>
            {DOWNLOAD_IMAGES.map(({ path, address }, index) => (
              <Image
                key={index}
                src={path}
                mode="widthFix"
                onClick={() => {
                  setClipboardData({
                    data: address,
                    success: () => {
                      Taro.showToast({
                        title: "下载地址已复制",
                        icon: "success",
                      });
                    },
                  });
                }}
              />
            ))}
          </View>
        </Cell>
      </Cell.Group>

      <Cell.Group>
        <Cell title="功能导航" />
        {NAVS.map(({ title, path }) => (
          <Cell
            clickable
            key={title}
            title={title}
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
            extra={<ArrowRight />}
          />
        ))}
      </Cell.Group>

      <SafeArea position="bottom" />
    </View>
  );
}
