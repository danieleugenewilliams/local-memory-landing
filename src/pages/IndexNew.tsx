import HeaderNew from "@/components/v2/HeaderNew";
import HeroNew from "@/components/v2/HeroNew";
import DemoNew from "@/components/v2/DemoNew";
import ValuePropNew from "@/components/v2/ValuePropNew";
import TestimonialsNew from "@/components/v2/TestimonialsNew";
import CTANew from "@/components/v2/CTANew";
import FooterNew from "@/components/v2/FooterNew";
import ScrollToTop from "@/components/ScrollToTop";

const IndexNew = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeaderNew />
      <main>
        <HeroNew />
        <DemoNew />
        <ValuePropNew />
        <TestimonialsNew />
        <CTANew />
      </main>
      <FooterNew />
      <ScrollToTop />
    </div>
  );
};

export default IndexNew;
