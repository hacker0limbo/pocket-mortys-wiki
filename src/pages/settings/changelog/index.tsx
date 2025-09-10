import { Cell, Steps, Step } from "@nutui/nutui-react-taro";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";

import "./index.scss";

type Log = {
  version: string;
  description: string;
};

const db = Taro.cloud.database();

export default function Changelog() {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    Taro.showLoading({
      title: "加载更新日志中...",
    });
    db.collection("changelog")
      .get()
      .then((res) => {
        setLogs(res.data as Log[]);
      })
      .catch(() => {
        Taro.showToast({
          title: "获取更新日志失败",
          icon: "error",
        });
      })
      .finally(() => {
        Taro.hideLoading();
      });
  }, []);

  return (
    <View>
      <Cell style={{ display: "block" }}>
        <Steps direction="vertical" type="dot" value={logs.length ?? 1} status="enhanced">
          {logs.map(({ version, description }, i) => (
            <Step value={i + 1} key={i} title={version} description={description} />
          ))}
        </Steps>
      </Cell>
    </View>
  );
}
