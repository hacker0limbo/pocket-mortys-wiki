import { View } from "@tarojs/components";
import { Cell, ImagePreview, NoticeBar } from "@nutui/nutui-react-taro";
import { useState } from "react";
import { CLOUD_BASE_URL } from "@/constants";
import { ArrowRight } from "@nutui/icons-react-taro";

import "./index.scss";

const TIERS = [
  {
    title: "莫蒂强度和天梯技能推荐",
    img: "/tier.png",
    page: 1,
  },
  {
    title: "Raid强度榜",
    img: "/raid_tier.png",
    page: 2,
  },
  {
    title: "稀有度排行",
    img: "/rarity_tier.png",
    page: 3,
  },
];

export default function MortyTiers() {
  const [showTiers, setShowTiers] = useState(false);
  const [tierPage, setTiterPage] = useState(1);

  return (
    <View>
      <NoticeBar
        content="强度榜由@茶十殇易制作, 请勿私自传播商用!"
        scrollable={false}
        style={
          { "--nutui-noticebar-background": "#EDF4FF", "--nutui-noticebar-color": "#3768FA" } as React.CSSProperties
        }
      />

      <View className="container">
        <Cell.Group>
          {TIERS.map(({ page, title }, index) => (
            <Cell
              title={title}
              key={index}
              extra={<ArrowRight />}
              onClick={() => {
                setTiterPage(page);
                setShowTiers(true);
              }}
            />
          ))}
        </Cell.Group>

        <ImagePreview
          visible={showTiers}
          defaultValue={tierPage}
          closeIcon
          onClose={() => setShowTiers(false)}
          images={TIERS.map((t) => ({ src: `${CLOUD_BASE_URL}${t.img}` }))}
        />
      </View>
    </View>
  );
}
