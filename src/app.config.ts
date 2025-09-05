export default defineAppConfig({
  pages: ["pages/index/index", "pages/settings/index/index"],
  subPackages: [
    {
      root: "pages/faq",
      pages: ["index"],
    },
    {
      root: "pages/database/index",
      pages: ["index"],
    },
    {
      root: "pages/database/attacks",
      pages: ["index", "attack/index"],
    },
    {
      root: "pages/database/avatars",
      pages: ["index"],
    },
    {
      root: "pages/database/mortys",
      pages: ["index", "morty/index"],
    },
    {
      root: "pages/database/items",
      pages: ["index", "item/index"],
    },
    {
      root: "pages/database/npcs",
      pages: ["index"],
    },
    {
      root: "pages/database/quests",
      pages: ["index"],
    },
    {
      root: "pages/database/raids",
      pages: ["index"],
    },
    {
      root: "pages/database/recipes",
      pages: ["index"],
    },
    {
      root: "pages/database/sign-posts",
      pages: ["index"],
    },
    {
      root: "pages/database/dimensions",
      pages: ["index", "dimension/index"],
    },
    {
      root: "pages/database/trainers",
      pages: ["index"],
    },
    // settings
    {
      root: "pages/settings/about",
      pages: ["index"],
    },
    // guides
    {
      root: "pages/guides/index",
      pages: ["index"],
    },
    // calculators
    {
      root: "pages/calculators/index",
      pages: ["index"],
    },
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "口袋莫蒂",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "./img/morty.png",
        selectedIconPath: "./img/morty.png",
      },
      {
        pagePath: "pages/settings/index/index",
        text: "设置",
        iconPath: "./img/rick.png",
        selectedIconPath: "./img/rick.png",
      },
    ],
  },
  lazyCodeLoading: "requiredComponents",
});
