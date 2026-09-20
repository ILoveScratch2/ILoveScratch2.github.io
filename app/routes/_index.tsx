import type { Route } from "./+types/_index";
import { useLoaderData } from "react-router";
import { fetchGitHubProjects } from "~/lib/github.server";
import { site } from "~/lib/site";
import { NavHeader } from "~/components/nav-header";
import { HeroSection } from "~/components/hero-section";
import { SitesSection } from "~/components/site-cards";
import { ProjectsSection } from "~/components/projects-section";
import { ContactSection } from "~/components/contact-section";
import { ShaderBackground } from "~/components/shader-background";

const title = "ILoveScratch2's Homepage - Developer & Tech Enthusiast";

export function meta({}: Route.MetaArgs) {
  return [
    { title },
    { name: "description", content: site.description },
    { name: "author", content: site.name },
    {
      name: "keywords",
      content: site.keywords.join(", "),
    },
    { tagName: "link", rel: "canonical", href: `${site.url}/` },
    { property: "og:type", content: "website" },
    { property: "og:url", content: `${site.url}/` },
    { property: "og:title", content: title },
    { property: "og:description", content: site.description },
    { property: "og:image", content: `${site.url}/images/logo.png` },
    { property: "og:locale", content: "zh_CN" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: site.description },
    { name: "twitter:image", content: `${site.url}/images/logo.png` },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  const repos = await fetchGitHubProjects();
  return { repos };
}

export default function Index() {
  const { repos } = useLoaderData<typeof loader>();

  return (
    <div id="top">
      <ShaderBackground />
      <NavHeader />
      <main className="relative z-10">
        <HeroSection />
        <SitesSection />
        <ProjectsSection repos={repos} />
        <ContactSection />
      </main>
    </div>
  );
}
