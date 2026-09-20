import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { useTheme } from "~/hooks/use-theme";
import { useLanguage } from "~/hooks/use-language";
import { Sun, Moon, Languages, Menu, X } from "lucide-react";
import type { TranslationKey } from "~/lib/i18n";
import { site } from "~/lib/site";

const navItems: Array<{ key: TranslationKey; href: string }> = [
  { key: "navSites", href: "#sites" },
  { key: "navProjects", href: "#projects" },
  { key: "navContact", href: "#contact" },
];

export function NavHeader() {
  const { isDark, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const { scrollY } = useScroll();
  const [menuOpen, setMenuOpen] = useState(false);

  const headerOpacity = useTransform(scrollY, [0, 100], [0, 0.8]);
  const headerBlur = useTransform(scrollY, [0, 100], [0, 12]);
  const backgroundColor = useTransform(
    headerOpacity,
    (v) => `hsl(var(--background) / ${v})`
  );
  const backdropFilter = useTransform(headerBlur, (v) => `blur(${v}px)`);

  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-4"
      style={{ backgroundColor, backdropFilter }}
    >
      <motion.a
        href="#top"
        className="text-sm font-medium text-foreground"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.5 }}
      >
        {site.name}
      </motion.a>

      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.6 }}
      >
        <nav className="hidden items-center gap-1 md:flex" aria-label="Sections">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-card/60 hover:text-foreground"
            >
              {t(item.key)}
            </a>
          ))}
        </nav>

        <motion.button
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card/50 text-foreground backdrop-blur-sm transition-colors hover:border-primary/50 md:hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </motion.button>

        <motion.button
          onClick={toggleLanguage}
          className="flex h-8 items-center gap-1.5 rounded-full border border-border bg-card/50 px-3 text-xs font-medium text-foreground backdrop-blur-sm transition-colors hover:border-primary/50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          aria-label="Toggle language"
        >
          <Languages className="h-3.5 w-3.5" />
          <span>{language === "zh" ? "EN" : "中"}</span>
        </motion.button>

        <motion.button
          onClick={toggleTheme}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card/50 text-foreground backdrop-blur-sm transition-colors hover:border-primary/50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          aria-label="Toggle theme"
        >
          <motion.div
            key={isDark ? "moon" : "sun"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </motion.div>
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="absolute left-0 right-0 top-full mx-4 flex flex-col overflow-hidden rounded-xl border border-border bg-card/95 py-1 backdrop-blur-md md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            aria-label="Sections"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {t(item.key)}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
