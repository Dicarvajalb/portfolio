import { onMount, For } from "solid-js";
import type { Skill } from "../types/content";

interface Props {
  data: Skill[];
}

export default function Skills(props: Props) {
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
              }, i * 80);
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
    <section ref={sectionRef} class="py-32 px-6">
      <div class="mx-auto max-w-5xl">
        <div class="mb-16 flex items-center gap-4" data-reveal style="opacity:0;transform:translateY(24px);transition:all 0.7s cubic-bezier(0.22,1,0.36,1)">
          <span class="text-sm font-mono uppercase tracking-widest text-[var(--accent)]">
            Skills
          </span>
          <div class="h-px flex-1 bg-[var(--border)]" />
        </div>

        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <For each={props.data}>
            {(skill, i) => (
              <div
                data-reveal
                class="space-y-4"
                style={`opacity:0;transform:translateY(24px);transition:all 0.7s cubic-bezier(0.22,1,0.36,1) ${i() * 0.1}s`}
              >
                <h3 class="text-sm font-mono uppercase tracking-widest text-[var(--accent)]">
                  {skill.category}
                </h3>
                <ul class="space-y-2">
                  <For each={skill.items}>
                    {(item) => (
                      <li class="flex items-center gap-2 text-[var(--muted)] transition-colors hover:text-[var(--fg)]">
                        <span class="h-1 w-1 rounded-full bg-[var(--accent)]" />
                        {item}
                      </li>
                    )}
                  </For>
                </ul>
              </div>
            )}
          </For>
        </div>
      </div>
    </section>
  );
}
