import { SafeArea } from "@nutui/nutui-react-taro";
import { View, Text } from "@tarojs/components";

export default function TrainersNote() {
  return (
    <View style={{ padding: 16 }}>
      <Text>
        训练师是拥有自己莫蒂的 NPC, 你可以与他们战斗。在战役模式中, 通过 Citadel of Ricks 的传送门,
        你会在各个维度中遇到他们。每个维度都有一个瑞克和多个非瑞克的训练师。当你拥有足够的徽章时, 你还可以在 Citadel of
        Ricks 的 Council chamber 中与 Council Members 战斗。
      </Text>
      <SafeArea position="bottom" />
    </View>
  );
}
