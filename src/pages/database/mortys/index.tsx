import { Image, View, Text } from "@tarojs/components";
import { useEffect, useMemo, useState } from "react";
import { getMortys, type Morty } from "@/api/database";
import {
  Table,
  Cell,
  SearchBar,
  Menu,
  type TableColumnProps,
  Space,
  Empty,
  Pagination,
  Checkbox,
  Tag,
  SafeArea,
} from "@nutui/nutui-react-taro";
import Taro from "@tarojs/taro";
import * as cheerio from "cheerio";
import { POCKET_MORTYS_MEDIA_URL } from "@/api/request";
import { DIMENSIONS, RARITIES, MORTY_TYPES } from "@/constants";
import { Link } from "@/components";
import { ArrowLeft, ArrowRight } from "@nutui/icons-react-taro";
import { parseMortyName, parseMortyRarity, parseMortyType } from "@/utils";
import { useSettingsStore } from "@/store";

import "./index.scss";

export default function Mortys() {
  const pageSize = useSettingsStore((state) => state.tablePageSize);
  const [mortys, setMortys] = useState<Morty[]>([]);
  const [current, setCurrent] = useState<number>(1);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(Object.keys(MORTY_TYPES));
  const [selectedRarities, setSelectedRarities] = useState<string[]>(Object.keys(RARITIES));
  const [selectedDimensions, setSelectedDimensions] = useState<string[]>(Object.keys(DIMENSIONS));
  const [searchedMortys, setSearchedMortys] = useState<Morty[]>([]);
  const filteredMortys = useMemo(
    () =>
      searchedMortys.filter(({ type, rarity, dimension_pools }) => {
        const typeText = parseMortyType(type);
        const rarityText = parseMortyRarity(rarity);
        const dimension = cheerio.load(dimension_pools)("a").text().trim();
        return (
          selectedTypes.includes(typeText) &&
          selectedRarities.includes(rarityText) &&
          selectedDimensions.includes(dimension)
        );
      }),
    [searchedMortys, selectedRarities, selectedTypes, selectedDimensions]
  );
  // 当前页展示的莫蒂
  const displayedMortys = useMemo(() => {
    return filteredMortys.slice((current - 1) * pageSize, current * pageSize);
  }, [filteredMortys, current, pageSize]);

  const columns: TableColumnProps[] = [
    { key: "id", title: "#" },
    {
      key: "name",
      title: "名称",
      fixed: "left",
      render: ({ name, assetid }: Morty) => {
        const nameText = parseMortyName(name);

        return (
          <Space>
            <Image
              src={`${POCKET_MORTYS_MEDIA_URL}/assets/${assetid}Icon.png`}
              lazyLoad
              mode="widthFix"
              style={{ width: 18 }}
            />
            <Link
              onClick={() => {
                Taro.navigateTo({
                  url: `/pages/database/mortys/morty/index?assetid=${assetid}`,
                });
              }}
            >
              {nameText}
            </Link>
          </Space>
        );
      },
    },
    {
      key: "type",
      title: "类型",
      render: ({ type }: Morty) => {
        const typeText = parseMortyType(type);

        return (
          <Space>
            {typeText !== "Normal" ? (
              <Image
                src={`${POCKET_MORTYS_MEDIA_URL}/images/${typeText.toLowerCase()}.png`}
                lazyLoad
                mode="widthFix"
                style={{ width: 18 }}
              />
            ) : null}
            <Text>{typeText}</Text>
          </Space>
        );
      },
    },
    {
      key: "rarity",
      title: "稀有度",
      render: ({ rarity }: Morty) => {
        const rarityText = parseMortyRarity(rarity);
        return (
          <Space>
            <Image src={RARITIES[rarityText].img} lazyLoad mode="widthFix" style={{ width: 18 }} />
            <Text>{rarityText}</Text>
          </Space>
        );
      },
    },
    {
      key: "basexp",
      title: "基础经验值",
    },
    {
      key: "basehp",
      title: "基础生命值",
    },
    {
      key: "baseatk",
      title: "基础攻击力",
    },
    {
      key: "basedef",
      title: "基础防御力",
    },
    {
      key: "basespd",
      title: "基础速度",
    },
    {
      key: "stattotal",
      title: "总属性值",
    },
    {
      key: "evo_req",
      title: "进化所需量",
    },
    {
      key: "badges",
      title: "所需徽章",
    },
    {
      key: "where_found",
      title: "获取方式",
      render: ({ where_found }: Morty) => {
        return (
          <View
            onClick={(e) => {
              const dimension = cheerio.load(where_found)(".dimensions").text().trim();
              Taro.navigateTo({
                url: `/pages/database/dimensions/dimension/index?name=${dimension}`,
              });
            }}
            dangerouslySetInnerHTML={{ __html: where_found }}
          />
        );
      },
    },
    {
      key: "dimension_pools",
      title: "所属维度",
      render: ({ dimension_pools }: Morty) => {
        return (
          <View
            onClick={(e) => {
              const dimension = cheerio.load(dimension_pools)(".dimensions").text().trim();
              Taro.navigateTo({
                url: `/pages/database/dimensions/dimension/index?name=${dimension}`,
              });
            }}
            dangerouslySetInnerHTML={{ __html: dimension_pools }}
          />
        );
      },
    },
  ];

  useEffect(() => {
    Taro.showLoading({
      title: "加载莫蒂中...",
    });
    getMortys()
      .then((res) => {
        setMortys(res?.result?.data?.data);
        setSearchedMortys(res?.result?.data?.data);
      })
      .catch(() => {
        Taro.showToast({
          title: "获取莫蒂失败",
          icon: "error",
        });
      })
      .finally(() => {
        Taro.hideLoading();
      });
  }, []);

  return (
    <>
      <SearchBar
        placeholder="搜索莫蒂"
        onClear={() => {
          setCurrent(1);
          setSearchedMortys(mortys);
        }}
        onSearch={(value) => {
          setCurrent(1);
          if (value) {
            setSearchedMortys((ms) =>
              ms.filter(({ name }) => {
                const nameText = parseMortyName(name);
                return nameText.includes(value);
              })
            );
          } else {
            // 如果搜索空字符串, 等同于重置
            setSearchedMortys(mortys);
          }
        }}
      />
      <Menu>
        <Menu.Item title="类型">
          <Checkbox.Group
            list
            labelPosition="left"
            value={selectedTypes}
            onChange={(values) => {
              setSelectedTypes(values);
            }}
          >
            {Object.entries(MORTY_TYPES).map(([value, { img }]) => (
              <Checkbox key={value} value={value}>
                {img ? (
                  <Space>
                    <Image src={img} mode="widthFix" style={{ width: 18 }} />
                    <Text>{value}</Text>
                  </Space>
                ) : (
                  <Text>{value}</Text>
                )}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </Menu.Item>
        <Menu.Item title="稀有度">
          <Checkbox.Group
            list
            labelPosition="left"
            value={selectedRarities}
            onChange={(values) => {
              setSelectedRarities(values);
            }}
          >
            {Object.entries(RARITIES).map(([value, { img }]) => (
              <Checkbox key={value} value={value}>
                <Space>
                  <Image src={img} mode="widthFix" style={{ width: 18 }} />
                  <Text>{value}</Text>
                </Space>
              </Checkbox>
            ))}
          </Checkbox.Group>
        </Menu.Item>
        <Menu.Item title="次元">
          <Checkbox.Group
            list
            labelPosition="left"
            value={selectedDimensions}
            onChange={(values) => {
              setSelectedDimensions(values);
            }}
          >
            {Object.entries(DIMENSIONS).map(([value, { color }]) => (
              <Checkbox key={value} value={value}>
                <Text style={{ color }}>{value}</Text>
              </Checkbox>
            ))}
          </Checkbox.Group>
        </Menu.Item>
      </Menu>
      <View className="container">
        <Cell style={{ marginTop: 12 }}>
          共检索到 {filteredMortys.length} 条莫蒂, 这里可以查看
          <Link
            onClick={() => {
              Taro.navigateTo({
                url: "/pages/guides/morty-tiers/index",
              });
            }}
          >
            莫蒂强度表
          </Link>
        </Cell>

        {mortys.length ? (
          <Table
            style={{ boxSizing: "border-box" }}
            columns={columns}
            data={displayedMortys}
            summary={
              <Pagination
                // mode="simple"
                prev={<ArrowLeft />}
                next={<ArrowRight />}
                pageSize={pageSize}
                total={filteredMortys.length}
                onChange={(currentPage) => {
                  setCurrent(currentPage);
                }}
              />
            }
          />
        ) : (
          <Empty title="暂无数据" />
        )}

        <SafeArea position="bottom" />
      </View>
    </>
  );
}
