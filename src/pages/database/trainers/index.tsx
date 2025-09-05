import { Image, View, Text } from "@tarojs/components";
import { HoverButton, Popup, SafeArea, Space, Table, TableColumnProps } from "@nutui/nutui-react-taro";
import { useEffect, useState } from "react";
import { Tips } from "@nutui/icons-react-taro";
import { type Trainer, getTrainers } from "@/api/database";
import Taro from "@tarojs/taro";
import { POCKET_MORTYS_BASE_URL, POCKET_MORTYS_MEDIA_URL } from "@/api/request";
import TrainersNote from "./TrainersNote";

import "./index.scss";

export default function Trainers() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [showTrainersNote, setShowTrainersNote] = useState(false);

  const columns: TableColumnProps[] = [
    {
      key: "id",
      title: "#",
    },
    {
      key: "name",
      title: "训练师名称",
      fixed: "left",
      render: ({ name, asset_id }: Trainer) => {
        return (
          <Space>
            <Image
              src={`${POCKET_MORTYS_BASE_URL}/images/assets/${asset_id}Down_1.png`}
              lazyLoad
              style={{ width: 18 }}
              mode="widthFix"
            />
            <Text>{name}</Text>
          </Space>
        );
      },
    },
    {
      key: "type",
      title: "训练师类型",
    },
    {
      key: "morties",
      title: "训练师的莫蒂",
      render: ({ morties }: Trainer) => {
        if (typeof morties === "string") {
          return <Text>{morties}</Text>;
        }

        return morties?.map(({ id, asset_id, morty_name }) => (
          <Space key={id}>
            <Image
              src={`${POCKET_MORTYS_MEDIA_URL}/assets/${asset_id}Icon.png`}
              lazyLoad
              style={{ width: 18 }}
              mode="widthFix"
            />
            <Text>{morty_name}</Text>
          </Space>
        ));
      },
    },
    {
      key: "trainer_items",
      title: "使用的物品",
      render: ({ trainer_items }: Trainer) => {
        if (typeof trainer_items === "string") {
          return <Text>{trainer_items}</Text>;
        }

        return trainer_items?.map(({ item_id, name }, index) => (
          <Space key={index}>
            <Image
              src={`${POCKET_MORTYS_MEDIA_URL}/assets/${item_id}Icon.png`}
              lazyLoad
              style={{ width: 18 }}
              mode="widthFix"
            />
            <Text>{name}</Text>
          </Space>
        ));
      },
    },
    {
      key: "rewards",
      title: "奖励",
      render: ({ rewards }: Trainer) => {
        if (typeof rewards === "string") {
          return <Text>{rewards}</Text>;
        }

        return rewards?.map(({ type, quantity, badge_id, trophy_id, trophy_name, item_name, item_id }, index) => {
          if (type === "COIN") {
            return (
              <Space key={index}>
                <Image
                  src={`${POCKET_MORTYS_MEDIA_URL}/images/ui/ItemCoinIcon.png`}
                  lazyLoad
                  style={{ width: 18 }}
                  mode="widthFix"
                />
                <Text>莫元</Text>
              </Space>
            );
          } else if (type === "BADGE") {
            return (
              <Space key={index}>
                <Image
                  src={`${POCKET_MORTYS_MEDIA_URL}/images/ui/badge1.png`}
                  lazyLoad
                  style={{ width: 18 }}
                  mode="widthFix"
                />
                <Text>Badge {quantity ? `x ${quantity}` : ""}</Text>
              </Space>
            );
          } else if (type === "COUNCIL_BADGE") {
            return (
              <Space key={index}>
                <Image
                  src={`${POCKET_MORTYS_MEDIA_URL}/images/ui/councilbadge${badge_id}.png`}
                  lazyLoad
                  style={{ width: 18 }}
                  mode="widthFix"
                />
                <Text>Council Badge {quantity ? `x ${quantity}` : ""}</Text>
              </Space>
            );
          } else if (type === "COUPON") {
            return <Text key={index}>优惠券 {quantity ? `x ${quantity}` : ""}</Text>;
          } else if (type === "PORTAL_GUN") {
            return (
              <Space key={index}>
                <Image
                  src={`${POCKET_MORTYS_MEDIA_URL}/images/ui/PortalGunBtnUp.png`}
                  lazyLoad
                  style={{ width: 18 }}
                  mode="widthFix"
                />
                <Text>Portal Gun</Text>
              </Space>
            );
          } else if (type === "TOURNAMENT_TICKET") {
            return <Text key={index}>Tournament Ticket</Text>;
          } else if (type === "TROPHY") {
            return (
              <Space key={index}>
                <Image
                  src={`${POCKET_MORTYS_MEDIA_URL}/images/ui/${trophy_id}.png`}
                  lazyLoad
                  style={{ width: 12 }}
                  mode="widthFix"
                />
                <Text>{trophy_name} Trophy</Text>
              </Space>
            );
          } else if (type === "ITEM") {
            if (item_id) {
              return (
                <Space key={index}>
                  <Image
                    src={`${POCKET_MORTYS_MEDIA_URL}/assets/${item_id}Icon.png`}
                    lazyLoad
                    style={{ width: 18 }}
                    mode="widthFix"
                  />
                  <Text
                    className="link"
                    onClick={() => {
                      Taro.navigateTo({
                        url: `/pages/database/items/item/index?assetid=${item_id}`,
                      });
                    }}
                  >
                    {item_name}
                  </Text>
                </Space>
              );
            }
            return <Text key={index}>Random Item {quantity ? `x ${quantity}` : ""}</Text>;
          } else {
            return null;
          }
        });
      },
    },
  ];

  useEffect(() => {
    Taro.showLoading({
      title: "加载训练师中...",
    });
    getTrainers()
      .then((res) => {
        setTrainers(res.result?.data?.data);
      })
      .catch(() => {
        Taro.showToast({
          title: "获取训练师失败",
          icon: "error",
        });
      })
      .finally(() => {
        Taro.hideLoading();
      });
  }, []);

  return (
    <View>
      <Table columns={columns} data={trainers} />

      <Popup
        position="bottom"
        closeable
        visible={showTrainersNote}
        title="训练师说明"
        onClose={() => {
          setShowTrainersNote(false);
        }}
      >
        <TrainersNote />
      </Popup>
      <HoverButton
        icon={<Tips />}
        onClick={() => {
          setShowTrainersNote(true);
        }}
      />

      <SafeArea position="bottom" />
    </View>
  );
}
