import React, { useEffect } from 'react';
import Hero from '../components/home/Hero';
import PopularProducts from '../components/home/PopularProducts';
import Categories from '../components/home/Categories';
import WhyChooseUs from '../components/home/WhyChooseUs';
import HowItWorks from '../components/home/HowItWorks';
import Sustainability from '../components/home/Sustainability';
import Testimonials from '../components/home/Testimonials';
import LatestNews from '../components/home/LatestNews';
import Newsletter from '../components/home/Newsletter';

const HomePage = () => {
  useEffect(() => {
    // Faire défiler vers le haut de la page lors du chargement
    window.scrollTo(0, 0);
    
    // Mettre à jour le titre de la page
    document.title = 'AfriGro - Votre marché africain en ligne';
  }, []);

  return (
    <div>
      <Hero />
      <PopularProducts />
      <Categories />
      <WhyChooseUs />
      <HowItWorks />
      <Sustainability />
      <Testimonials />
      <LatestNews />
      <Newsletter />
    </div>
  );
};

export default HomePage;
