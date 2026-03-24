export type Locale = "en" | "es";

export interface NavItem {
  id: string;
  label: string;
}

export interface MetaContent {
  title: string;
  description: string;
}

export interface HeroContent {
  eyebrow: string;
  name: string;
  title: string;
  description: string;
  primaryCta: {
    label: string;
    url: string;
  };
  secondaryCta: {
    label: string;
    url: string;
  };
}

export interface AboutHighlight {
  label: string;
  value: string;
}

export interface AboutContent {
  heading: string;
  intro: string;
  paragraphs: string[];
  highlights: AboutHighlight[];
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  title: string;
  year: string;
  description: string;
  tags: string[];
  links: ProjectLink[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  description: string;
  tags: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface ContactContent {
  sectionLabel: string;
  heading: string;
  description: string;
  emailLabel: string;
  socialsLabel: string;
  email: string;
  availability: string;
  socials: SocialLink[];
}

export interface FooterContent {
  rights: string;
  builtWith: string;
}

export interface PortfolioLocaleContent {
  meta: MetaContent;
  nav: NavItem[];
  hero: HeroContent;
  about: AboutContent;
  experienceHeading: string;
  experience: ExperienceItem[];
  projectsHeading: string;
  projects: Project[];
  skillsHeading: string;
  skills: SkillGroup[];
  contact: ContactContent;
  footer: FooterContent;
}

export interface PortfolioContent {
  defaultLocale: Locale;
  localeLabels: Record<Locale, string>;
  locales: Record<Locale, PortfolioLocaleContent>;
}
