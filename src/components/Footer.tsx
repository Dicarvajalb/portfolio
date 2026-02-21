import content from "../content/portfolio.json";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer class="border-t border-[var(--border)] py-8 px-6">
      <div class="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 md:flex-row">
        <p class="text-sm text-[var(--muted)]">
          {`\u00A9 ${year} ${content.hero.name}. All rights reserved.`}
        </p>
        <p class="font-mono text-xs text-[var(--muted)]/60">
          Built with SolidJS + Three.js
        </p>
      </div>
    </footer>
  );
}
