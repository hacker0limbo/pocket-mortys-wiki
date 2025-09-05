import { View, Text } from "@tarojs/components";
import { Cell, SafeArea } from "@nutui/nutui-react-taro";
import { Link, P } from "@/components";
import Taro from "@tarojs/taro";

import "./index.scss";

const FAQ_LIST = [
  {
    q: "为什么我的莫蒂处于锁定状态 / 为什么无法解锁我的莫蒂？",
    a: "最近的一次游戏更新会自动锁定任何在你的战斗竞技场队伍中的莫蒂。要解锁它们，请先将它们从战斗竞技场队伍中移出，然后你就可以单独解锁它们。此举是为了防止交易和战斗竞技场的漏洞利用。",
  },
  {
    q: "我在安卓设备上购买了应用内商品，但游戏没有发放优惠券。我该怎么办？",
    a: (
      <>
        这个链接应该能解决你所有的问题：<Link copyable>https://support.google.com/googleplay/answer/1050566?hl=en</Link>
      </>
    ),
  },
  {
    q: "什么是 Raids? 我如何参与其中?",
    a: (
      <>
        请参考 <Link>Raids 指南</Link>
      </>
    ),
  },
  {
    q: "游戏支持手柄吗?",
    a: "目前暂时不支持手柄",
  },
  {
    q: "我在 Google Play 商店中收到“设备不兼容”的错误信息, 尽管我的设备应该是支持的. ",
    a: (
      <>
        <Text>
          我们知道这个问题，一些人在尝试下载口袋莫蒂时，尽管口袋莫蒂应该支持该设备，却会在 Google Play
          商店中收到“设备不兼容”的错误信息。Google 正在与 Google Play 商店一起调查这个问题
        </Text>
        <Text style={{ marginTop: 12, display: "inline-block" }}>
          {
            "作为临时解决方案，Google 建议清除 Google Play 商店的应用数据，然后再尝试安装口袋莫蒂。操作步骤为：前往设置  应用管理 > 所有 > Google Play 商店 > 清除数据。然后重启你的手机。"
          }
        </Text>
      </>
    ),
  },
  {
    q: "我的 iPhone 或 iPad 设备上没有声音效果或音乐。怎么办！",
    a: "检查一下你的设备的响铃/静音开关和音量设置。此外，音乐和音效的音量也可以在游戏设置中调整。",
  },
  {
    q: "我该如何保存游戏?",
    a: "游戏会在你游玩时自动保存到本地。另外，你也可以通过进入设置 -> 保存到云端，将游戏保存到云端。这样，如果数据被删除，或者想将其加载到运行相同操作系统的其他设备上时，可以恢复数据。",
  },
  {
    q: "我删除了应用！我能找回我的数据吗？",
    a: "从 1.6 版本开始，所有数据都会自动保存到云端，因此重新下载应用并登录你的账户后，应该会自动恢复所有之前的数据。",
  },
  {
    q: "我不小心放走了 Egg Morty / The One True Morty, 我能找回他吗?",
    a: "不能",
  },
  {
    q: "击败一个维度中的所有训练师后，我会获得什么特殊奖励吗？",
    a: "没有奖励",
  },
  {
    q: "我该如何捕捉稀有的莫蒂",
    a: (
      <>
        每个维度最多会刷出一个稀有莫蒂。你可以在
        <Link
          onClick={() => {
            Taro.navigateTo({
              url: "/pages/database/mortys/index",
            });
          }}
        >
          这里
        </Link>
        查看哪些莫蒂被认为是稀有的。
      </>
    ),
  },
  {
    q: "如果我所有的莫蒂都在战斗中被击败，会发生什么？我会失去什么吗？",
    a: "答：如果你所有的莫蒂都被击败，别担心！鸟人会把你带回 Citadel of Ricks, 你不会失去任何东西。",
  },
  {
    q: "我可以在战役模式和多人模式里互相转移莫蒂吗?",
    a: "不可以. 战役模式和多人模式是相互独立的两个模式. ",
  },
  {
    q: "我怎么才能抓到 Sun Morty / Black Hole Morty? 它一直在使用 Implode!",
    a: "你可以尝试立即使用 Morty Manipulator Chip 来低概率抓捕，或者使用一个有麻痹攻击的莫蒂 (例如 Pepperoni Pizza Morty 的“Gooey Cheese”攻击)。麻痹 Sun Morty / Black Hole Morty 会降低它成功使用 Implode 的几率。",
  },
  {
    q: "我最近更新了游戏，现在我丢失了存档数据 / 游戏只显示了旧的存档。我该怎么办？",
    a: "在 1.10.5 版本更新之前，如果你在 Android 设备上禁用了 Google Play 并继续在本地玩游戏，可能会导致丢失游戏存档数据。这个问题已经修复，但如果发生这种情况，遗憾的是无法恢复数据。因此，任何在 2017 年 4 月 3 日之前玩过游戏、在 2017 年 4 月 3 或 4 日下载了 1.10 更新并在 1.10.5 版本发布前的星期二下午玩过游戏的玩家，下次打开口袋莫蒂时，将会获得 5 张 Blitz 和 Chips 优惠券。更多信息，请阅读官方声明。",
  },
  {
    q: "帮助！我把我的莫蒂提升得太高，现在它不听话了！我该怎么办？",
    a: (
      <>
        <Text>
          如果你把莫蒂的等级提升得太高，超过了你的训练师等级，它就会开始不听话，直到你提升训练师等级为止。以下是决定莫蒂能继续听话的等级差距公式：
        </Text>
        <Text style={{ display: "inline-block", marginTop: 12 }}>
          Maximum Obedient Morty Level = 2 x Your Trainer Level + 2
        </Text>
        <Text style={{ display: "inline-block", marginTop: 12 }}>
          Minimum Trainer Level = (Your Morty′s Level - 2) / 2
        </Text>
        <Text style={{ display: "inline-block", marginTop: 12 }}>
          举个例子，在训练师等级为 5 时，最多能听话的莫蒂等级是 12. 在训练师等级为 6 时，最多能听话的莫蒂等级是 14.
          以此类推。
        </Text>
      </>
    ),
  },
  {
    q: "什么是 IV 和 EV?",
    a: (
      <>
        <Text>
          IVs (个体值) 是每个莫蒂在攻击、防御、速度和生命值上的隐藏属性。它们的范围是 0 到 16，无法修改。拥有更高 IVs
          的莫蒂，最终会比 IVs 较低的莫蒂拥有更好的属性。你可以通过进入莫蒂页面并将其属性输入到 IV 计算器中来计算它们。
        </Text>
        <Text style={{ display: "inline-block", marginTop: 12 }}>
          EVs (努力值) 是每个莫蒂在攻击、防御、速度和生命值上的隐藏属性。它们的范围是 0 到 65536,
          可以通过击败野生莫蒂或给你的莫蒂使用攻击、防御或速度的 Mega Seeds 来提高。当莫蒂升级时，它会根据 EV
          值获得额外的属性加成（见公式）。当达到一定数量后，升级时将不再获得这些额外属性。
        </Text>
      </>
    ),
  },
  {
    q: "有没有可以使用的口袋莫蒂作弊代码、漏洞、破解或无限金币版?",
    a: "作弊代码、漏洞、破解和其他利用方式违反了口袋莫蒂的服务条款。如果你看到一个网站声称提供这些内容，可能也会包含潜在的恶意代码，用来跟踪或窃取你的数据。此外，使用修改版的口袋莫蒂可能导致永久的数据丢失或损坏，甚至会导致你的口袋莫蒂账户被终止并丧失。因此，在尝试使用这些内容之前，请三思而后行！",
  },
  {
    q: "我怎么联系支持？",
    a: (
      <>
        如果你需要任何关于口袋莫蒂的技术支持, 请发送电子邮件至支持团队: <Link copyable>adultswimdotcom@gmail.com</Link>
      </>
    ),
  },
];

export default function FAQ() {
  return (
    <View>
      <Cell.Group divider={false}>
        <Cell style={{ display: "block" }}>
          <P>
            部分问答内容来源于{" "}
            <Link italic copyable>
              http://www.adultswim.com/games/pocket-mortys/
            </Link>
          </P>
          <View>
            如需官方支持，请发送邮件至 <Link copyable>support@adultswimgames.zendesk.com.</Link>
          </View>
        </Cell>
      </Cell.Group>

      {FAQ_LIST.map(({ q, a }, index) => (
        <Cell.Group key={index}>
          <Cell title={<Text style={{ fontWeight: "bold" }}>Q. {q}</Text>} />
          <Cell style={{ display: "block" }}>
            <Text style={{ wordBreak: "break-word" }}>A. {a}</Text>
          </Cell>
        </Cell.Group>
      ))}

      <SafeArea position="bottom" />
    </View>
  );
}
