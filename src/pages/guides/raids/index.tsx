import { View, Text } from "@tarojs/components";
import { Cell } from "@nutui/nutui-react-taro";
import { RAIDS_DIFFICULTY_LEVELS } from "@/constants";
import Taro from "@tarojs/taro";

import "./index.scss";

export default function Raids() {
  return (
    <View>
      <Cell style={{ display: "block" }}>
        <p>
          团队副本 (Raids) 是《口袋莫蒂》多人游戏中的活动, 通常每月举行一次, 你需要与其他玩家合作, 在一个周末内击败一个
          Raids boss。
        </p>
        <p>
          当即将举行的Raids活动宣布时, 一个神秘的飞船将在莫蒂世界 (Mortyland) 坠落, 你会看到游戏左上角出现倒计时, 显示
          Raids boss 出现前的剩余时间。你也可以在网站主页上查看倒计时。
        </p>
        <p>当倒计时结束时, Raids boss 将出现在莫蒂世界的中心, 所有玩家将获得 4 张猎人许可证 (Hunter Permits) 。</p>
      </Cell>
      <Cell style={{ display: "block" }}>
        <h3>和 Raids 里的 Boss 战斗</h3>
        <p>
          每次尝试与 Raids boss 对战都会消耗 2 张猎人许可证。你可以通过击败其他训练师随机获得更多猎人许可证
          (有机会作为奖励获得) 。另外, 如果你没有猎人许可证, 你也可以使用 3 张 Club Rick 代币来与 Raids boss 对战。
        </p>
        <p>
          与 Raids boss 对战就像普通的训练师对战一样——你可以使用最多 5 只莫蒂, 直到所有莫蒂都被击败为止。输给 Raids boss
          不会有任何后果 (你肯定会输, 因为它太强了) ——一旦你被击败, 你将回到治疗中心, 莫蒂们会完全恢复。
        </p>
      </Cell>

      <Cell style={{ display: "block" }}>
        <h3>Raids 难度</h3>
        <p>Raids boss 的难度等级从 1 级 (柔弱) 到 17 级 (极限) 不等。难度越高, Raids boss 的生命值也会越高。</p>
        <ul>
          {RAIDS_DIFFICULTY_LEVELS.map((level, index) => (
            <li key={index}>{level}</li>
          ))}
        </ul>
      </Cell>

      <Cell style={{ display: "block" }}>
        <h3>Raids 奖励</h3>
        <p>
          如果你所在的 Raids boss 战斗实例中的所有人都能在 Raids 周末结束前将 boss 的生命值降至零,
          你们将会获得一个额外的奖励。无论结果如何, 所有参与 Raids 的玩家都会获得奖励,
          伤害输出最高的玩家将获得最好的奖励。
        </p>
        <p>
          一旦 Raids boss 在你的实例中被击败, 你将无法继续与它战斗, 排行榜也会锁定。
          <strong>
            因此, 尽早开始与 Raids boss 战斗非常重要, 最好在它出现时就开始, 否则你可能完全错过获得奖励的机会！
          </strong>
          特别是对于较弱的 boss 或者在高等级训练师实例中, boss 通常会很快被击败。
        </p>
        <p>
          每个 Raids boss 将为<strong>前 100 名</strong>累计伤害输出玩家提供一个<strong>独特的莫蒂</strong>
          奖励。你可以通过点击游戏左上角的 Raids 图标, 并选择“排行榜”标签, 查看你当前的排名。
        </p>
        <p>
          有关过去 Raids 奖励等级的完整列表, 你可以浏览我们的 Raids
          <Text
            className="link"
            onClick={() => {
              Taro.navigateTo({
                url: "/pages/database/raids/index",
              });
            }}
          >
            数据库
          </Text>
          。
        </p>
      </Cell>

      <Cell style={{ display: "block" }}>
        <h3>Raids 攻略</h3>
        <p>
          要在 raids 中取得成功, 你需要在不迅速死亡的情况下造成大量伤害。我们建议你查看 raids boss 的元素类型,
          并组建一支在该类型上具有优势的莫蒂队伍。例如, 面对岩石类型的 raids boss 时, 使用纸张类型的莫蒂。
        </p>
        <p>我们还建议你至少有一只“去除 buff”莫蒂, 能够对 raids boss 施加以下效果和去buff：</p>
        <ul>
          <li>6 stacks of Attack Debuff</li>
          <li>6 stacks of Accuracy Debuff</li>
          <li>6 stacks of Defense Debuff</li>
          <li>6 stacks of Evade Debuff (optional)</li>
          <li>Paralyze Effect</li>
        </ul>
        <p>
          没有一只莫蒂能同时做到这些, 但我们在
          <Text
            className="link"
            onClick={() => {
              Taro.navigateTo({
                url: "/pages/guides/best-mortys/index",
              });
            }}
          >
            最佳莫蒂指南
          </Text>
          中有一些关于组队的推荐。除了一个或两个优秀的“去buff”莫蒂外,
          你还需要用强力攻击或高生存能力的莫蒂来填充队伍。有效的策略包括使用能够提供攻击和防御buff的莫蒂,
          或者能够自我治疗 (吸收攻击) 的莫蒂。
        </p>
        <p>如果可能的话, 你会希望尽量减少使用治疗物品, 而是使用能够恢复AP的物品 (如普鲁托石和纯普鲁托石) 。</p>
      </Cell>
    </View>
  );
}
