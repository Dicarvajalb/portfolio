import { createEffect, createMemo, createSignal, onMount } from "solid-js";
import type { Locale, PortfolioContent } from "./types/content";
import content from "./content/portfolio.json";
import Background from "./components/ParticleBackground";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const data = content as PortfolioContent;
const storageKey = "portfolio-locale";
const themeStorageKey = "portfolio-theme";
type Theme = "light" | "dark";

export default function App() {
  const [locale, setLocale] = createSignal<Locale>(data.defaultLocale);
  const [theme, setTheme] = createSignal<Theme>("dark");

  onMount(() => {
    const stored = window.localStorage.getItem(storageKey) as Locale | null;
    const storedTheme = window.localStorage.getItem(themeStorageKey) as Theme | null;

    if (stored && stored in data.locales) {
      setLocale(stored);
    } else {
      setLocale(data.defaultLocale);
    }

    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
      return;
    }

  });

  const current = createMemo(() => data.locales[locale()]);

  createEffect(() => {
    const activeLocale = locale();
    const currentContent = current();

    document.documentElement.lang = activeLocale;
    document.title = currentContent.meta.title;
    window.localStorage.setItem(storageKey, activeLocale);

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute("content", currentContent.meta.description);
    }
  });

  createEffect(() => {
    const activeTheme = theme();
    document.documentElement.dataset.theme = activeTheme;
    document.documentElement.style.colorScheme = activeTheme;
    window.localStorage.setItem(themeStorageKey, activeTheme);
  });

  return (
    <>
      <Background />
      <Nav
        name={current().hero.name}
        items={current().nav}
        locale={locale()}
        localeLabels={data.localeLabels}
        theme={theme()}
        onLocaleChange={setLocale}
        onThemeToggle={() => setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"))}
      />
      <main class="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-4 pb-16 pt-4 sm:gap-20 sm:px-6 sm:pb-20 lg:gap-24 lg:px-8">
        <Hero data={current().hero} />
        <About data={current().about} />
        <Experience heading={current().experienceHeading} data={current().experience} />
        <Projects heading={current().projectsHeading} data={current().projects} />
        <Skills heading={current().skillsHeading} data={current().skills} />
        <Contact data={current().contact} />
      </main>
      <Footer
        name={current().hero.name}
        locale={locale()}
        footer={current().footer}
      />
    </>
  );
}
