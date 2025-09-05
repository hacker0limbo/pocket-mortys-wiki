import { Link } from "@/components";
import { Cell, SafeArea } from "@nutui/nutui-react-taro";
import { View, Text } from "@tarojs/components";

export default function RaidsNote() {
  return (
    <View style={{ padding: 16 }}>
      <Text>
        想了解更多关于 Raid 的玩法吗? 来看看我们的口袋莫蒂 Raid <Link>指南</Link>.
      </Text>
      <Text> 目前共有 17 个 raid boss 威胁等级:</Text>
      <ul>
        <li>松弛</li>
        <li>湿海绵</li>
        <li>可笑</li>
        <li>轻度危险</li>
        <li>川辣！</li>
        <li>疯狂！！</li>
        <li>恐慌！</li>
        <li>必死无疑</li>
        <li>致命</li>
        <li>痛苦世界</li>
        <li>无可救药</li>
        <li>荒唐可笑</li>
        <li>难以置信</li>
        <li>困难</li>
        <li>非常困难</li>
        <li>极其困难</li>
        <li>极端</li>
      </ul>

      <SafeArea position="bottom" />
    </View>
  );
}
