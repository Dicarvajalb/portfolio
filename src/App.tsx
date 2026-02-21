import type { PortfolioContent } from "./types/content";
import content from "./content/portfolio.json";
import ParticleBackground from "./components/ParticleBackground";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const data = content as PortfolioContent;

export default function App() {
  return (
    <>
      <ParticleBackground />
      <Nav />
      <main>
        <Hero data={data.hero} />
        <About data={data.about} />
        <Experience data={data.experience} />
        <Projects data={data.projects} />
        <Skills data={data.skills} />
        <Contact data={data.contact} />
      </main>
      <Footer />
    </>
  );
}
