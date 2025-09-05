import { View, Text, Image } from "@tarojs/components";
import { useEffect, useState } from "react";
import { getNPCs, type NPC } from "@/api/database";
import Taro from "@tarojs/taro";
import { SafeArea, Space, Table, TableColumnProps, ImagePreview } from "@nutui/nutui-react-taro";
import * as cheerio from "cheerio";
import { POCKET_MORTYS_MEDIA_URL } from "@/api/request";
import { Link } from "@/components";

import "./index.scss";

export default function NPCs() {
  const [npcs, setNPCs] = useState<NPC[]>([]);
  const [selectedNPC, setSelectedNPC] = useState<NPC>();

  const columns: TableColumnProps[] = [
    {
      key: "id",
      title: "#",
    },
    {
      key: "npc_name",
      title: "名称",
      fixed: "left",
      render: (npc: NPC) => {
        const { npc_name, npc_asset } = npc;
        const $ = cheerio.load(npc_name);
        const nameText = $("a").text();
        return (
          <Space align="center">
            <Image
              src={`${POCKET_MORTYS_MEDIA_URL}/assets/${npc_asset}Front.png`}
              style={{ width: 18 }}
              mode="widthFix"
              lazyLoad
            />
            <Link
              onClick={() => {
                setSelectedNPC(npc);
              }}
            >
              {nameText}
            </Link>
          </Space>
        );
      },
    },
    {
      key: "npc_type",
      title: "类型",
    },
    {
      key: "wanderer",
      title: "游荡",
      render: ({ wanderer }: NPC) => {
        return <Text>{wanderer === "Yes" ? "是" : "否"}</Text>;
      },
    },
    {
      key: "in_campaign",
      title: "战役模式?",
      render: ({ in_campaign }: NPC) => {
        return <Text>{in_campaign === "Yes" ? "是" : "否"}</Text>;
      },
    },
    {
      key: "purpose",
      title: "目的",
      render: ({ purpose }: NPC) => {
        return <View dangerouslySetInnerHTML={{ __html: purpose }} />;
      },
    },
  ];

  useEffect(() => {
    Taro.showLoading({
      title: "加载非玩家角色中...",
    });

    getNPCs()
      .then((res) => {
        setNPCs(res.result?.data?.data);
      })
      .catch(() => {
        Taro.showToast({
          title: "加载非玩家角色失败",
          icon: "error",
        });
      })
      .finally(() => {
        Taro.hideLoading();
      });
  }, []);

  return (
    <View>
      <Table columns={columns} data={npcs} />

      <ImagePreview
        visible={!!selectedNPC}
        closeIcon
        images={
          selectedNPC
            ? [
                {
                  src: `${POCKET_MORTYS_MEDIA_URL}/assets/${selectedNPC?.npc_asset}Front.png`,
                },
              ]
            : []
        }
        onClose={() => {
          setSelectedNPC(undefined);
        }}
      />
      <SafeArea position="bottom" />
    </View>
  );
}
