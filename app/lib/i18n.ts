export type Language = "zh" | "en";

export const translations = {
  zh: {
    navHome: "首页",
    navSites: "网站",
    navProjects: "项目",
    navContact: "联系",

    heroName: "ILoveScratch",
    heroTitle: "YWD2023",
    heroBio: "Debug the world!",
    heroQuote: "The only way to do great is to love what you do.",
    heroStack: "Python / Web / JS",

    sitesTitle: "网站",
    sitesSubtitle: "自己的服务?",
    siteBlog: "博客",
    siteBlogDesc: "记录日常",
    siteProjects: "项目",
    siteProjectsDesc: "我的项目",

    projectsTitle: "项目",
    projectsSubtitle: "近期开源项目",
    projectsFallback: "GitHub 拉取失败，展示部分项目",

    contactTitle: "联系我",
    contactSubtitle: "欢迎通过以下方式找到我",
    contactGithub: "GitHub",
    contactEmail: "邮箱",
    contactTelegram: "Telegram",
    contactSponsor: "支持",
    contactQQ: "QQ",
    modalClose: "关闭",

    footerSlogan: "Everything that kills me makes me feel alive",
    madeWith: "Made 由 ❤",

    themeLight: "浅色",
    themeDark: "深色",
  },
  en: {
    navHome: "Home",
    navSites: "Sites",
    navProjects: "Projects",
    navContact: "Contact",

    heroName: "ILoveScratch",
    heroTitle: "YWD2023",
    heroBio:
      "Debug the world!",
    heroQuote: "The only way to do great is to love what you do.",
    heroStack: "Python / Web / JS",

    sitesTitle: "Sites",
    sitesSubtitle: "Services I build?",
    siteBlog: "Blog",
    siteBlogDesc: "Notes on doing nothing",
    siteProjects: "Projects",
    siteProjectsDesc: "Fun things I built",

    projectsTitle: "Projects",
    projectsSubtitle: "Recent open-source work",
    projectsFallback: "GitHub is unreachable right now — here are some picks.",

    contactTitle: "Contact",
    contactSubtitle: "Feel free to reach out",
    contactGithub: "GitHub",
    contactEmail: "Email",
    contactTelegram: "Telegram",
    contactSponsor: "Sponsor",
    contactQQ: "QQ",
    modalClose: "Close",

    footerSlogan: "Everything that kills me makes me feel alive",
    madeWith: "Built with ❤",

    themeLight: "Light",
    themeDark: "Dark",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["zh"];
