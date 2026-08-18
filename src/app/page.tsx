import { ContactCTA } from "@/components/ContactCTA";
import { Equipe } from "@/components/Equipe";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PlateBlurProvider } from "@/components/PlateBlur";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export default function HomePage() {
  return (
    <PlateBlurProvider>
      <Header />
      <main>
        <Hero />
        <Services />
        <Testimonials />
        <Equipe />
        <Faq />
        <ContactCTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </PlateBlurProvider>
  );
}
