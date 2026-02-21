import { createSignal, onMount, onCleanup } from "solid-js";
import content from "../content/portfolio.json";

const sections = ["about", "experience", "projects", "contact"];

export default function Nav() {
  const [scrolled, setScrolled] = createSignal(false);
  const [activeSection, setActiveSection] = createSignal("");
  const [menuOpen, setMenuOpen] = createSignal(false);

  onMount(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sectionEls = sections
        .map((id) => document.getElementById(id))
        .filter(Boolean) as HTMLElement[];

      for (let i = sectionEls.length - 1; i >= 0; i--) {
        const el = sectionEls[i];
        if (el.getBoundingClientRect().top <= 200) {
          setActiveSection(sectionEls[i].id);
          return;
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    onCleanup(() => window.removeEventListener("scroll", handleScroll));
  });

  return (
    <header
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      classList={{
        "bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--border)]": scrolled(),
        "bg-transparent": !scrolled(),
      }}
    >
      <nav class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a
          href="#"
          class="font-semibold text-[var(--fg)] tracking-tight text-lg transition-colors hover:text-[var(--accent)]"
        >
          {content.hero.name.split(" ")[0]}
          <span class="text-[var(--accent)]">.</span>
        </a>

        {/* Desktop nav */}
        <ul class="hidden items-center gap-8 md:flex">
          {sections.map((section) => (
            <li>
              <a
                href={`#${section}`}
                class="text-sm uppercase tracking-widest transition-colors duration-300"
                classList={{
                  "text-[var(--accent)]": activeSection() === section,
                  "text-[var(--muted)] hover:text-[var(--fg)]": activeSection() !== section,
                }}
              >
                {section}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          class="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMenuOpen(!menuOpen())}
          aria-label="Toggle menu"
          aria-expanded={menuOpen()}
        >
          <span
            class="block h-0.5 w-6 bg-[var(--fg)] transition-transform duration-300 origin-center"
            classList={{ "rotate-45 translate-y-2": menuOpen() }}
          />
          <span
            class="block h-0.5 w-6 bg-[var(--fg)] transition-opacity duration-300"
            classList={{ "opacity-0": menuOpen() }}
          />
          <span
            class="block h-0.5 w-6 bg-[var(--fg)] transition-transform duration-300 origin-center"
            classList={{ "-rotate-45 -translate-y-2": menuOpen() }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        class="overflow-hidden transition-all duration-500 md:hidden"
        classList={{
          "max-h-64 opacity-100": menuOpen(),
          "max-h-0 opacity-0": !menuOpen(),
        }}
      >
        <ul class="flex flex-col gap-4 px-6 pb-6">
          {sections.map((section) => (
            <li>
              <a
                href={`#${section}`}
                onClick={() => setMenuOpen(false)}
                class="text-sm uppercase tracking-widest transition-colors duration-300"
                classList={{
                  "text-[var(--accent)]": activeSection() === section,
                  "text-[var(--muted)] hover:text-[var(--fg)]": activeSection() !== section,
                }}
              >
                {section}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
