import { View, Text, Image } from "@tarojs/components";
import { useEffect, useState } from "react";
import { getRaids, type Raid } from "@/api/database";
import Taro from "@tarojs/taro";
import { HoverButton, Popup, SafeArea, Space, Table, TableColumnProps } from "@nutui/nutui-react-taro";
import { Ask } from "@nutui/icons-react-taro";
import * as cheerio from "cheerio";
import { POCKET_MORTYS_BASE_URL, POCKET_MORTYS_MEDIA_URL } from "@/api/request";
import RaidsNote from "./RaidsNote";

import "./index.scss";

export default function Raids() {
  const [raids, setRaids] = useState<Raid[]>([]);
  const [showNote, setShowNote] = useState(false);

  const columns: TableColumnProps[] = [
    {
      key: "event_number",
      title: "#",
    },
    {
      key: "raid_boss",
      title: "Raid Boss",
      fixed: "left",
      render: ({ raid_boss }: Raid) => {
        const $ = cheerio.load(raid_boss);
        const bossImg = `${POCKET_MORTYS_BASE_URL}${$("img").attr("src")}`;
        const bossName = $("a").text();
        return (
          <Space>
            <Image src={bossImg} style={{ width: 18 }} mode="widthFix" lazyLoad />
            <Text>{bossName}</Text>
          </Space>
        );
      },
    },
    {
      key: "type",
      title: "类型",
      render: ({ type }: Raid) => {
        return <View dangerouslySetInnerHTML={{ __html: type }} />;
      },
    },
    {
      key: "special_reward",
      title: "特别奖励",
      render: ({ special_reward }: Raid) => {
        const $ = cheerio.load(special_reward);
        // 这里鸟人官方的接口没有大写, 手动修复一下
        const mortyAssetId = $("span")
          .attr("class")
          ?.split("_")
          ?.pop()
          ?.replace("Icon", "")
          ?.replace("Birdperson", "BirdPerson");
        const mortyName = $("a").text();

        return (
          <Space>
            <Image
              src={`${POCKET_MORTYS_MEDIA_URL}/assets/${mortyAssetId}Icon.png`}
              style={{ width: 18, maxHeight: 20 }}
              mode="widthFix"
              lazyLoad
            />
            <Text
              className="link"
              onClick={() => {
                Taro.navigateTo({
                  url: `/pages/database/mortys/morty/index?assetid=${mortyAssetId}`,
                });
              }}
            >
              {mortyName}
            </Text>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    Taro.showLoading({
      title: "加载副本中...",
    });
    getRaids()
      .then((res) => {
        setRaids(res.result?.data?.data);
      })
      .catch(() => {
        Taro.showToast({
          title: "加载副本失败",
          icon: "error",
        });
      })
      .finally(() => {
        Taro.hideLoading();
      });
  }, []);

  return (
    <View>
      <Table columns={columns} data={raids} />

      <HoverButton
        icon={<Ask />}
        onClick={() => {
          setShowNote(true);
        }}
      />
      <Popup
        title="说明"
        visible={showNote}
        position="bottom"
        closeable
        onClose={() => {
          setShowNote(false);
        }}
      >
        <RaidsNote />
      </Popup>
      <SafeArea position="bottom" />
    </View>
  );
}
