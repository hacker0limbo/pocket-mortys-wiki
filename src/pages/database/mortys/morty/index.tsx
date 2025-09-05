import Taro, { useRouter, useDidShow } from "@tarojs/taro";
import {
  Tabs,
  Card,
  Cell,
  Avatar,
  type TabPaneProps,
  SafeArea,
  Space,
  ImagePreview,
  TableColumnProps,
  Table,
} from "@nutui/nutui-react-taro";
import { useCallback, useEffect, useMemo, useState } from "react";
import { type Morty, getMortyAttacks, getMortys, type MortyAttack } from "@/api/database";
import { Image, View, Text } from "@tarojs/components";
import { POCKET_MORTYS_MEDIA_URL } from "@/api/request";
import { parseMortyName, parseMortyRarity, parseMortyType, getMortyPortraits, getMortySprites } from "@/utils";
import { RARITIES } from "@/constants";
import { ArrowRight } from "@nutui/icons-react-taro";
import { Link } from "@/components";
import { words } from "lodash-es";

import "./index.scss";

export default function MortyInfo() {
  const {
    params: { assetid = "MortyDefault" },
  } = useRouter();
  const [mortyDetails, setMortyDetails] = useState<Morty>();
  const [currentTab, setCurrentTab] = useState<string>("baseInfo");
  const [loading, setLoading] = useState(false);
  const [showPortraits, setShowPortraits] = useState(false);
  const [showSprites, setShowSprites] = useState(false);
  const [mortyAttacks, setMortyAttacks] = useState<MortyAttack[]>([]);

  useEffect(() => {
    if (assetid) {
      setLoading(true);
      getMortys()
        .then((res) => {
          const morty = res.result?.data?.data?.find((m) => m.assetid === assetid);
          // 这里先进行预处理一下
          const nameText = parseMortyName(morty?.name);
          const typeText = parseMortyType(morty?.type);
          const rarityText = parseMortyRarity(morty?.rarity);

          setMortyDetails({ ...morty, name: nameText, type: typeText, rarity: rarityText } as Morty);

          Taro.setNavigationBarTitle({
            title: nameText || "莫蒂",
          });
        })
        .catch(() => {
          Taro.showToast({
            title: "获取莫蒂基本信息失败",
            icon: "error",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [assetid]);

  useEffect(() => {
    if (assetid) {
      setLoading(true);
      getMortyAttacks(assetid)
        .then((res) => {
          // 首个技能为默认技能, 不展示
          setMortyAttacks(res.result?.data?.slice(1));
        })
        .catch(() => {
          Taro.showToast({
            title: "获取技能列表失败",
            icon: "error",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [assetid]);

  useEffect(() => {
    if (loading) {
      Taro.showLoading({
        title: "获取莫蒂信息中...",
      });
    } else {
      Taro.hideLoading();
    }
  }, [loading]);

  const columns: TableColumnProps[] = useMemo(
    () => [
      {
        key: "label",
        title: "技能名称",
        render: ({ label, value }: MortyAttack) => {
          return (
            <Link
              onClick={() => {
                const attackWords = words(value).slice(1);
                const nameEn = attackWords.join(" ").replace("And", "&");
                Taro.navigateTo({
                  url: `/pages/database/attacks/attack/index?name=${label}&nameEn=${nameEn}`,
                });
              }}
            >
              {label}
            </Link>
          );
        },
      },
      {
        key: "attack_level",
        title: "习得等级",
        render: ({ customProperties }: MortyAttack) => {
          return <Text>{customProperties?.attack_level}</Text>;
        },
      },
      {
        key: "attack_element",
        title: "技能类型",
        render: ({ customProperties }: MortyAttack) => {
          const { attack_element } = customProperties;
          return (
            <Space>
              {attack_element !== "Normal" ? (
                <Image
                  src={`${POCKET_MORTYS_MEDIA_URL}/images/${attack_element.toLowerCase()}.png`}
                  lazyLoad
                  mode="widthFix"
                  style={{ width: 18 }}
                />
              ) : null}
              <Text>{attack_element}</Text>
            </Space>
          );
        },
      },
    ],
    []
  );

  const tabs = useMemo<Array<Partial<TabPaneProps> & { content: React.ReactNode }>>(
    () => [
      {
        title: "基本信息",
        value: "baseInfo",
        content: (
          <Cell.Group>
            <Cell
              title="名称"
              extra={
                <Space>
                  <Image
                    src={`${POCKET_MORTYS_MEDIA_URL}/assets/${mortyDetails?.assetid ?? assetid}Icon.png`}
                    style={{ width: 18 }}
                    mode="widthFix"
                  />
                  <Text>{mortyDetails?.name}</Text>
                </Space>
              }
            />
            <Cell title="编号" extra={<Text>#{mortyDetails?.number}</Text>} />
            <Cell
              title="类型"
              extra={
                <Space>
                  {mortyDetails?.type && mortyDetails?.type !== "Normal" ? (
                    <Image
                      src={`${POCKET_MORTYS_MEDIA_URL}/images/${mortyDetails?.type.toLowerCase()}.png`}
                      lazyLoad
                      mode="widthFix"
                      style={{ width: 18 }}
                    />
                  ) : null}
                  <Text>{mortyDetails?.type}</Text>
                </Space>
              }
            />
            <Cell
              title="稀有度"
              extra={
                <Space>
                  <Image src={RARITIES[mortyDetails?.rarity ?? "Common"].img} mode="widthFix" style={{ width: 18 }} />
                  <Text>{mortyDetails?.rarity}</Text>
                </Space>
              }
            />
            <Cell title="基础经验值" extra={mortyDetails?.basexp} />
            <Cell title="基础生命值" extra={mortyDetails?.basehp} />
            <Cell title="基础攻击力" extra={mortyDetails?.baseatk} />
            <Cell title="基础防御力" extra={mortyDetails?.basedef} />
            <Cell title="基础速度" extra={mortyDetails?.basespd} />
            <Cell title="总属性值" extra={mortyDetails?.stattotal} />
            <Cell
              title="查看全身图"
              clickable
              extra={<ArrowRight />}
              onClick={() => {
                setShowPortraits(true);
              }}
            />
            <Cell
              title="查看雪碧图"
              clickable
              extra={<ArrowRight />}
              onClick={() => {
                setShowSprites(true);
              }}
            />
          </Cell.Group>
        ),
      },
      {
        title: "技能组",
        value: "attacks",
        content: (
          <Cell.Group>
            <Cell style={{ display: "block" }}>
              <Table style={{ boxSizing: "border-box" }} data={mortyAttacks} columns={columns} />
            </Cell>
          </Cell.Group>
        ),
      },
    ],
    [mortyDetails, assetid, mortyAttacks, columns]
  );

  const renderContent = useCallback(() => {
    return tabs.find((t) => t.value === currentTab)?.content;
  }, [currentTab, tabs]);

  return (
    <View>
      <Tabs
        value={currentTab}
        onChange={(value) => {
          setCurrentTab(value as string);
        }}
      >
        {tabs.map(({ title, value, content }) => (
          <Tabs.TabPane key={value} title={title} value={value} />
        ))}
      </Tabs>

      {renderContent()}

      <ImagePreview
        visible={showPortraits}
        images={getMortyPortraits(mortyDetails?.assetid).map((s) => ({ src: s }))}
        closeIcon
        onClose={() => {
          setShowPortraits(false);
        }}
      />

      <ImagePreview
        visible={showSprites}
        images={getMortySprites(mortyDetails?.assetid).map((s) => ({ src: s }))}
        closeIcon
        onClose={() => {
          setShowSprites(false);
        }}
      />

      <SafeArea position="bottom" />
    </View>
  );
}
