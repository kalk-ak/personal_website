import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Tools from "@/components/Tools";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Courses from "@/components/Courses";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex flex-col">
        <Hero />
        <About />
        <Skills />
        <Tools />
        <Experience />
        <Projects />
        <Courses />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
