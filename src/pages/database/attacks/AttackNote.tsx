import { P } from "@/components";
import { Divider, Table, TableColumnProps, SafeArea } from "@nutui/nutui-react-taro";
import { ScrollView, Text } from "@tarojs/components";

export default function AttackNote() {
  const columns: TableColumnProps[] = [
    {
      key: "stacks",
      // fixed: "left",
      title: "叠加层数",
    },
    {
      key: "buff",
      title: "Buff (增益效果)",
    },
    {
      key: "debuff",
      title: "Debuff (减益效果)",
    },
  ];

  return (
    <ScrollView style={{ padding: 16, maxHeight: 600, boxSizing: "border-box" }} scrollY>
      <P>Buff (增加效果) 和 Debuff (减益效果) 分为 Weak, Medium, 或 Strong.</P>
      <Text> 在战斗中, 你最多可以在自己或对手身上叠加 6 层 buff 或 debuff. 其中:</Text>
      <ul>
        <li>Weak = 1 stack</li>
        <li>Medium = 2 stacks</li>
        <li>Strong = 3 stacks</li>
      </ul>
      <P>例如, 如果你使用了两次精神创伤技能, 敌人将会获得总计 6 层的命中 Debuff (2 次 Strong 攻击, 每次为 3 层)</P>
      <P>每层 Buff 或 Debuff 都具有以下叠加效果</P>

      <Divider>攻击, 防御和速度的叠加效果</Divider>
      <Table
        style={{ boxSizing: "border-box" }}
        columns={columns}
        data={[
          { stacks: 1, buff: "x1.25 (125%)", debuff: "x0.8 (80%)" },
          { stacks: 2, buff: "x1.5 (150%)", debuff: "x0.6666 (66.66%)" },
          { stacks: 3, buff: "x1.75 (175%)", debuff: "x0.5714 (57.14%)" },
          { stacks: 4, buff: "x2 (200%)", debuff: "x0.5 (50%)" },
          { stacks: 5, buff: "x2.25 (225%)", debuff: "x0.4444 (44.44%)" },
          { stacks: 6, buff: "x2.5 (250%)", debuff: "x0.4 (40%)" },
        ]}
      />
      <Divider>命中和闪避的叠加效果</Divider>
      <Table
        style={{ boxSizing: "border-box" }}
        columns={columns}
        data={[
          { stacks: 1, buff: "x1.0666 (106.66%)", debuff: "x0.9375 (93.75%)" },
          { stacks: 2, buff: "x1.1333 (113.33%)", debuff: "x0.8824 (88.24%)" },
          { stacks: 3, buff: "x1.2 (120%)", debuff: "x0.8333 (83.33%)" },
          { stacks: 4, buff: "x1.2666 (126.66%)", debuff: "x0.7895 (78.95%)" },
          { stacks: 5, buff: "x1.3333 (133.33%)", debuff: "x0.75 (75%)" },
          { stacks: 6, buff: "x1.4 (140%)", debuff: "x0.7143 (71.43%)" },
        ]}
      />
      <SafeArea position="bottom" />
    </ScrollView>
  );
}
