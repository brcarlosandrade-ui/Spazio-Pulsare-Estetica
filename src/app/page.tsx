import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/hero/Hero";
import Pillars from "@/components/sections/Pillars";
import About from "@/components/sections/About";
import Procedures from "@/components/sections/Procedures";
import Differentiators from "@/components/sections/Differentiators";
import Leadership from "@/components/sections/Leadership";
import Testimonials from "@/components/sections/Testimonials";
import Location from "@/components/sections/Location";
import CtaSection from "@/components/sections/CtaSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Pillars />
        <About />
        <Procedures />
        <Differentiators />
        <Leadership />
        <Testimonials />
        <Location />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
