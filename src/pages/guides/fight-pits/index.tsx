import { Image, View } from "@tarojs/components";
import { Cell, SafeArea } from "@nutui/nutui-react-taro";
import { POCKET_MORTYS_BASE_URL } from "@/api/request";

import "./index.scss";

export default function FightPits() {
  return (
    <View>
      <Cell style={{ display: "block" }}>
        <p>
          斗技场是口袋莫蒂多人模式中定期举行的活动, 通常每月举办一次。在这些活动中,
          训练师将与其他真实玩家的现役队伍单独对战, 争取登上排行榜的顶端并赢取奖励。
        </p>
        <p>
          当斗技场活动开启时, 你可以通过前往每个多人维度中的斗技场建筑,
          或者打开你的莫蒂平板并点击左侧的斗技场图标来进入。你也可以在网站的首页查看斗技场是否正在进行。
        </p>
      </Cell>

      <Cell style={{ display: "block" }}>
        <h3>在斗技场进行战斗</h3>
        <p>
          要参与斗技场战斗, 你需要 1 个
          <Image
            src={`${POCKET_MORTYS_BASE_URL}/images/assets/UI_Arena_Icon_Isotope322.png`}
            style={{ width: 18, margin: "0 4px" }}
            mode="widthFix"
          />
          同位素。你一次最多可以拥有 5 个同位素。随着时间的推移, 你将逐渐恢复已使用的同位素 (每 30 分钟恢复一次).
        </p>
        <p>
          如果你没有
          <Image
            src={`${POCKET_MORTYS_BASE_URL}/images/assets/UI_Arena_Icon_Isotope322_Grey.png`}
            style={{ width: 18, margin: "0 4px" }}
            mode="widthFix"
          />
          同位素了, 你仍然可以通过支付 2 个
          <Image
            src={`${POCKET_MORTYS_BASE_URL}/images/assets/ItemCouponMPIcon.png`}
            style={{ width: 18, margin: "0 4px" }}
            mode="widthFix"
          />
          Club Rick Coupons 来进行战斗。
        </p>
        <p>
          在斗技场战斗就像普通的训练师对战一样——你可以使用最多 5 个 Mortys, 并且可以一直战斗,
          直到所有莫蒂都被击败。失败在斗技场中没有任何后果——一旦被击败, 你将返回治疗中心, 所有的莫蒂都会被完全治疗。
        </p>
      </Cell>

      <Cell style={{ display: "block" }}>
        <h3>斗技场奖励</h3>
        <p>
          每个斗技场都会给<strong>排名最高的玩家</strong>奖励一个<strong>独特的莫蒂</strong>
          。你可以通过点击莫蒂平板左下角的斗技场图标, 并选择排行榜来查看你当前的排名。
        </p>
      </Cell>

      <Cell style={{ display: "block" }}>
        <h3>斗技场攻略</h3>
        <p>
          要在斗技场中获得胜利, 使用
          <Image
            src={`${POCKET_MORTYS_BASE_URL}/images/poison_small.png`}
            style={{ width: 14, margin: "0 4px" }}
            mode="widthFix"
          />
          毒相关的技能是关键。我们还建议拥有平衡的队伍属性, 而不是让所有的莫蒂使用相同的属性,
          这样可以保持属性克制的优势。
        </p>
        <p>
          在斗技场中你可以使用物品, 包括
          <Image
            src={`${POCKET_MORTYS_BASE_URL}/images/assets/ItemMrMeeseekIcon.png`}
            style={{ width: 14, margin: "0 4px" }}
            mode="widthFix"
          />
          Mr. Meeseeks boxes, 因此我们强烈建议你随身携带一些, 特别是在争夺排名时！
        </p>
      </Cell>

      <SafeArea position="bottom" />
    </View>
  );
}
