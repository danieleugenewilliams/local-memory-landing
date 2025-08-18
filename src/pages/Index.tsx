import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemSolution from "@/components/ProblemSolution";
import Demo from "@/components/Demo";
import WhyLocalMemory from "@/components/WhyLocalMemory";
import TrustedByDevelopers from "@/components/TrustedByDevelopers";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ProblemSolution />
      <Demo />
      <WhyLocalMemory />
      <TrustedByDevelopers />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;
