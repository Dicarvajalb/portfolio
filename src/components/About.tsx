import { onMount, For } from "solid-js";
import type { AboutContent } from "../types/content";

interface Props {
  data: AboutContent;
}

export default function About(props: Props) {
  let sectionRef!: HTMLElement;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = sectionRef.querySelectorAll("[data-reveal]");
            els.forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = "1";
                (el as HTMLElement).style.transform = "translateY(0)";
              }, i * 100);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(sectionRef);
  });

  return (
    <section id="about" ref={sectionRef} class="py-32 px-6">
      <div class="mx-auto max-w-5xl">
        <div class="mb-16 flex items-center gap-4" data-reveal style="opacity:0;transform:translateY(24px);transition:all 0.7s cubic-bezier(0.22,1,0.36,1)">
          <span class="text-sm font-mono uppercase tracking-widest text-[var(--accent)]">
            {props.data.heading}
          </span>
          <div class="h-px flex-1 bg-[var(--border)]" />
        </div>

        <div class="grid gap-12 md:grid-cols-5">
          <div class="md:col-span-3 space-y-6">
            <For each={props.data.paragraphs}>
              {(paragraph, i) => (
                <p
                  data-reveal
                  class="text-[var(--muted)] leading-relaxed text-lg"
                  style={`opacity:0;transform:translateY(24px);transition:all 0.7s cubic-bezier(0.22,1,0.36,1) ${i() * 0.1}s`}
                >
                  {paragraph}
                </p>
              )}
            </For>
          </div>

          <div class="md:col-span-2 space-y-6">
            <For each={props.data.highlights}>
              {(highlight, i) => (
                <div
                  data-reveal
                  class="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300 hover:border-[var(--accent)]/30"
                  style={`opacity:0;transform:translateY(24px);transition:all 0.7s cubic-bezier(0.22,1,0.36,1) ${0.2 + i() * 0.1}s`}
                >
                  <p class="text-3xl font-bold text-[var(--accent)]">
                    {highlight.value}
                  </p>
                  <p class="mt-1 text-sm text-[var(--muted)]">
                    {highlight.label}
                  </p>
                </div>
              )}
            </For>
          </div>
        </div>
      </div>
    </section>
  );
}
