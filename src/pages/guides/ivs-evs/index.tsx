import { View, Text, Image } from "@tarojs/components";
import { Cell, SafeArea } from "@nutui/nutui-react-taro";
import { POCKET_MORTYS_BASE_URL } from "@/api/request";
import Taro from "@tarojs/taro";

import "./index.scss";

export default function IVsEVs() {
  return (
    <View>
      <Cell style={{ display: "block" }}>
        <Text>
          如果你活跃在口袋莫蒂社区中, 你可能听说过玩家讨论 IVs (个体值) 和 EVs (努力值),
          或者在交易中看到不同的属性值截图, 这些值在游戏中是看不到的。本指南旨在帮助解释这些概念的含义,
          以及为什么你应该关注它们
        </Text>
      </Cell>

      <Cell style={{ display: "block" }}>
        <h3>什么是 IVs?</h3>
        <p>
          <strong>IVs</strong> 代表<strong>个体值 (Individual Values) </strong>,
          是每个莫蒂在诞生时就会获得的一组特殊属性值。它们是介于
          <strong>0 到 16</strong>
          之间的整数, 0 代表“最差”, 16 代表“最佳”。
        </p>
        <p>在战役模式中, 你的初始莫蒂就拥有最大的 IV 值 (16 攻击, 16 防御, 16 速度, 16 生命值) 。</p>
        <p>所有其他莫蒂的攻击、防御和速度的 IVs 是随机生成的, 然后它们的生命值 IV 只是这三项 IVs 的平均值。</p>
        <p>
          IVs 的独特之处在于<strong>你无法改变它们</strong>。即使你进行交易或升级莫蒂, 它的 IVs 也将保持不变。
        </p>
      </Cell>

      <Cell style={{ display: "block" }}>
        <h3>什么是 EVs?</h3>
        <p>
          <strong>EVs</strong> 代表 <strong>Effort Values (努力值) </strong>, 也是一组特殊的属性值, 赋予每个莫蒂,
          但这些属性值可以随着时间增加。它们是介于<strong>0 到 65535</strong>
          之间的整数, 0 代表“最低 EVs”或“未训练”, 65535 代表“最大 EVs”或“完全训练”
        </p>
        <p>
          在战役模式中, 当你第一次捕捉到一个莫蒂 (或从 Blips and Chitz 获得时) ,
          游戏会使用一个特殊的公式来确定每项属性的起始 EV。
        </p>
        <p>在多人模式中, 莫蒂的起始 EVs 始终为 0。</p>
        <p>
          在战役模式中, 莫蒂的起始 EVs 永远不会超过 20,000。例子: 一个新捕获的 90 级莫蒂, 其起始 EV 将在 0 到 (int)
          floor(20,000 * ((90 - 5) / 100)) = 17,000 (包括 17,000) 之间。
        </p>
        <p>你的 EVs 越高, 每次莫蒂升级时, 你获得的该项属性的加成越多。这些“额外属性”最多可以增加每项属性 126 点。</p>
        <p>
          例子：一个 100 级的莫蒂, 拥有最大 IVs (每项属性 16) , 但 EVs 最小 (0) (没有在野生莫蒂上进行训练) 将会有： 232
          生命值, 127 攻击, 127 防御, 117 速度, 而一个 100 级的莫蒂, 拥有最大 IVs (每项属性 16) 和最大 EVs (65535)
          将会有： 358 生命值, 253 攻击, 253 防御, 243 速度。
          <br /> 这可是一个巨大的差异！
        </p>
        <p>
          这就是为什么在将莫蒂的等级升到最大之前,
          训练莫蒂时必须通过野生莫蒂而不仅仅是与其他训练师对战的原因。如果你不这么做, 每项属性将错失 126 点的属性加成！
        </p>
      </Cell>

      <Cell style={{ display: "block" }}>
        <h3>为什么我要训练 EVs?</h3>
        <p>
          很好的问题！如上所述, 每次你提升莫蒂的等级时, 它的 IVs 和当前的 EVs 都会被纳入公式中,
          决定哪些属性会增加到莫蒂身上 (如果你对公式感兴趣, 可以在我们的公式指南中查看) 。可以这样理解, 每次升级时,
          如果莫蒂在某项属性上的 EV 值高于一个新捕捉或未训练的莫蒂, 你就能获得额外的属性点。
        </p>
      </Cell>

      <Cell style={{ display: "block" }}>
        <h3>每击败一个莫蒂, 你会获得多少 EV 值？</h3>
        <p>
          这完全取决于你正在训练的莫蒂的基础属性。例如, 如果你通过击败 1 个野生莫蒂 (任何等级) 来训练一个 Hobo 莫蒂,
          你将获得 80 生命值 EV、70 攻击 EV、75 防御 EV 和 75 速度 EV (因为这些是 Hobo 莫蒂的基础属性) 。
        </p>
        <p>
          因此, 进行 EV 训练时, 你的等级完全不重要, 只要你击败足够的野生莫蒂, 在达到 100 级之前为每项属性达到最大 EVs
          即可。
        </p>
        <p>
          例如, 如果你开始训练一个起始攻击 EV 为 0 的 Hobo 莫蒂, 你需要击败多达 937 个莫蒂才能将攻击 EV
          训练到最大！幸运的是, 其他莫蒂有更好的基础属性！
        </p>
      </Cell>

      <Cell style={{ display: "block" }}>
        <h3>如何知道我的莫蒂 EV 已经训练满？</h3>
        <p>
          你必须击败数百个野生莫蒂才能将一个莫蒂完全 EV 训练。当前检查一个莫蒂是否完全 EV 训练的唯一方法是使用
          <Image
            src={`${POCKET_MORTYS_BASE_URL}/images/assets/ItemMegaSeedAttackIcon.png`}
            style={{ width: 18, margin: "0 4px" }}
            mode="widthFix"
          />
          巨型攻击种子,
          <Image
            src={`${POCKET_MORTYS_BASE_URL}/images/assets/ItemMegaSeedDefenceIcon.png`}
            style={{ width: 18, margin: "0 4px" }}
            mode="widthFix"
          />
          巨型防御种子或
          <Image
            src={`${POCKET_MORTYS_BASE_URL}/images/assets/ItemMegaSeedSpeedIcon.png`}
            style={{ width: 18, margin: "0 4px" }}
            mode="widthFix"
          />
          巨型速度种子
        </p>
        <p>
          如果游戏提示你<strong>“这个物品对该莫蒂没有效果”</strong>, 那么该莫蒂在使用的巨型种子对应的属性 EV
          已经训练满了。如果游戏允许你使用巨型种子, 那么你仍然需要继续训练。
        </p>
      </Cell>

      <Cell style={{ display: "block" }}>
        <h3>最好的 EV 训练方法是什么？</h3>
        <p>
          我们建议从一个你知道拥有好 IVs
          的高等级莫蒂开始。然后将另一个较低等级的莫蒂放入你的队伍中。你的目标是能够一击或两击击败每个遇到的野生莫蒂,
          但也不要升级太快, 因为你需要击败数百个莫蒂才能达到 100 级 (如果你训练的莫蒂等级过高, 你可能会获得过多的经验,
          并在最大化 EVs 前就达到了 100 级) 。
        </p>
        <p>
          一旦你检查并确认所有莫蒂的属性达到了最大 EVs, 你就可以继续按照自己的方式升级, 无论是通过与训练师对战, 使用升级
          巨型种子, 还是继续击败野生莫蒂。
        </p>
      </Cell>

      <Cell style={{ display: "block" }}>
        <h3>如果我的莫蒂已经是 100 级了怎么办？</h3>
        <p>
          如果你在没有进行 EV 训练的情况下将莫蒂训练到 100 级, 那么就没有办法回去进行 EV 训练了。此时,
          你只能接受这个莫蒂在最大等级下的属性不理想。
        </p>
      </Cell>

      <Cell style={{ display: "block" }}>
        <h3>为什么某些属性的 EV 训练时间比其他属性长？</h3>
        <p>
          你获得 EVs 是基于你正在训练的莫蒂的基础属性, 而这些属性在不同的莫蒂之间是不同的。例如,
          一些莫蒂可能有较高的基础攻击, 但较低的基础防御, 所以你不会均匀地提升所有属性的 EV。因为这个原因,
          你可能击败了数百个莫蒂后, 发现你的攻击 EV 高于防御 EV。
        </p>
      </Cell>

      <Cell style={{ display: "block" }}>
        <h3>如何计算 IVs?</h3>
        <p>
          我们在网站上制作了一个
          <Text
            className="link"
            onClick={() => {
              Taro.navigateTo({
                url: "/pages/calculators/ivs/index",
              });
            }}
          >
            小工具
          </Text>
          , 用于计算莫蒂的 IVs 和属性。只需选择你的莫蒂, 选择它是未训练还是完全训练, 输入它的等级和属性, 然后点击计算,
          就可以获得可能的 IVs 范围。我们还添加了一个小“星级评分”来帮助你直观地查看每个 IV 的优劣。记住, 16
          是你能拥有的最佳 IV!
        </p>
        <p>
          如果你还没有训练你的莫蒂, 那么你应该在计算器中输入“0”或“最小 IVs”, 因为你还没有真正升级, 也没有获得任何 EV
          属性加成。
        </p>
      </Cell>
      <SafeArea position="bottom" />
    </View>
  );
}
