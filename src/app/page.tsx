import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import Procedures from "@/components/sections/Procedures";
import Differentiators from "@/components/sections/Differentiators";
import Testimonials from "@/components/sections/Testimonials";
import CtaSection from "@/components/sections/CtaSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Procedures />
        <Differentiators />
        <Testimonials />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
