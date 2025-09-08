import { View, Text, Image } from "@tarojs/components";
import { Cell, Divider, SafeArea, Space } from "@nutui/nutui-react-taro";
import { POCKET_MORTYS_BASE_URL, POCKET_MORTYS_MEDIA_URL } from "@/api/request";
import { type BestMorty, BestMortyInfo } from "./BestMortyInfo";
import "./index.scss";

const BestDebuffers: BestMorty[] = [
  {
    level: "S",
    name: "禁书莫蒂",
    assetid: "MortyForbidden",
    desc: "禁书莫蒂无疑是游戏中最强的减益控制者, 主要因为他拥有出色的技能组合。只有另外一只莫蒂能够在其 4 个攻击槽中同时提供攻击减益、准确度减益、防御减益和麻痹减益, 这使得他成为 Raid 中不可或缺的“瑞士军刀”。唯一缺少的减益是闪避减益",
  },
  {
    level: "S",
    name: "盖亚之子",
    assetid: "MortyChildOfGaia",
    desc: "盖亚之子也是另一个非常出色的减益控制者。他可以在其 4 个攻击槽中提供攻击减益、准确度减益、闪避减益和防御减益, 这使得他在 Raid 中非常有用。唯一缺少的减益是麻痹。使用 Medicate x6 之前一定要先使用 Bunch Up x3, 否则你会不小心增强敌人的防御！",
  },
  {
    level: "A",
    name: "水烟虫莫蒂",
    assetid: "MortyNargles",
    desc: "和禁书莫蒂一样, 水烟虫莫蒂也能在其 4 个攻击槽中提供攻击减益、准确度减益、防御减益和麻痹减益, 这对于 Raid 非常关键。他的属性可能略逊一筹, 但他更容易获得, 而且攻击和防御增益也是一个不错的附加效果",
  },
];

const BestRockAttackers: BestMorty[] = [
  {
    level: "S",
    name: "特罗弗莫蒂",
    assetid: "MortyTrover",
    desc: "拥有游戏中最强的石头属性技能 (Suplex) 、最高的基础防御 (135) 、优秀的基础攻击 (115) , 以及攻击和防御增益, 这只莫蒂是 Raid 中最强的石头属性攻击者之一 (如果不是最强的话) 。",
  },
  {
    level: "S",
    name: "今夕圣诞莫蒂",
    assetid: "MortyChristmasPresent",
    desc: "拥有游戏中最强的基础防御 (135)、优秀的基础攻击、双属性的石头/吸收技能 (Juice) 以及攻击增益技能, 使得这只莫蒂成为 Raid 中最强的石头属性攻击者之一 (如果不是最强的话)。如果你没有“Sing”技能, 可以使用“Love Yourself”代替, 但要小心不要不小心麻痹自己。",
  },
  {
    level: "S",
    name: "煎饼莫蒂",
    assetid: "MortyPancake",
    desc: "优秀的基础攻击、强力的石头属性攻击、攻击增益技能以及吸收技能, 使这只莫蒂成为 Raid 中出色的石头属性攻击者。如果你希望增加生存能力, 可以选择将石头属性技能“Crush”换成“Defend”, 以获得防御增益。",
  },
  {
    level: "S",
    name: "竞选管理员莫蒂",
    assetid: "MortyCampaignManager",
    desc: "基础属性稍逊一筹, 但拥有出色的技能组合, 包括强力的石头属性攻击、双属性的石头/吸收技能以及攻击和防御增益, 使这只莫蒂成为顶级的石头属性 Raid 攻击者之一。",
  },
  {
    level: "S",
    name: "巨龙莫蒂",
    assetid: "MortyDragon",
    desc: "优秀的属性、攻击和防御增益, 以及吸收技能, 使这只莫蒂成为 Raid 中非常出色的石头属性攻击者, 唯一的缺点是只有一项强力的石头属性攻击。如果你发现自己可以在没有防御增益的情况下生存, 可以考虑将 Hibernate 换成其他攻击技能 (如普通属性的 Fireball 或较弱的石头属性攻击 Slumber) 。你也可以将 Soul Search 换成麻痹技能, 或者将 Dragon Call 替换为 Soul Steal, 如果你想让 Dragon Morty 作为减益控制者 (只需搭配一个可以减益准确度的莫蒂) 。",
  },
  {
    level: "S",
    name: "元始莫蒂",
    assetid: "MortyTheOneTrue",
    desc: "优秀的属性, 但仅有一项石头属性攻击, 使得他作为 Raid 中的石头属性攻击者稍显不足。",
  },
  // TODO: 还有很多 A 级的石头莫蒂要写
];

const BestPaperAttackers: BestMorty[] = [
  {
    level: "S",
    name: "华盛顿莫蒂",
    assetid: "MortyWashington",
    desc: "优秀的攻击和防御属性, 拥有攻击和防御增益技能, 并且拥有强力的纸张属性攻击。如果不使用防御增益, 你可以用 Fortify 替代 Death Stare。这是 Raid 中最强的纸张属性攻击者。",
  },
  {
    level: "S",
    name: "阿米巴莫蒂",
    assetid: "MortyAmoeba",
    desc: "较低的攻击属性通过出色的防御和吸收技能 (Osmosis) 得以弥补, 使其成为 Raid 中不错的纸张属性攻击者。",
  },
  {
    level: "S",
    name: "搞笑莫蒂",
    assetid: "MortyFunny",
    desc: "优秀的属性, 两项强力的纸张属性攻击以及攻击和防御增益技能——这只莫蒂唯一缺少的是 AP。如果使用 Recitation, 记得每隔一次攻击用 Mortify 重新增强你的攻击力。",
  },
  // TODO: 待补充...
];

const BestScissorsAttackers: BestMorty[] = [
  {
    level: "S",
    name: "未来圣诞莫蒂",
    assetid: "MortyChristmasFuture",
    desc: "拥有游戏中最高的基础攻击, 强力的攻击增益技能, 以及通过 Grieve 提供的治疗选项, 这只莫蒂是最强的剪刀属性攻击者之一。唯一的缺点是缺乏 AP。",
  },
  {
    level: "S",
    name: "海豹莫蒂",
    assetid: "MortySeal",
    desc: "待推出...",
  },
  {
    level: "A",
    name: "可怕莫蒂",
    assetid: "MortyScary",
    desc: "可怕莫蒂的 Regenerate 技能将帮助他生存, 尽管他的普通属性攻击 Swing (90) 比剪刀属性攻击 Probe (60) 的威力更高, 但属性加成结合增益/减益效果最终会使 Probe 成为造成最大伤害的更佳选择。",
  },
  {
    level: "A",
    name: "腹语箭手莫蒂",
    assetid: "MortyVentriloquiver",
    desc: "待推出...",
  },
];

export default function BestMortys() {
  return (
    <View>
      <Cell style={{ display: "block" }}>
        <Text>
          在组建莫蒂队伍时有很多选择, 虽然没有一个适用于所有情况的“完美”队伍,
          但有些莫蒂显然比其他莫蒂更强。这份指南将为你推荐最适合 Raid 战斗和 PVP 玩法的莫蒂。
        </Text>
      </Cell>

      <Cell style={{ display: "block" }}>
        <h3>最强 Raid 莫蒂</h3>
        <Text>本节列出了我们认为最适合在 Raid 中使用的莫蒂。我们将莫蒂分为以下几类：</Text>
        <ul>
          <li>
            <Image
              src={`${POCKET_MORTYS_MEDIA_URL}/images/debuff.png`}
              style={{ width: 14, marginRight: 4 }}
              mode="widthFix"
            />
            减益类型
          </li>
          <li>
            <Image
              src={`${POCKET_MORTYS_BASE_URL}/images/rock_small.png`}
              style={{ width: 16, marginRight: 4 }}
              mode="widthFix"
            />
            石头类型
          </li>
          <li>
            <Image
              src={`${POCKET_MORTYS_BASE_URL}/images/scissors_small.png`}
              style={{ width: 16, marginRight: 4 }}
              mode="widthFix"
            />
            剪刀类型
          </li>
          <li>普通类型</li>
        </ul>
        <p>
          在组建 Raid 队伍时, 理想情况下你需要 1-2 个能够降低 Boss 攻击力、准确度、防御力和闪避的“减益”莫蒂, 同时还能
          <Image
            src={`${POCKET_MORTYS_BASE_URL}/images/paralyze_small.png`}
            style={{ width: 16, marginRight: 4, marginLeft: 4 }}
            mode="widthFix"
          />
          麻痹 Boss。Raid Boss 目前对
          <Image
            src={`${POCKET_MORTYS_BASE_URL}/images/poison_small.png`}
            style={{ width: 16, marginRight: 4, marginLeft: 4 }}
            mode="widthFix"
          />
          毒和
          <Image
            src={`${POCKET_MORTYS_MEDIA_URL}/assets/ItemMrMeeseekIcon.png`}
            style={{ width: 16, marginRight: 4, marginLeft: 4 }}
            mode="widthFix"
          />
          Mr. Meeseeks Box 免疫, 所以不必使用这些。速度在 Raid 中也没有效果, 因为你总是会先攻击。
        </p>
        <Divider />

        <h4>最佳减益莫蒂</h4>
        <p>
          要在 Raid 中取得成功, 你需要减益 Raid Boss 的属性, 以提高你的输出伤害和生存能力。在足够高的等级下,
          减益控制者的类型并不重要 (你仍然可以在被击败之前完成所有需要的攻击) ,
          所以请使用你最强的减益莫蒂。以下是我们认为最好的减益莫蒂：
        </p>

        {BestDebuffers.map((info) => (
          <BestMortyInfo key={info.assetid} {...info} />
        ))}
        <Divider />

        <h4>最佳石头攻击技能莫蒂</h4>
        {BestRockAttackers.map((info) => (
          <BestMortyInfo key={info.assetid} {...info} />
        ))}
        <Divider />

        <h4>最佳纸张攻击技能莫蒂</h4>
        {BestPaperAttackers.map((info) => (
          <BestMortyInfo key={info.assetid} {...info} />
        ))}
        <Divider />

        <h4>最佳剪刀攻击技能莫蒂</h4>
        {BestScissorsAttackers.map((info) => (
          <BestMortyInfo key={info.assetid} {...info} />
        ))}
        <Divider />
      </Cell>

      <Cell style={{ display: "block" }}>
        <h3>最佳 PVP 莫蒂</h3>
        <Text>本节列出了我们认为最适合在 PVP 中使用的莫蒂。我们将莫蒂分为以下几类：</Text>
        <ul>
          <li>
            <Image
              src={`${POCKET_MORTYS_MEDIA_URL}/images/debuff.png`}
              style={{ width: 14, marginRight: 4 }}
              mode="widthFix"
            />
            减益类型
          </li>
          <li>攻击类型</li>
        </ul>
        <p>
          在构建 PvP 卡组时, 理想情况下你需要 1-2 个能够降低对手关键属性 (如速度) 的“减益”莫蒂,
          同时还能使对手中毒。只要你有一个更快的莫蒂, 你应该总能在被击败之前使用 Mr. Meeseeks Box.
        </p>
      </Cell>

      <SafeArea position="bottom" />
    </View>
  );
}
