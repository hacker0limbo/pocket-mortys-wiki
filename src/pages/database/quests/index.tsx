import { View, Image, Text } from "@tarojs/components";
import { useEffect, useState } from "react";
import { type Quest, getQuests } from "@/api/database";
import Taro, { useReady } from "@tarojs/taro";
import { SafeArea, Space, Table, TableColumnProps } from "@nutui/nutui-react-taro";
import { POCKET_MORTYS_BASE_URL, POCKET_MORTYS_MEDIA_URL } from "@/api/request";
import * as cheerio from "cheerio";

import "./index.scss";

export default function Quests() {
  const [quests, setQuests] = useState<Quest[]>([]);

  const columns: TableColumnProps[] = [
    {
      key: "quest_number",
      title: "#",
    },
    {
      key: "quest_name",
      title: "任务名称",
      fixed: "left",
      render: ({ quest_name }: Quest) => {
        return <View dangerouslySetInnerHTML={{ __html: quest_name }} />;
      },
    },
    {
      key: "badges_required",
      title: "所需徽章",
    },
    {
      key: "quest_giver",
      title: "任务发布者",
      render: ({ quest_giver }: Quest) => {
        return (
          <View
            dangerouslySetInnerHTML={{
              __html: quest_giver.replace(/<a/g, "<div class='link'").replace(/<\/a>/g, "</div>"),
            }}
          />
        );
      },
    },
    {
      key: "items_accepted",
      title: "所需物品",
      render: ({ items_accepted }: Quest) => {
        const $ = cheerio.load(items_accepted);
        const items = $("a")
          .map((_, el) => {
            return {
              name: $(el).text(),
              assetid: $(el).find("img").attr("src")?.split("/")?.pop()?.replace("Icon.png", ""),
            };
          })
          .get();

        return (
          <View className="d-flex flex-column">
            {items.map(({ name, assetid }) => (
              <Space key={assetid}>
                <Image
                  src={`${POCKET_MORTYS_MEDIA_URL}/sprites/items/icon/28x28/${assetid}Icon.png`}
                  style={{ width: 18 }}
                  mode="widthFix"
                />
                <Text
                  className="link"
                  onClick={() => {
                    Taro.navigateTo({
                      url: `/pages/database/items/item/index?assetid=${assetid}`,
                    });
                  }}
                >
                  {name}
                </Text>
              </Space>
            ))}
          </View>
        );
      },
    },
    {
      key: "rewards",
      title: "任务奖励",
      render: ({ rewards }: Quest) => {
        const $ = cheerio.load(rewards);
        const items = $("a")
          .map((_, el) => {
            return {
              name: $(el).text(),
              assetid: $(el).find("img").attr("src")?.split("/")?.pop()?.replace("Icon.png", ""),
            };
          })
          .get();

        // 任务奖励可能是物品或者是莫蒂, 注意区分
        return (
          <View className="d-flex flex-column">
            {items.map(({ name, assetid }) => (
              <Space key={assetid}>
                <Image
                  src={`${POCKET_MORTYS_MEDIA_URL}/sprites/${
                    assetid?.startsWith("Item") ? "items" : "mortys"
                  }/icon/28x28/${assetid}Icon.png`}
                  style={{ width: 18 }}
                  mode="widthFix"
                />
                <Text
                  className="link"
                  onClick={() => {
                    Taro.navigateTo({
                      url: assetid?.startsWith("Item")
                        ? `/pages/database/items/item/index?assetid=${assetid}`
                        : `/pages/database/mortys/morty/index?assetid=${assetid}`,
                    });
                  }}
                >
                  {name}
                </Text>
              </Space>
            ))}
          </View>
        );
      },
    },
  ];

  useReady(() => {
    Taro.options.html!.transformElement = (el) => {
      if (el.nodeName === "image") {
        const src = el.getAttribute("src");
        el.setAttribute("src", `${POCKET_MORTYS_BASE_URL}${src}`);
        el.setAttribute("mode", "widthFix");
      }
      return el;
    };
  });

  useEffect(() => {
    Taro.showLoading({
      title: "加载任务中...",
    });
    getQuests()
      .then((res) => {
        setQuests(res.result?.data.data);
      })
      .catch(() => {
        Taro.showToast({
          title: "加载任务失败",
          icon: "error",
        });
      })
      .finally(() => {
        Taro.hideLoading();
      });
  }, []);

  return (
    <View>
      <Table data={quests} columns={columns} />
      <SafeArea position="bottom" />
    </View>
  );
}
