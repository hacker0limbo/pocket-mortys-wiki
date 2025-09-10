import { View, Text, Switch } from "@tarojs/components";
import { Button, Cell, InputNumber, SafeArea } from "@nutui/nutui-react-taro";
import { ArrowRight } from "@nutui/icons-react-taro";
import Taro from "@tarojs/taro";
import { useSettingsStore } from "@/store";

import "./index.scss";

export default function Settings() {
  const tablePageSize = useSettingsStore((store) => store.tablePageSize);
  const setTablePageSize = useSettingsStore((store) => store.setTablePageSize);

  return (
    <View>
      <Cell.Group title="关于">
        <Cell
          title="关于口袋莫蒂"
          extra={<ArrowRight />}
          clickable
          onClick={() => {
            Taro.navigateTo({ url: "/pages/settings/about/index" });
          }}
        />
        <Cell
          title="更新日志"
          extra={<ArrowRight />}
          clickable
          onClick={() => {
            Taro.navigateTo({ url: "/pages/settings/changelog/index" });
          }}
        />
      </Cell.Group>

      <Cell.Group title="外观设置">
        <Cell
          title="表格分页大小"
          extra={
            <InputNumber
              max={50}
              min={10}
              type="number"
              value={tablePageSize}
              onChange={(value) => {
                setTablePageSize(Number(value) ?? 10);
              }}
            />
          }
        />
      </Cell.Group>

      <Button openType="feedback" type="success" block style={{ marginTop: 16 }}>
        意见和反馈
      </Button>

      <SafeArea position="bottom" />
    </View>
  );
}
