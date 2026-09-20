import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "~/hooks/use-language";
import { SectionReveal, RevealItem } from "~/components/section-reveal";
import { Github, Mail, Heart, MessageCircle, X } from "lucide-react";
import { TelegramIcon } from "~/components/icons";
import { site } from "~/lib/site";

interface QrPopup {
  image: string;
  label: string;
}

export function ContactSection() {
  const { t } = useLanguage();
  const [popup, setPopup] = useState<QrPopup | null>(null);

  const close = useCallback(() => setPopup(null), []);

  useEffect(() => {
    if (!popup) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [popup, close]);

  const links = [
    {
      icon: Github,
      label: t("contactGithub"),
      href: site.github,
      external: true,
    },
    {
      icon: Mail,
      label: t("contactEmail"),
      href: `mailto:${site.email}`,
      external: false,
    },
    {
      icon: TelegramIcon,
      label: t("contactTelegram"),
      href: site.telegram,
      external: true,
    },
    {
      icon: Heart,
      label: t("contactSponsor"),
      onClick: () => setPopup({ image: "/images/sponsor.jpg", label: t("contactSponsor") }),
    },
    {
      icon: MessageCircle,
      label: t("contactQQ"),
      onClick: () => setPopup({ image: "/images/qq.jpg", label: t("contactQQ") }),
    },
  ];

  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-2xl scroll-mt-24 px-6 py-20"
    >
      <SectionReveal className="flex flex-col items-center gap-8 text-center">
        <RevealItem>
          <h2
            data-smash-target
            className="font-serif text-3xl font-bold tracking-tight md:text-4xl"
          >
            {t("contactTitle")}
          </h2>
        </RevealItem>
        <RevealItem>
          <p data-smash-target className="text-muted-foreground">
            {t("contactSubtitle")}
          </p>
        </RevealItem>

        <RevealItem className="flex flex-wrap justify-center gap-4">
          {links.map((link) =>
            "href" in link ? (
              <motion.a
                data-smash-target
                key={link.label}
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="flex items-center gap-2 rounded-full border border-border bg-card/50 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:border-primary/50 hover:text-primary"
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </motion.a>
            ) : (
              <motion.button
                data-smash-target
                key={link.label}
                type="button"
                onClick={link.onClick}
                className="flex items-center gap-2 rounded-full border border-border bg-card/50 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:border-primary/50 hover:text-primary"
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </motion.button>
            )
          )}
        </RevealItem>
      </SectionReveal>

      <motion.footer
        data-smash-target
        className="mt-24 pb-8 text-center text-xs text-muted-foreground"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <p>
          &copy; 2024-2026 {site.name} | {t("footerSlogan")}
        </p>
        <p className="mt-2">{t("madeWith")}</p>
      </motion.footer>

      <AnimatePresence>
        {popup && (
          <motion.div
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-background/80 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={popup.label}
          >
            <motion.div
              className="relative max-w-sm rounded-xl border border-border bg-card p-4 shadow-2xl"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-3 flex items-center justify-between gap-4">
                <span className="text-sm font-medium text-foreground">
                  {popup.label}
                </span>
                <button
                  type="button"
                  onClick={close}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                  aria-label={t("modalClose")}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <img
                src={popup.image}
                alt={popup.label}
                className="max-h-[70vh] w-full rounded-lg object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
