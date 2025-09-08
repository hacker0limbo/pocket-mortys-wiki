import { Link } from "@/components";
import { Cell, SafeArea } from "@nutui/nutui-react-taro";
import { View, Text } from "@tarojs/components";
import { RAIDS_DIFFICULTY_LEVELS } from "@/constants";

export default function RaidsNote() {
  return (
    <View style={{ padding: 16 }}>
      <Text>
        想了解更多关于 Raid 的玩法吗? 来看看我们的口袋莫蒂 Raid <Link>指南</Link>.
      </Text>
      <Text> 目前共有 17 个 raid boss 威胁等级:</Text>
      <ul>
        {RAIDS_DIFFICULTY_LEVELS.map((level) => (
          <li key={level}>{level}</li>
        ))}
      </ul>

      <SafeArea position="bottom" />
    </View>
  );
}
