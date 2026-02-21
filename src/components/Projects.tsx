import { onMount, For } from "solid-js";
import type { Project } from "../types/content";

interface Props {
  data: Project[];
}

export default function Projects(props: Props) {
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
    <section id="projects" ref={sectionRef} class="py-32 px-6">
      <div class="mx-auto max-w-5xl">
        <div class="mb-16 flex items-center gap-4" data-reveal style="opacity:0;transform:translateY(24px);transition:all 0.7s cubic-bezier(0.22,1,0.36,1)">
          <span class="text-sm font-mono uppercase tracking-widest text-[var(--accent)]">
            Projects
          </span>
          <div class="h-px flex-1 bg-[var(--border)]" />
        </div>

        <div class="grid gap-6 md:grid-cols-2">
          <For each={props.data}>
            {(project, i) => (
              <a
                href={project.url}
                data-reveal
                class="group relative flex flex-col rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300 hover:border-[var(--accent)]/40 hover:shadow-lg hover:shadow-[var(--accent)]/5 hover:-translate-y-1"
                style={`opacity:0;transform:translateY(24px);transition:all 0.7s cubic-bezier(0.22,1,0.36,1) ${i() * 0.1}s`}
              >
                <div class="flex items-start justify-between">
                  <div class="rounded-lg bg-[var(--accent)]/10 p-3">
                    <svg
                      class="h-5 w-5 text-[var(--accent)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="1.5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                      />
                    </svg>
                  </div>
                  <span class="font-mono text-xs text-[var(--muted)]">
                    {project.year}
                  </span>
                </div>

                <h3 class="mt-4 text-lg font-medium text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
                  {project.title}
                  <svg
                    class="ml-1 inline-block h-4 w-4 opacity-0 -translate-x-1 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </h3>
                <p class="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                  {project.description}
                </p>
                <div class="mt-4 flex flex-wrap gap-2">
                  <For each={project.tags}>
                    {(tag) => (
                      <span class="rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-medium text-[var(--accent)]">
                        {tag}
                      </span>
                    )}
                  </For>
                </div>
              </a>
            )}
          </For>
        </div>
      </div>
    </section>
  );
}
