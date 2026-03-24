import { For } from "solid-js";
import type { ExperienceItem } from "../types/content";

interface Props {
  heading: string;
  data: ExperienceItem[];
}

export default function Experience(props: Props) {
  return (
    <section id="experience" class="scroll-mt-28 w-full py-4">
      <p class="section-label">{props.heading}</p>
      <div class="mt-6 space-y-4">
        <For each={props.data}>
          {(item) => (
            <article class="rounded-[1.75rem] border border-[var(--border)] bg-[color:var(--surface)] p-6 shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-1">
              <div class="grid gap-6 lg:grid-cols-[0.24fr_0.76fr]">
                <p class="text-sm font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
                  {item.period}
                </p>
                <div>
                  <h3 class="text-xl font-semibold text-[var(--fg)]">
                    {item.role}
                    <span class="text-[var(--accent)]"> / </span>
                    {item.company}
                  </h3>
                  <p class="mt-3 text-base leading-8 text-[var(--fg-soft)]">
                    {item.description}
                  </p>
                  <div class="mt-5 flex flex-wrap gap-2">
                    <For each={item.tags}>
                      {(tag) => <span class="pill">{tag}</span>}
                    </For>
                  </div>
                </div>
              </div>
            </article>
          )}
        </For>
      </div>
    </section>
  );
}
