import { For } from "solid-js";
import type { Project } from "../types/content";

interface Props {
  heading: string;
  data: Project[];
}

export default function Projects(props: Props) {
  return (
    <section id="projects" class="scroll-mt-28 w-full py-4">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <p class="section-label">{props.heading}</p>
      </div>

      <div class="mt-6 grid gap-5 lg:grid-cols-3">
        <For each={props.data}>
          {(project) => (
            <article class="flex h-full flex-col rounded-[1.75rem] border border-[var(--border)] bg-[color:var(--surface)] p-6 shadow-[var(--shadow-card)] transition-transform hover:-translate-y-1">
              <div class="flex items-start justify-between gap-4">
                <h3 class="text-xl font-semibold text-[var(--fg)]">{project.title}</h3>
                <span class="rounded-full bg-[var(--sand)]/25 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-[var(--sand-deep)]">
                  {project.year}
                </span>
              </div>

              <p class="mt-4 flex-1 text-base leading-8 text-[var(--fg-soft)]">
                {project.description}
              </p>

              <div class="mt-5 flex flex-wrap gap-2">
                <For each={project.tags}>
                  {(tag) => <span class="pill">{tag}</span>}
                </For>
              </div>

              <div class="mt-6 flex flex-wrap gap-3">
                <For each={project.links}>
                  {(link) => (
                    <a
                      href={link.url}
                      class="inline-flex items-center rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--fg)] transition-colors hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
                    >
                      {link.label}
                    </a>
                  )}
                </For>
              </div>
            </article>
          )}
        </For>
      </div>
    </section>
  );
}
