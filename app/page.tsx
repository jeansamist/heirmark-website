import Collection from "@/components/home/Collection";
import Events from "@/components/home/Events";
import FinalCta from "@/components/home/FinalCta";
import Footer from "@/components/home/Footer";
import Founder from "@/components/home/Founder";
import Framework from "@/components/home/Framework";
import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Hero />
      <Framework />
      <Collection />
      <Events />
      <Founder />
      <FinalCta />
      <Footer />
    </main>
  );
}
