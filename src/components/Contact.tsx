import { onMount, For } from "solid-js";
import type { ContactContent } from "../types/content";

interface Props {
  data: ContactContent;
}

const iconPaths: Record<string, string> = {
  GitHub:
    "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
  LinkedIn:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  X: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
};

export default function Contact(props: Props) {
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
      { threshold: 0.2 }
    );
    observer.observe(sectionRef);
  });

  return (
    <section id="contact" ref={sectionRef} class="py-32 px-6">
      <div class="mx-auto max-w-5xl">
        <div class="mb-16 flex items-center gap-4" data-reveal style="opacity:0;transform:translateY(24px);transition:all 0.7s cubic-bezier(0.22,1,0.36,1)">
          <span class="text-sm font-mono uppercase tracking-widest text-[var(--accent)]">
            Contact
          </span>
          <div class="h-px flex-1 bg-[var(--border)]" />
        </div>

        <div class="grid gap-12 md:grid-cols-2">
          <div>
            <h2
              data-reveal
              class="text-3xl font-bold text-[var(--fg)] md:text-4xl text-balance"
              style="opacity:0;transform:translateY(24px);transition:all 0.7s cubic-bezier(0.22,1,0.36,1)"
            >
              {props.data.heading}
            </h2>
            <p
              data-reveal
              class="mt-4 text-lg leading-relaxed text-[var(--muted)] text-pretty"
              style="opacity:0;transform:translateY(24px);transition:all 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s"
            >
              {props.data.description}
            </p>
          </div>

          <div class="space-y-8">
            <div
              data-reveal
              style="opacity:0;transform:translateY(24px);transition:all 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s"
            >
              <p class="text-sm font-mono uppercase tracking-widest text-[var(--accent)] mb-2">
                Email
              </p>
              <a
                href={`mailto:${props.data.email}`}
                class="text-[var(--fg)] hover:text-[var(--accent)] transition-colors text-lg"
              >
                {props.data.email}
              </a>
            </div>

            <div
              data-reveal
              style="opacity:0;transform:translateY(24px);transition:all 0.7s cubic-bezier(0.22,1,0.36,1) 0.3s"
            >
              <p class="text-sm font-mono uppercase tracking-widest text-[var(--accent)] mb-4">
                Socials
              </p>
              <div class="flex gap-4">
                <For each={props.data.socials}>
                  {(social) => (
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.platform}
                      class="flex h-12 w-12 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--muted)] transition-all duration-300 hover:border-[var(--accent)]/40 hover:text-[var(--accent)] hover:bg-[var(--accent)]/5"
                    >
                      <svg
                        class="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d={iconPaths[social.platform] || ""} />
                      </svg>
                    </a>
                  )}
                </For>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
