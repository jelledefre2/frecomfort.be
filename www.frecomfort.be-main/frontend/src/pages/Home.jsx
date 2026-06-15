import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import Services from "@/components/site/Services";
import About from "@/components/site/About";
import TaHoma from "@/components/site/TaHoma";
import Process from "@/components/site/Process";
import Gallery from "@/components/site/Gallery";
import Testimonials from "@/components/site/Testimonials";
import ContactForm from "@/components/site/ContactForm";
import Footer from "@/components/site/Footer";

export default function Home() {
  return (
    <main data-testid="home-page" className="bg-[#0A0B0E] text-white min-h-screen">
      <Header />
      <Hero />
      <Services />
      <About />
      <TaHoma />
      <Process />
      <Gallery />
      <Testimonials />
      <ContactForm />
      <Footer />
    </main>
  );
}
