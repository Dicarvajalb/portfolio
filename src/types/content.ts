export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface HeroContent {
  name: string;
  title: string;
  description: string;
  cta: {
    label: string;
    url: string;
  };
}

export interface AboutContent {
  heading: string;
  paragraphs: string[];
  highlights: {
    label: string;
    value: string;
  }[];
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  url: string;
  year: string;
}

export interface Skill {
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

export interface ContactContent {
  heading: string;
  description: string;
  email: string;
  socials: SocialLink[];
}

export interface PortfolioContent {
  hero: HeroContent;
  about: AboutContent;
  projects: Project[];
  skills: Skill[];
  experience: ExperienceItem[];
  contact: ContactContent;
}
