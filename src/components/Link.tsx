import { Text, TextProps } from "@tarojs/components";
import Taro from "@tarojs/taro";

type LinkProps = {
  italic?: boolean;
  copyable?: boolean;
  copyText?: string;
} & TextProps;

export function Link({ children, italic, copyable, copyText, ...restProps }: LinkProps) {
  return (
    <Text
      onClick={() => {
        if (copyable || copyText) {
          Taro.setClipboardData({
            data: copyText ? copyText : (children as string),
            success: () => {
              Taro.showToast({
                title: "链接已复制",
                icon: "success",
              });
            },
          });
        }
      }}
      style={{ color: "#0f829c", fontStyle: italic ? "italic" : "normal" }}
      {...restProps}
    >
      {children}
    </Text>
  );
}
