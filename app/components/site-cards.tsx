import { motion } from "framer-motion";
import { useLanguage } from "~/hooks/use-language";
import { siteLinks, type SiteLink } from "~/lib/site";
import { ArrowUpRight } from "lucide-react";

function SiteRow({ link, index }: { link: SiteLink; index: number }) {
  const { t } = useLanguage();

  return (
    <motion.a
      data-smash-target
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-1 border-t border-border py-8 first:border-t-0"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.08,
      }}
    >
      <span className="flex items-center gap-3">
        <span className="relative">
          <span className="font-serif text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary md:text-3xl">
            {t(link.key)}
          </span>
          <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
        </span>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
      </span>
      <span className="text-sm text-muted-foreground">
        {t(link.descriptionKey)}
      </span>
    </motion.a>
  );
}

export function SitesSection() {
  const { t } = useLanguage();

  return (
    <section
      id="sites"
      className="mx-auto w-full max-w-3xl scroll-mt-24 px-6 py-20"
    >
      <motion.div
        data-smash-target
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="mb-10 text-center"
      >
        <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">
          {t("sitesTitle")}
        </h2>
        <p className="mt-2 text-muted-foreground">{t("sitesSubtitle")}</p>
      </motion.div>

      <div className="flex flex-col">
        {siteLinks.map((link, index) => (
          <SiteRow key={link.key} link={link} index={index} />
        ))}
      </div>
    </section>
  );
}
