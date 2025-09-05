import Taro from "@tarojs/taro";

const PROXY_URL = "https://api.codetabs.com/v1/proxy?quest=";
export const POCKET_MORTYS_BASE_URL = "https://pocketmortys.net";
// json api 地址
export const POCKET_MORTYS_DATA_URL = `${POCKET_MORTYS_BASE_URL}/components/com_pocketmortys/json`;

export const POCKET_MORTYS_MEDIA_URL = `${POCKET_MORTYS_BASE_URL}/media/com_pocketmortys`;

// API 响应的结构
type ApiResponse<T = any> = {
  result: {
    data: T;
    status: any;
  };
  errMsg: string;
};

// 原生不做任何处理的请求
export function rawRequest(url: string, method?: string, data?: any, params?: any) {
  return Taro.cloud.callFunction({
    name: "proxyRequest",
    data: {
      url: `${PROXY_URL}${POCKET_MORTYS_BASE_URL}${url}`,
      method,
      params,
      data,
    },
  });
}

export function request<T = any>(url: string, method?: string, data?: any, params?: any): Promise<ApiResponse<T>> {
  return Taro.cloud.callFunction({
    name: "proxyRequest",
    data: {
      url: `${PROXY_URL}${POCKET_MORTYS_DATA_URL}${url}`,
      method,
      params,
      data,
    },
  }) as Promise<ApiResponse<T>>;
}

// 默认获取中文, 如果指定语言, 使用该语言的数据, e.g. en
export function requestTable<T = any>(tableUrl: string, lang = "cn") {
  let url = `/datatables${tableUrl}`;
  if (lang !== "cn") {
    url = url.replace(/cn/g, lang);
  }
  return request<T>(url);
}
