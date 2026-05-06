import CustomBuffet from "./components/home/CustomOrders";

import HeroSection from "./components/home/Hero";

import Offers from "./components/home/Offers";
import TopSellers from "./components/home/TopSellers";
import AboutSection from './components/home/About';
import MenuCard from "./components/home/Menu";

import ReviewSection from "./components/home/Reviews";
import NewsletterSection from './components/home/Newsletter';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection/>
      <TopSellers />
       <MenuCard />
      <Offers />
      <CustomBuffet />
  
      <ReviewSection />
       <NewsletterSection />
    </main>
  );
}