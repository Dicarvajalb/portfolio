import type { HeroContent } from "../types/content";

interface Props {
  data: HeroContent;
}

export default function Hero(props: Props) {
  return (
    <section
      id="top"
      class="grid min-h-[calc(100vh-5rem)] w-full items-center gap-12 py-10 md:gap-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:py-16"
    >
      <div class="mx-auto flex w-full max-w-3xl flex-col items-start lg:mx-0">
        <p class="mb-5 inline-flex rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
          {props.data.eyebrow}
        </p>
        <h1 class="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-[var(--fg)] sm:text-6xl lg:text-7xl">
          {props.data.name}
        </h1>
        <p class="mt-6 max-w-2xl text-xl leading-8 text-[var(--fg-soft)] sm:text-2xl">
          {props.data.title}
        </p>
        <p class="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
          {props.data.description}
        </p>
        <div class="mt-10 flex flex-wrap gap-4">
          <a
            href={props.data.primaryCta.url}
            class="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-contrast)] transition-transform hover:-translate-y-0.5"
          >
            {props.data.primaryCta.label}
          </a>
          <a
            href={props.data.secondaryCta.url}
            class="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[color:var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--fg)] transition-colors hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
          >
            {props.data.secondaryCta.label}
          </a>
        </div>
      </div>

      <div class="relative mx-auto w-full max-w-2xl lg:mx-0 lg:justify-self-end">
        <div class="absolute inset-8 rounded-[2.5rem] bg-[radial-gradient(circle_at_top,_rgba(223,147,95,0.34),transparent_58%)] blur-3xl" />
        <div class="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.02))] p-4 shadow-[var(--shadow-card)] sm:p-5">
          <div class="relative overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[color:var(--surface-strong)]">
            <div class="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(47,93,124,0.18),transparent)]" />
            <img
              src="/photo.png"
              alt={`Portrait of ${props.data.name}`}
              class="aspect-[4/5] w-full object-cover object-center"
            />
          </div>

          
        </div>
      </div>
    </section>
  );
}
