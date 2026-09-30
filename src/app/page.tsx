import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import Lab from "@/components/Lab";
import Terminal from "@/components/Terminal";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Projects />
      <TechStack />
      <Lab />
      <Terminal />
      <Experience />

      {/* Currently Learning / Exploring ticker */}
      <section className="py-8 bg-white text-black overflow-hidden flex whitespace-nowrap">
        <div className="flex animate-marquee text-xl font-bold uppercase tracking-widest">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="mx-8 text-black">CURRENTLY EXPLORING →</span>
              <span className="mx-8 text-black/50">AI AGENTS</span>
              <span className="mx-8 text-black/50">LANGCHAIN</span>
              <span className="mx-8 text-black/50">MCP</span>
              <span className="mx-8 text-black/50">RAG</span>
              <span className="mx-8 text-black/50">SYSTEM DESIGN</span>
              <span className="mx-8 text-black/50">NEXT.JS</span>
              <span className="mx-8 text-black/50">CLOUD</span>
            </div>
          ))}
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}
