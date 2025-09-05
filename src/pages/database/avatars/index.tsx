import { View, Text, Image } from "@tarojs/components";
import { Cell, ImagePreview, SafeArea, SearchBar, Space, Table, TableColumnProps } from "@nutui/nutui-react-taro";
import { getAvatars, type Avatar } from "@/api/database";
import { useEffect, useMemo, useState } from "react";
import Taro from "@tarojs/taro";
import { POCKET_MORTYS_MEDIA_URL } from "@/api/request";
import { Link } from "@/components";
import { ORIENTATIONS, SIDES } from "@/constants";

import "./index.scss";

export default function Avatars() {
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [filiteredAvatars, setFilteredAvatars] = useState<Avatar[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar>();
  // 人物肖像图
  const portraits = useMemo(() => {
    if (!selectedAvatar) {
      return [];
    }
    return ORIENTATIONS.map((o) => `${POCKET_MORTYS_MEDIA_URL}/assets/${selectedAvatar?.assetid}${o}.png`);
  }, [selectedAvatar]);
  // 雪碧图
  const sprites = useMemo(() => {
    if (!selectedAvatar) {
      return [];
    }
    return SIDES.flatMap((s) =>
      Array.from({ length: 4 }).map(
        (_, i) =>
          `${POCKET_MORTYS_MEDIA_URL}/sprites/avatars/${s.toLowerCase()}${i + 1}/50x50/${selectedAvatar?.assetid}${s}_${
            i + 1
          }.png`
      )
    );
  }, [selectedAvatar]);

  const columns: TableColumnProps[] = [
    {
      key: "number",
      title: "#",
    },
    {
      key: "name",
      title: "名称",
      fixed: "left",
      render: (avatar: Avatar) => {
        const { name, assetid } = avatar;
        return (
          <Space>
            <Image
              lazyLoad
              src={`${POCKET_MORTYS_MEDIA_URL}/assets/${assetid}Icon.png`}
              style={{ width: 18 }}
              mode="widthFix"
            />
            <Link
              onClick={() => {
                setSelectedAvatar(avatar);
              }}
            >
              {name}
            </Link>
          </Space>
        );
      },
    },
    {
      key: "category",
      title: "类别",
    },
    {
      key: "combinedcost",
      title: "获取费用",
    },
    {
      key: "multiplayeronly",
      title: "多人限定",
    },
  ];

  useEffect(() => {
    Taro.showLoading({
      title: "加载头像中...",
    });
    getAvatars()
      .then((res) => {
        const as = res.result?.data?.data || [];
        setAvatars(as);
        setFilteredAvatars(as);
      })
      .catch(() => {
        Taro.showToast({
          title: "获取头像失败",
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
        placeholder="搜索头像"
        onClear={() => {
          setFilteredAvatars(avatars);
        }}
        onSearch={(value) => {
          if (value) {
            setFilteredAvatars(avatars.filter((a) => a.name?.includes(value.trim())));
          } else {
            setFilteredAvatars(avatars);
          }
        }}
      />

      <View className="container">
        <Table columns={columns} data={filiteredAvatars} style={{ boxSizing: "border-box" }} />
      </View>

      <ImagePreview
        visible={!!selectedAvatar}
        images={[...portraits, ...sprites].map((s) => ({ src: s }))}
        closeIcon
        onClose={() => {
          setSelectedAvatar(undefined);
        }}
      />
      <SafeArea position="bottom" />
    </>
  );
}
