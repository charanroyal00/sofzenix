import Hero from '../components/Hero';
import PartnersSection from '../components/PartnersSection';
import ServicesSection from '../components/ServicesSection';
import WhyChooseUs from '../components/WhyChooseUs';
import TechStack from '../components/TechStack';
import PortfolioPreview from '../components/PortfolioPreview';
import MeetFounder from '../components/MeetFounder';
import Testimonials from '../components/Testimonials';
import SocialFeedsSection from '../components/SocialFeedsSection';
import FAQ from '../components/FAQ';
import Newsletter from '../components/Newsletter';
import CTASection from '../components/CTASection';

const Home = () => {
  return (
    <>
      <Hero />
      <PartnersSection />
      <ServicesSection />
      <WhyChooseUs />
      <TechStack />
      <PortfolioPreview />
      <MeetFounder />
      <Testimonials />
      <SocialFeedsSection />
      <FAQ />
      <Newsletter />
      <CTASection />
    </>
  );
};

export default Home;
