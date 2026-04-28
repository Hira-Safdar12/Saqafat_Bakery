import CustomBuffet from "./components/home/CustomOrders";
import HeroSection from "./components/home/Hero";
import NewArrivals from "./components/home/NewArrivals";
import Offers from "./components/home/Offers";
import TopSellers from "./components/home/TopSellers";
import AboutSection from './components/home/About';
import MenuCard from "./components/home/Menu";
import ReviewSection from "./components/home/Reviews";


export default function Home() {
  return (
    <main>
      <HeroSection />
      <TopSellers />
      <Offers />
      <CustomBuffet />
      <NewArrivals />
      {/* TopSellers, Offers, Specials, Arrivals will go here */}
      <AboutSection/>
      <MenuCard />
      <ReviewSection />
    </main>
  );
}