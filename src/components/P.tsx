import { View, ViewProps } from "@tarojs/components";

export function P({ children, style, ...restProps }: ViewProps) {
  return (
    <View style={{ marginBottom: 20, ...(style as React.CSSProperties) }} {...restProps}>
      {children}
    </View>
  );
}
