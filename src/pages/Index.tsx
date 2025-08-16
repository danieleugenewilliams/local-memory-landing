import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BeforeAfter from "@/components/BeforeAfter";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import Features from "@/components/Features";
import Demo from "@/components/Demo";
import CodeExample from "@/components/CodeExample";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <BeforeAfter />
      <ProblemSection />
      <SolutionSection />
      <Features />
      <Demo />
      <CodeExample />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Index;
