import type { Metadata } from "next";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import Features from "@/components/landing/Features";
import CommunityPanel from "@/components/landing/CommunityPanel";
import Jobs from "@/components/landing/Jobs";
import RecruiterBanner from "@/components/landing/RecruiterBanner";
import Events from "@/components/landing/Events";
import Testimonials from "@/components/landing/Testimonials";
import Companies from "@/components/landing/Companies";
import Faq from "@/components/landing/Faq";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Galera do TI — Conectando mentes. Criando oportunidades.",
  description:
    "A maior comunidade de tecnologia para aprender, compartilhar e crescer juntos.",
};

export default function HomePage() {
  return (
    <div className="flex-1">
      <Header />
      <main className="px-0">
        <Hero />
        <Stats />
        <Features />
        <CommunityPanel />
        <Jobs />
        <RecruiterBanner />
        <Events />
        <Testimonials />
        <Companies />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
