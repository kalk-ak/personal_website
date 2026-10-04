import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Tools from "@/components/Tools";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Courses from "@/components/Courses";
import Contact from "@/components/Contact";

export default function Home() {
  // Prerendered at build time, so the server HTML and the client's first
  // render agree. ExperienceChart moves to the live date after it mounts.
  const now = new Date();
  const buildMonth = now.getFullYear() * 12 + now.getMonth();

  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Experience buildMonth={buildMonth} />
      <Skills />
      <Tools />
      <Courses />
      <Contact />
    </>
  );
}
