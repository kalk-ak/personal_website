import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Tools from "@/components/Tools";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Courses from "@/components/Courses";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Tools />
      <Courses />
      <Contact />
    </>
  );
}
