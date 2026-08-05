import React from 'react'
import Hero from '../Components/Hero'
import CategorySection from '../Components/CategorySection'
import SuccessSection from '../Components/SuccessSection'
import WhyChooseUs from '../Components/WhyChooseUs'
import TrainerSection from '../Components/TrainerSection'
import BlogSection from '../Components/BlogSection'
import ContactSection from '../Components/ContactSection'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'





const Home = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <CategorySection />
    <SuccessSection />
    <WhyChooseUs />
    <TrainerSection />
    <BlogSection />
    <ContactSection />
    <Footer/>
    
    </>
  )
}

export default Home