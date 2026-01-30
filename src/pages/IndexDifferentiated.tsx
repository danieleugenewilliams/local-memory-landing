import HeaderNew from "@/components/v2/HeaderNew";
import { 
  HeroDifferentiated, 
  Differentiators,
  FlatMemoryProblem 
} from "@/components/v2";
import SuccessSection from "@/components/v2/SuccessSection";
import DemoNew from "@/components/v2/DemoNew";
import ValueStack from "@/components/v2/ValueStack";
import TestimonialsNew from "@/components/v2/TestimonialsNew";
import CTANew from "@/components/v2/CTANew";
import FooterNew from "@/components/v2/FooterNew";
import ScrollToTop from "@/components/ScrollToTop";

const IndexDifferentiated = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeaderNew />
      <main>
        <HeroDifferentiated />
        <FlatMemoryProblem />
        <Differentiators />
        <DemoNew />
        <SuccessSection />
        <ValueStack />
        <TestimonialsNew />
        <CTANew />
      </main>
      <FooterNew />
      <ScrollToTop />
    </div>
  );
};

export default IndexDifferentiated;
