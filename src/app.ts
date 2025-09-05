import { PropsWithChildren } from "react";
import Taro, { useLaunch } from "@tarojs/taro";

import "@tarojs/taro/html.css";
import "@nutui/nutui-react-taro/dist/style.css";
import "./app.scss";

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log("App launched.");
    // 初始化云服务
    Taro.cloud.init({
      env: "cloudbase-0grapuis2753b5c0",
      traceUser: true,
    });
  });

  // children 是将要会渲染的页面
  return children;
}

export default App;
