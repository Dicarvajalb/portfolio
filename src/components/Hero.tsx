import { onMount } from "solid-js";
import type { HeroContent } from "../types/content";

interface Props {
  data: HeroContent;
}

export default function Hero(props: Props) {
  let sectionRef!: HTMLElement;

  onMount(() => {
    const els = sectionRef.querySelectorAll("[data-animate]");
    els.forEach((el, i) => {
      setTimeout(() => {
        (el as HTMLElement).style.opacity = "1";
        (el as HTMLElement).style.transform = "translateY(0)";
      }, 200 + i * 150);
    });
  });

  return (
    <section
      ref={sectionRef}
      class="relative flex min-h-screen items-center justify-center px-6"
    >
      <div class="max-w-3xl text-center">
        <p
          data-animate
          class="mb-4 font-mono text-sm tracking-widest text-[var(--accent)] uppercase opacity-0 translate-y-6 transition-all duration-700"
        >
          {props.data.title}
        </p>
        <h1
          data-animate
          class="mb-6 text-5xl font-bold leading-tight text-[var(--fg)] opacity-0 translate-y-6 transition-all duration-700 md:text-7xl text-balance"
        >
          {props.data.name}
        </h1>
        <p
          data-animate
          class="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-[var(--muted)] opacity-0 translate-y-6 transition-all duration-700 text-pretty"
        >
          {props.data.description}
        </p>
        <div
          data-animate
          class="flex items-center justify-center gap-4 opacity-0 translate-y-6 transition-all duration-700"
        >
          <a
            href={props.data.cta.url}
            class="inline-flex items-center gap-2 rounded-full border border-[var(--accent)] bg-[var(--accent)]/10 px-6 py-3 text-sm font-medium text-[var(--accent)] transition-all duration-300 hover:bg-[var(--accent)]/20 hover:shadow-lg hover:shadow-[var(--accent)]/10"
          >
            {props.data.cta.label}
            <svg
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div class="h-8 w-5 rounded-full border-2 border-[var(--muted)]/30 flex items-start justify-center p-1">
          <div class="h-1.5 w-1 rounded-full bg-[var(--accent)] animate-pulse" />
        </div>
      </div>
    </section>
  );
}
