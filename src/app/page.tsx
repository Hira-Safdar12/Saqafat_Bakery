import HeroSection from "./components/home/Hero";
import AboutSection from './components/home/About';
import MenuCard from "./components/home/Menu";
import ReviewSection from "./components/home/Reviews";


export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection/>
      <MenuCard />
      <ReviewSection />
      
    </main>
  );
}