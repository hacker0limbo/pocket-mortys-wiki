import { Image, View } from "@tarojs/components";
import { Cell, Grid } from "@nutui/nutui-react-taro";
import { POCKET_MORTYS_MEDIA_URL, POCKET_MORTYS_BASE_URL } from "@/api/request";
import Taro from "@tarojs/taro";

import "./index.scss";

const NAVS = [
  {
    text: "技能",
    icon: `${POCKET_MORTYS_MEDIA_URL}/images/rock.png`,
    path: "/pages/database/attacks/index",
  },
  {
    text: "头像",
    icon: `${POCKET_MORTYS_MEDIA_URL}/sprites/avatars/icon/28x28/CharacterRickDefaultIcon.png`,
    path: "/pages/database/avatars/index",
  },
  {
    text: "维度",
    icon: `${POCKET_MORTYS_MEDIA_URL}/images/ui/dimensions-28x28.png`,
    path: "/pages/database/dimensions/index",
  },
  {
    text: "物品",
    icon: `${POCKET_MORTYS_MEDIA_URL}/sprites/items/icon/28x28/ItemMortyChipIcon.png`,
    path: "/pages/database/items/index",
  },
  {
    text: "莫蒂",
    icon: `${POCKET_MORTYS_MEDIA_URL}/sprites/mortys/icon/28x28/MortyDefaultIcon.png`,
    path: "/pages/database/mortys/index",
  },
  {
    text: "莫蒂游戏",
    icon: `${POCKET_MORTYS_MEDIA_URL}/sprites/icon/28x28/CharacterMrNeedfulIcon.png`,
  },
  {
    text: "音乐",
    icon: `${POCKET_MORTYS_MEDIA_URL}/images/ui/music.png`,
  },
  {
    text: "非玩家角色",
    icon: `${POCKET_MORTYS_MEDIA_URL}/sprites/trainers/icon/28x28/CharacterJerryIcon.png`,
    path: "/pages/database/npcs/index",
  },
  {
    text: "任务",
    icon: `${POCKET_MORTYS_MEDIA_URL}/sprites/mortys/icon/28x28/MortyMascotIcon.png`,
    path: "/pages/database/quests/index",
  },
  {
    text: "Raids",
    icon: `${POCKET_MORTYS_MEDIA_URL}/sprites/mortys/icon/28x28/MortyDragonIcon.png`,
    path: "/pages/database/raids/index",
  },
  {
    text: "配方",
    icon: `${POCKET_MORTYS_MEDIA_URL}/sprites/items/icon/28x28/ItemIQEnhancingHelmetIcon.png`,
    path: "/pages/database/recipes/index",
  },
  {
    text: "路标",
    icon: `${POCKET_MORTYS_BASE_URL}/templates/g5_hydrogen/custom/images/signpost_icon.png`,
    path: "/pages/database/sign-posts/index",
  },
  {
    text: "桑美厢型车",
    icon: `${POCKET_MORTYS_MEDIA_URL}/sprites/icon/28x28/CharacterSummerIcon.png`,
  },
  {
    text: "训练师",
    icon: `${POCKET_MORTYS_MEDIA_URL}/sprites/trainers/icon/28x28/CharacterFlargoIcon.png`,
    path: "/pages/database/trainers/index",
  },
];

export default function Database() {
  return (
    <View>
      <Grid>
        {NAVS.map(({ text, icon, path }) => (
          <Grid.Item
            key={text}
            text={text}
            onClick={() => {
              if (path) {
                Taro.navigateTo({
                  url: path,
                });
              } else {
                Taro.showToast({
                  title: "暂不支持小程序, 请前往官网查看具体内容",
                  icon: "none",
                });
              }
            }}
          >
            <Image src={icon} style={{ width: 20 }} mode="widthFix" />
          </Grid.Item>
        ))}
      </Grid>
    </View>
  );
}
