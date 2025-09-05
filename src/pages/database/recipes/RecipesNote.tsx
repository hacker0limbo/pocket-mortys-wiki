import { SafeArea } from "@nutui/nutui-react-taro";
import { View, Text } from "@tarojs/components";

export default function RecipesNote() {
  return (
    <View style={{ padding: 16 }}>
      <Text>
        Crafting Stations 分布在整个口袋莫蒂中, 允许你将两件或三件物品组合成新的物品。数个 Crafting Stations 可以在
        Citadel of Ricks 中找到, 其余的则会随机分布在不同的维度中。
      </Text>
      <p>
        你能携带的每种物品数量是有限的, 因此在可能的情况下合成基础物品是一个好主意。目前游戏中战役模式里共有 34 个配方,
        在多人模式里共有 22 个配方。使用筛选器可以在战役模式和多人模式之间切换。
      </p>
      <SafeArea position="bottom" />
    </View>
  );
}
