import { View, Image, Text } from "@tarojs/components";
import { useEffect, useState } from "react";
import Taro, { useDidShow, useRouter } from "@tarojs/taro";
import { Attack, getAttacks, getMortysFromAttack } from "@/api/database";
import { parseAttackName, parseAttackNumber } from "@/utils";
import { Cell, Collapse, Grid, SafeArea, Space } from "@nutui/nutui-react-taro";
import { ArrowDown, ArrowRight } from "@nutui/icons-react-taro";
import * as cheerio from "cheerio";
import { POCKET_MORTYS_MEDIA_URL } from "@/api/request";
import { Link } from "@/components";

import "./index.scss";

type RelatedMorty = {
  name: string;
  level: string;
  icon?: string;
};

export default function AttackInfo() {
  const {
    // 参数分别为, 技能中文名称(必传), 技能编号, 技能英文名称
    params: { name = "", number = "", nameEn = "" },
  } = useRouter();
  const [attackDetails, setAttackDetails] = useState<Attack>();
  const [loading, setLoading] = useState(false);
  const [relatedMortys, setRelatedMortys] = useState<RelatedMorty[]>([]);

  useDidShow(() => {
    Taro.setNavigationBarTitle({
      title: name,
    });
  });

  useEffect(() => {
    if (number || nameEn) {
      setLoading(true);
      // 获取英文版的技能, 因为需要拿到对应莫蒂的信息
      getAttacks("en")
        .then((res) => {
          const condition = number
            ? (a: Attack) => parseAttackNumber(a.number) === number
            : (a: Attack) => parseAttackName(a.name) === nameEn;
          const attack = res.result?.data?.data?.find(condition);
          setAttackDetails(attack);
        })
        .catch(() => {
          Taro.showToast({
            title: "获取技能详情失败",
            icon: "error",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [number, nameEn]);

  useEffect(() => {
    if (attackDetails) {
      const $ = cheerio.load(attackDetails.name);
      const href = $("a").attr("href");
      // 如果是英文的链接才能找到相关莫蒂
      if (href && href.startsWith("/attacks")) {
        setLoading(true);
        getMortysFromAttack(href)
          .then((res) => {
            const $$ = cheerio.load((res.result as any).data);
            const mortys = $$(".morty-attacks-wrapper")
              .children()
              .map((_, el) => {
                // 这里官网没有暴露 API 手动根据官网的 dom 结构解析
                const mortyName = $$(el).find(".morty-name").text().trim();
                const mortyLevel = $$(el).find(".morty-level").text().trim();
                const mortyIcon = $$(el).find(".mortys_icon_50x50")?.attr("class")?.split(" ")?.[1]?.split("_")?.pop();
                return { name: mortyName, level: mortyLevel, icon: mortyIcon };
              })
              .get();
            setRelatedMortys(mortys);
          })
          .catch(() => {
            Taro.showToast({
              title: "获取相关莫蒂信息失败",
              icon: "error",
            });
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  }, [attackDetails]);

  useEffect(() => {
    if (loading) {
      Taro.showLoading({
        title: "获取技能详情中...",
      });
    } else {
      Taro.hideLoading();
    }
  }, [loading]);

  return (
    <View>
      <Cell.Group title="基本信息">
        <Cell title="技能名称" extra={name} />
        <Cell title="技能类型" extra={<View dangerouslySetInnerHTML={{ __html: attackDetails?.type ?? "" }} />} />
        <Cell title="伤害" extra={<View dangerouslySetInnerHTML={{ __html: attackDetails?.power ?? "" }} />} />
        <Cell title="命中率" extra={<View dangerouslySetInnerHTML={{ __html: attackDetails?.accuracy ?? "" }} />} />
        <Cell title="AP" extra={<View dangerouslySetInnerHTML={{ __html: attackDetails?.ap ?? "" }} />} />
        <Cell
          title="技能描述"
          extra={<View dangerouslySetInnerHTML={{ __html: attackDetails?.description ?? "" }} />}
        />
      </Cell.Group>

      <Cell.Group title="拥有该技能的莫蒂">
        {relatedMortys.map((morty) => (
          <Cell
            title={
              <Space>
                <Image
                  src={`${POCKET_MORTYS_MEDIA_URL}/assets/${morty.icon}.png`}
                  mode="widthFix"
                  style={{ width: 20 }}
                />
                <Text>{morty.name}</Text>
              </Space>
            }
            key={morty.name}
            extra={
              <Space>
                <Text>{morty.level}</Text>
                <ArrowRight />
              </Space>
            }
            clickable
            onClick={() => {
              const nameArr = morty.name.split(" ");
              const lastElement = nameArr.pop();
              nameArr.unshift(lastElement || "");
              const assetid = nameArr.join("");
              Taro.navigateTo({
                url: `/pages/database/mortys/morty/index?assetid=${assetid}`,
              });
            }}
          />
        ))}
      </Cell.Group>

      <SafeArea position="bottom" />
    </View>
  );
}
