import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Team from "@/components/Team";
import Join from "@/components/Join";

export default function Home() {
  return (
    <div className="flex flex-col scroll-smooth">
      <Hero />
      <About />
      <Projects />
      <Team />
      <Join />
    </div>
  );
}