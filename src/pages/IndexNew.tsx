import HeaderNew from "@/components/v2/HeaderNew";
import HeroNew from "@/components/v2/HeroNew";
import SuccessSection from "@/components/v2/SuccessSection";
import DemoNew from "@/components/v2/DemoNew";
import ProblemAgitate from "@/components/v2/ProblemAgitate";
import ValueStack from "@/components/v2/ValueStack";
import TestimonialsNew from "@/components/v2/TestimonialsNew";
import TransformationTimeline from "@/components/v2/TransformationTimeline";
import CTANew from "@/components/v2/CTANew";
import FooterNew from "@/components/v2/FooterNew";
import ScrollToTop from "@/components/ScrollToTop";

const IndexNew = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeaderNew />
      <main>
        <HeroNew />
        <SuccessSection />
        <DemoNew />
        <ProblemAgitate />
        <ValueStack />
        <TestimonialsNew />
        <TransformationTimeline />
        <CTANew />
      </main>
      <FooterNew />
      <ScrollToTop />
    </div>
  );
};

export default IndexNew;
