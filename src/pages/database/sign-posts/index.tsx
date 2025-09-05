import { View, ScrollView } from "@tarojs/components";
import { getSignPosts, type SignPost } from "@/api/database";
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { Cell, SafeArea } from "@nutui/nutui-react-taro";
import { startCase } from "lodash-es";

import "./index.scss";

export default function SignPosts() {
  const [signPosts, setSignPosts] = useState<SignPost[]>([]);

  useEffect(() => {
    Taro.showLoading({
      title: "加载路标中...",
    });
    getSignPosts()
      .then((res) => {
        setSignPosts(res.result?.data?.data);
      })
      .catch(() => {
        Taro.showToast({
          title: "加载路标失败",
          icon: "error",
        });
      })
      .finally(() => {
        Taro.hideLoading();
      });
  }, []);

  return (
    <View>
      {signPosts.map(({ id, signpost_id, badge_req, dialogue }) => (
        <Cell.Group key={id}>
          <Cell title={startCase(signpost_id)} extra={Number(badge_req) > 0 ? `${badge_req} Badge` : null} />
          <Cell>{dialogue}</Cell>
        </Cell.Group>
      ))}
      <SafeArea position="bottom" />
    </View>
  );
}
