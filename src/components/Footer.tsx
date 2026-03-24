import type { FooterContent, Locale } from "../types/content";

interface Props {
  name: string;
  locale: Locale;
  footer: FooterContent;
}

export default function Footer(props: Props) {
  const year = new Date().getFullYear();

  return (
    <footer class="border-t border-[var(--border)] px-4 py-8 sm:px-6 lg:px-8">
      <div class="mx-auto flex max-w-6xl flex-col gap-3 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>{`\u00A9 ${year} ${props.name}. ${props.footer.rights}`}</p>
        <p lang={props.locale}>{props.footer.builtWith}</p>
      </div>
    </footer>
  );
}
