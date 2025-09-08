import { View, Image, Text } from "@tarojs/components";
import { Cell, Collapse, SafeArea } from "@nutui/nutui-react-taro";
import { POCKET_MORTYS_BASE_URL } from "@/api/request";

import "./index.scss";

export default function Battling() {
  return (
    <View>
      <Cell>
        <Image src={`${POCKET_MORTYS_BASE_URL}/images/mortys-header.png`} style={{ width: "100%" }} mode="widthFix" />
      </Cell>

      <Cell style={{ display: "block" }}>
        <h3>战斗类型</h3>
        <h4>多人模式</h4>
        <p>
          在口袋莫蒂的多人模式中,
          你可以与机器人以及其他像你一样的训练师进行战斗。除了会重生并在各个维度中游荡的野生莫蒂外,
          还有一些会在维度中游荡的训练师, 你可以挑战他们。
        </p>
        <p>
          你可以轻松区分机器人训练师和人类训练师, 因为机器人训练师永远不会逃跑, 用户名是自动生成的,
          并且他们的所有莫蒂都来自你所在的维度。
        </p>
        <p>
          你也可以通过将人类训练师添加到你的好友列表中, 挑战他们,
          即使你们不在同一个维度。注意：与好友战斗时你不会获得经验值
        </p>

        <h4>战役模式</h4>
        <p>
          在战役模式中，战斗非常简单。如果你想战斗，必须首先通过 Citadel 传送门进入一个随机生成的维度。进入后,
          你会发现有随机分布的野生莫蒂、训练师和一个瑞克训练师。
        </p>
      </Cell>

      <Cell style={{ display: "block" }}>
        <h3>技能</h3>
        <h4>技能类型</h4>
        <p>口袋莫蒂中有几种不同类型的攻击：标准攻击、增益、减益、毒药、麻痹和吸收。</p>
        <p>
          标准攻击包括前面提到的
          <Image
            src={`${POCKET_MORTYS_BASE_URL}/images/rock_small.png`}
            style={{ width: 16, marginRight: 4, marginLeft: 4 }}
            mode="widthFix"
          />
          石头、
          <Image
            src={`${POCKET_MORTYS_BASE_URL}/images/paper_small.png`}
            style={{ width: 16, marginRight: 4, marginLeft: 4 }}
            mode="widthFix"
          />
          纸张、
          <Image
            src={`${POCKET_MORTYS_BASE_URL}/images/scissors_small.png`}
            style={{ width: 16, marginRight: 4, marginLeft: 4 }}
            mode="widthFix"
          />
          剪刀和普通属性，这些攻击会对敌人造成伤害
        </p>

        <h4>技能效果</h4>
        <Text>口袋莫蒂采用一个简单的属性克制系统：</Text>
        <ul>
          <li>
            <Image
              src={`${POCKET_MORTYS_BASE_URL}/images/rock_small.png`}
              style={{ width: 16, marginRight: 4 }}
              mode="widthFix"
            />
            石头克制
            <Image
              src={`${POCKET_MORTYS_BASE_URL}/images/scissors_small.png`}
              style={{ width: 16, marginRight: 4, marginLeft: 4 }}
              mode="widthFix"
            />
            剪刀, 但被纸张克制。
          </li>
          <li>
            <Image
              src={`${POCKET_MORTYS_BASE_URL}/images/paper_small.png`}
              style={{ width: 16, marginRight: 4 }}
              mode="widthFix"
            />
            纸张克制
            <Image
              src={`${POCKET_MORTYS_BASE_URL}/images/rock_small.png`}
              style={{ width: 16, marginRight: 4, marginLeft: 4 }}
              mode="widthFix"
            />
            石头, 但被剪刀克制。
          </li>
          <li>
            <Image
              src={`${POCKET_MORTYS_BASE_URL}/images/scissors_small.png`}
              style={{ width: 16, marginRight: 4 }}
              mode="widthFix"
            />
            剪刀克制
            <Image
              src={`${POCKET_MORTYS_BASE_URL}/images/paper_small.png`}
              style={{ width: 16, marginRight: 4, marginLeft: 4 }}
              mode="widthFix"
            />
            纸张, 但被石头克制。
          </li>
          <li>普通属性对任何属性既不克制也不被克制。</li>
        </ul>
        <p>在选择莫蒂时, 建议你记住这一点, 并且组建一个多样化的队伍来与其他训练师对战。</p>
        <p>
          如果攻击属性克制对面, 它将是“极具威力”的, 并造成 2 倍伤害。如果攻击被对面属性克制, 它将是“无力的”, 并造成 0.5
          倍伤害
        </p>
        <p>
          <Image
            src={`${POCKET_MORTYS_BASE_URL}/images/poison_small.png`}
            style={{ width: 16, marginRight: 4 }}
            mode="widthFix"
          />
          毒是一种特殊攻击, 会给莫蒂添加一个“中毒”状态,
          每回合结束时造成伤害。这是逐渐消耗莫蒂生命值的一种有效方式。在战斗中, 唯一能去除中毒状态的方法是使用
          <Image
            src={`${POCKET_MORTYS_BASE_URL}/images/icons/16by16/ItemPoisonCureIcon.png`}
            style={{ width: 16, marginRight: 4, marginLeft: 4 }}
            mode="widthFix"
          />
          中毒治愈或
          <Image
            src={`${POCKET_MORTYS_BASE_URL}/images/icons/16by16/ItemFullReviveIcon.png`}
            style={{ width: 16, marginRight: 4, marginLeft: 4 }}
            mode="widthFix"
          />
          纯净药草。中毒状态在战斗结束后会自动清除。 注意: Raid Boss 对毒药免疫。
        </p>
        <p>
          <Image
            src={`${POCKET_MORTYS_BASE_URL}/images/paralyze_small.png`}
            style={{ width: 16, marginRight: 4 }}
            mode="widthFix"
          />
          麻痹是另一种特殊攻击, 会给莫蒂添加一个“麻痹”状态, 有时会阻止它们进行攻击。在战斗中,
          唯一能去除麻痹状态的方法是使用
          <Image
            src={`${POCKET_MORTYS_BASE_URL}/images/icons/16by16/ItemParalysisCureIcon.png`}
            style={{ width: 16, marginRight: 4, marginLeft: 4 }}
            mode="widthFix"
          />
          麻痹治疗或
          <Image
            src={`${POCKET_MORTYS_BASE_URL}/images/icons/16by16/ItemFullReviveIcon.png`}
            style={{ width: 16, marginRight: 4, marginLeft: 4 }}
            mode="widthFix"
          />
          纯净药草。麻痹状态在战斗结束后会自动清除。 注意: Raid Boss 可以被麻痹。
        </p>
      </Cell>

      <Cell style={{ display: "block" }}>
        <h3>你的莫蒂队伍</h3>
        <p>
          你可以拥有最多 3 个莫蒂队伍，每个队伍包含 5
          个莫蒂，供战斗使用。每次只能指定一个队伍作为当前的战队队伍，你可以在莫蒂存储建筑进行指定中。
        </p>
        <p>对于 Raid 战斗，我们建议拥有两个有减益技能的莫蒂、一个有麻痹技能的莫蒂和两个纯攻击的莫蒂。</p>
      </Cell>
      <SafeArea position="bottom" />
    </View>
  );
}
