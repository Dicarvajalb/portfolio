import { For } from "solid-js";
import type { AboutContent } from "../types/content";

interface Props {
  data: AboutContent;
}

export default function About(props: Props) {
  return (
    <section id="about" class="scroll-mt-28 w-full py-4">
      <div class="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
        <div class="mx-auto w-full max-w-xl space-y-5 lg:mx-0">
          <p class="section-label">{props.data.heading}</p>
          <h2 class="text-3xl font-semibold tracking-[-0.03em] text-[var(--fg)] sm:text-4xl">
            {props.data.intro}
          </h2>
        </div>

        <div class="w-full space-y-8">
          <div class="grid gap-4 sm:grid-cols-3">
            <For each={props.data.highlights}>
              {(item) => (
                <div class="rounded-[1.5rem] border border-[var(--border)] bg-[color:var(--surface)] p-5 shadow-[var(--shadow-soft)]">
                  <p class="text-2xl font-semibold text-[var(--fg)]">{item.value}</p>
                  <p class="mt-2 text-sm leading-6 text-[var(--muted)]">{item.label}</p>
                </div>
              )}
            </For>
          </div>

          <div class="space-y-5 rounded-[1.75rem] border border-[var(--border)] bg-[color:var(--surface)] p-6 shadow-[var(--shadow-soft)] sm:p-7">
            <For each={props.data.paragraphs}>
              {(paragraph) => (
                <p class="text-base leading-8 text-[var(--fg-soft)]">{paragraph}</p>
              )}
            </For>
          </div>
        </div>
      </div>
    </section>
  );
}
