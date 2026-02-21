import { onMount, For } from "solid-js";
import type { ExperienceItem } from "../types/content";

interface Props {
  data: ExperienceItem[];
}

export default function Experience(props: Props) {
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
              }, i * 120);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(sectionRef);
  });

  return (
    <section id="experience" ref={sectionRef} class="py-32 px-6">
      <div class="mx-auto max-w-5xl">
        <div class="mb-16 flex items-center gap-4" data-reveal style="opacity:0;transform:translateY(24px);transition:all 0.7s cubic-bezier(0.22,1,0.36,1)">
          <span class="text-sm font-mono uppercase tracking-widest text-[var(--accent)]">
            Experience
          </span>
          <div class="h-px flex-1 bg-[var(--border)]" />
        </div>

        <div class="space-y-2">
          <For each={props.data}>
            {(item, i) => (
              <div
                data-reveal
                class="group grid gap-4 rounded-lg border border-transparent p-6 transition-all duration-300 hover:border-[var(--border)] hover:bg-[var(--surface)] md:grid-cols-4"
                style={`opacity:0;transform:translateY(24px);transition:all 0.7s cubic-bezier(0.22,1,0.36,1) ${i() * 0.1}s`}
              >
                <p class="font-mono text-sm text-[var(--muted)] pt-1">
                  {item.period}
                </p>
                <div class="md:col-span-3">
                  <h3 class="font-medium text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
                    {item.role}
                    <span class="text-[var(--accent)]"> &middot; </span>
                    {item.company}
                  </h3>
                  <p class="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    {item.description}
                  </p>
                  <div class="mt-4 flex flex-wrap gap-2">
                    <For each={item.tags}>
                      {(tag) => (
                        <span class="rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-medium text-[var(--accent)]">
                          {tag}
                        </span>
                      )}
                    </For>
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
    </section>
  );
}
