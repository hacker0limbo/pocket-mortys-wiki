// 给定 DYNAMIC_CURRENT_ENV 常量：接下来的 API 调用都将请求到与该云函数当前所在环境相同的环境
// 请安装 wx-server-sdk v1.1.0 或以上以使用该常量
const cloud = require("wx-server-sdk");
const Axios = require("axios");
const { setupCache } = require("axios-cache-interceptor");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const instance = Axios.create();
const axios = setupCache(instance);

exports.main = (event, context) => {
  const { method = "get", url, params, data } = event;

  return axios({
    method,
    url,
    params,
    data,
  })
    .then((res) => {
      // 只返回必须的数据, 否则云函数会自动调用 JSON.stringify, axios 里有循环对象造成循环引用报错
      return {
        status: res.status,
        data: res.data,
      };
    })
    .catch((error) => {
      return {
        status: error.response?.status,
        error: error.message,
        data: error.response?.data,
      };
    });
};
