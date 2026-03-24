import { For, createSignal, onCleanup, onMount } from "solid-js";
import type { Locale, NavItem } from "../types/content";

type Theme = "light" | "dark";

interface Props {
  name: string;
  items: NavItem[];
  locale: Locale;
  localeLabels: Record<Locale, string>;
  theme: Theme;
  onLocaleChange: (locale: Locale) => void;
  onThemeToggle: () => void;
}

export default function Nav(props: Props) {
  const [activeSection, setActiveSection] = createSignal(props.items[0]?.id ?? "");
  const [menuOpen, setMenuOpen] = createSignal(false);
  const menuLabel = () => (props.locale === "es" ? "Abrir navegacion" : "Open navigation");
  const themeLabel = () =>
    props.locale === "es"
      ? props.theme === "light"
        ? "Activar tema oscuro"
        : "Activar tema claro"
      : props.theme === "light"
        ? "Switch to dark mode"
        : "Switch to light mode";
  const themeButtonText = () =>
    props.locale === "es"
      ? props.theme === "light"
        ? "Oscuro"
        : "Claro"
      : props.theme === "light"
        ? "Dark"
        : "Light";
  const mobileThemeButtonText = () =>
    props.locale === "es"
      ? props.theme === "light"
        ? "Modo oscuro"
        : "Modo claro"
      : props.theme === "light"
        ? "Dark mode"
        : "Light mode";

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {

        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }

      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.2, 0.5, 0.8],
      }
    );

    props.items.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) {
        observer.observe(section);
      }
    });

    onCleanup(() => observer.disconnect());
  });

  return (
    <header class="sticky top-0 z-50 border-b border-[var(--border)] bg-[color:var(--bg-elevated)]/90 backdrop-blur ">
      <nav class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8 ">
        <a
          href="#top"
          class="text-base font-semibold tracking-[0.18em] text-[var(--fg)] uppercase"
        >
          {props.name}
        </a>

        <div class="hidden items-center gap-3 lg:flex">
          <ul class="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[color:var(--surface)]/92 px-2 py-2 shadow-[var(--shadow-soft)]">
            <For each={props.items}>
              {(item) => (
                <li>
                  <a
                    href={`#${item.id}`}
                    class="rounded-full truncate px-4 py-2 text-sm font-medium transition-colors "
                    classList={{
                      "bg-[var(--accent)] text-[var(--accent-contrast)]":
                        activeSection() === item.id,
                      "text-[var(--muted)] hover:text-[var(--fg)]":
                        activeSection() !== item.id,
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              )}
            </For>
          </ul>

          <div class="flex items-center rounded-full border border-[var(--border)] bg-[color:var(--surface)] p-1">
            <For each={(["en", "es"] as const)}>
              {(value) => (
                <button
                  type="button"
                  class="rounded-full px-3 py-2 text-xs font-semibold tracking-[0.2em] transition-colors"
                  classList={{
                    "bg-[var(--fg)] text-[var(--bg)]": props.locale === value,
                    "text-[var(--muted)] hover:text-[var(--fg)]": props.locale !== value,
                  }}
                  onClick={() => props.onLocaleChange(value)}
                  aria-pressed={props.locale === value}
                >
                  {props.localeLabels[value]}
                </button>
              )}
            </For>
          </div>

          <button
            type="button"
            class="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--border)] bg-[color:var(--surface)] px-4 text-sm font-semibold text-[var(--fg)] transition-colors hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
            onClick={props.onThemeToggle}
            aria-label={themeLabel()}
            title={themeLabel()}
          >
            <span class="text-base" aria-hidden="true">
              {props.theme === "light" ? "\u263E" : "\u2600"}
            </span>
            <span>{themeButtonText()}</span>
          </button>
        </div>

        <button
          type="button"
          class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[color:var(--surface)] text-[var(--fg)] lg:hidden"
          onClick={() => setMenuOpen(!menuOpen())}
          aria-expanded={menuOpen()}
          aria-label={menuLabel()}
        >
          <span class="sr-only">{menuLabel()}</span>
          <div class="space-y-1.5">
            <span class="block h-0.5 w-5 bg-current" />
            <span class="block h-0.5 w-5 bg-current" />
            <span class="block h-0.5 w-5 bg-current" />
          </div>
        </button>
      </nav>

      <div
        class="border-t border-[var(--border)] bg-[color:var(--surface)] lg:hidden"
        classList={{ hidden: !menuOpen() }}
      >
        <div class="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:px-6">
          <For each={props.items}>
            {(item) => (
              <a
                href={`#${item.id}`}
                class="rounded-2xl px-4 py-3 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-[color:var(--surface-strong)] hover:text-[var(--fg)]"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            )}
          </For>

          <div class="flex gap-2 pt-2">
            <For each={(["en", "es"] as const)}>
              {(value) => (
                <button
                  type="button"
                  class="rounded-full border border-[var(--border)] px-4 py-2 text-xs font-semibold tracking-[0.2em]"
                  classList={{
                    "bg-[var(--fg)] text-[var(--bg)]": props.locale === value,
                    "text-[var(--muted)]": props.locale !== value,
                  }}
                  onClick={() => {
                    props.onLocaleChange(value);
                    setMenuOpen(false);
                  }}
                >
                  {props.localeLabels[value]}
                </button>
              )}
            </For>
          </div>

          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] px-4 py-3 text-sm font-semibold text-[var(--fg)]"
            onClick={() => {
              props.onThemeToggle();
              setMenuOpen(false);
            }}
            aria-label={themeLabel()}
          >
            <span aria-hidden="true">{props.theme === "light" ? "\u263E" : "\u2600"}</span>
            <span>{mobileThemeButtonText()}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
