export const site = {
  name: "ILoveScratch2",
  url: "https://ilovescratch.us.ci",
  github: "https://github.com/ILoveScratch2",
  telegram: "https://t.me/ilovescratch",
  email: "ilovescratch@foxmail.com",
  location: "Shenzhen",
  description:
    "Web Developer, Python enthusiast, Linux lover. 二进制世界的插秧人。",
  keywords: [
    "ILoveScratch2",
    "Web Development",
    "Python",
    "Linux",
    "Vim",
    "Frontend",
  ],
} as const;

export interface SiteLink {
  key: "siteBlog" | "siteProjects";
  descriptionKey: "siteBlogDesc" | "siteProjectsDesc";
  href: string;
}

export const siteLinks: SiteLink[] = [
  {
    key: "siteBlog",
    descriptionKey: "siteBlogDesc",
    href: "https://blog.ilovescratch.dpdns.org",
  },
  {
    key: "siteProjects",
    descriptionKey: "siteProjectsDesc",
    href: "https://projects.ilovescratch.dpdns.org",
  },
];

export const techTags = [
  "Linux",
  "Vim",
  "Python",
  "TypeScript",
  "Docker",
  "Web",
  "Bug Maker",
  "VSCodium",
] as const;
