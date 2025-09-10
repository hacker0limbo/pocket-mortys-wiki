import * as cheerio from "cheerio";
import { View } from "@tarojs/components";
import { useEffect, useMemo, useState } from "react";
import { getAttacks, type Attack } from "@/api/database";
import Taro from "@tarojs/taro";
import {
  Cell,
  HoverButton,
  Pagination,
  Popup,
  SafeArea,
  SearchBar,
  Table,
  TableColumnProps,
} from "@nutui/nutui-react-taro";
import { ArrowLeft, ArrowRight, Ask, PickedUp } from "@nutui/icons-react-taro";
import { parseAttackName, parseAttackNumber } from "@/utils";
import { useSettingsStore } from "@/store";
import AttackNote from "./AttackNote";

import "./index.scss";

export default function Attacks() {
  const [attacks, setAttacks] = useState<Attack[]>([]);
  const [searchedAttacks, setSearchedAttacks] = useState<Attack[]>([]);
  const [showAttackNote, setShowAttackNote] = useState(false);
  const [current, setCurrent] = useState<number>(1);
  const pageSize = useSettingsStore((state) => state.tablePageSize);
  const displayedAttacks = useMemo(
    () => searchedAttacks.slice((current - 1) * pageSize, current * pageSize),
    [searchedAttacks, current, pageSize]
  );

  const columns: TableColumnProps[] = [
    {
      key: "number",
      title: "#",
      render: ({ number }: Attack) => {
        return <View dangerouslySetInnerHTML={{ __html: number }} />;
      },
    },
    {
      key: "name",
      title: "名称",
      fixed: "left",
      render: ({ name, number }: Attack) => {
        return (
          <View
            className="link"
            dangerouslySetInnerHTML={{ __html: name }}
            onClick={() => {
              Taro.navigateTo({
                url: `/pages/database/attacks/attack/index?name=${parseAttackName(name)}&number=${parseAttackNumber(
                  number
                )}`,
              });
            }}
          />
        );
      },
    },
    {
      key: "type",
      title: "类型",
      render: ({ type }: Attack) => {
        return <View dangerouslySetInnerHTML={{ __html: type }} />;
      },
    },
    {
      key: "power",
      title: "伤害",
      render: ({ power }: Attack) => {
        return <View dangerouslySetInnerHTML={{ __html: power }} />;
      },
    },
    {
      key: "accuracy",
      title: "命中率",
      render: ({ accuracy }: Attack) => {
        return <View dangerouslySetInnerHTML={{ __html: accuracy }} />;
      },
    },
    {
      key: "ap",
      title: "AP",
      render: ({ ap }: Attack) => {
        return <View dangerouslySetInnerHTML={{ __html: ap }} />;
      },
    },
    {
      key: "description",
      title: "技能描述",
      render: ({ description }: Attack) => {
        return <View dangerouslySetInnerHTML={{ __html: description }} />;
      },
    },
  ];

  useEffect(() => {
    Taro.showLoading({
      title: "加载技能中...",
    });
    getAttacks()
      .then((res) => {
        setAttacks(res.result?.data?.data || []);
        setSearchedAttacks(res.result?.data?.data || []);
      })
      .catch(() => {
        Taro.showToast({
          title: "获取技能失败",
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
        placeholder="搜索技能"
        onSearch={(value) => {
          setCurrent(1);
          if (value) {
            setSearchedAttacks((as) =>
              as.filter(({ name }) => {
                const $ = cheerio.load(name);
                const nameText = $("a").text().trim();
                return nameText.includes(value);
              })
            );
          } else {
            // 如果搜索空字符串, 等同于重置
            setSearchedAttacks(attacks);
          }
        }}
      />

      <View className="container">
        <Cell title={`共搜索到 ${searchedAttacks.length} 个技能`} />

        <Table
          style={{ boxSizing: "border-box" }}
          columns={columns}
          data={displayedAttacks}
          summary={
            <Pagination
              // mode="simple"
              ellipse
              prev={<ArrowLeft />}
              next={<ArrowRight />}
              pageSize={pageSize}
              total={searchedAttacks.length}
              value={current}
              onChange={(page) => {
                setCurrent(page);
              }}
            />
          }
        />

        <Popup
          closeable
          visible={showAttackNote}
          title="技能说明"
          onClose={() => {
            setShowAttackNote(false);
          }}
          position="bottom"
        >
          <AttackNote />
        </Popup>
        <HoverButton>
          <HoverButton.Item
            icon={<Ask />}
            onClick={() => {
              setShowAttackNote(true);
            }}
          />
          <HoverButton.Item
            icon={<PickedUp />}
            onClick={() => {
              Taro.showToast({
                title: "根据技能类型寻找莫蒂功能开发中...",
                icon: "none",
              });
            }}
          />
        </HoverButton>
      </View>

      <SafeArea position="bottom" />
    </>
  );
}
