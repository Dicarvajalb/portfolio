import { For } from "solid-js";
import type { SkillGroup } from "../types/content";

interface Props {
  heading: string;
  data: SkillGroup[];
}

export default function Skills(props: Props) {
  return (
    <section id="skills" class="scroll-mt-28 w-full py-4">
      <p class="section-label">{props.heading}</p>
      <div class="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <For each={props.data}>
          {(group) => (
            <article class="rounded-[1.75rem] border border-[var(--border)] bg-[color:var(--surface)] p-6 shadow-[var(--shadow-soft)]">
              <h3 class="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                {group.category}
              </h3>
              <ul class="mt-5 space-y-3">
                <For each={group.items}>
                  {(item) => (
                    <li class="flex items-center gap-3 text-sm leading-6 text-[var(--fg-soft)]">
                      <span class="h-2 w-2 rounded-full bg-[var(--accent)]" />
                      <span>{item}</span>
                    </li>
                  )}
                </For>
              </ul>
            </article>
          )}
        </For>
      </div>
    </section>
  );
}
