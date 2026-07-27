import React from 'react'
import Hero from '../Components/Hero'
import CategorySection from '../Components/CategorySection'
import SuccessSection from '../Components/SuccessSection'
import WhyChooseUs from '../Components/WhyChooseUs'
import TrainerSection from '../Components/TrainerSection'
import BlogSection from '../Components/BlogSection'
import ContactSection from '../Components/ContactSection'
import TransformationPage from './TransformationPage'





const Home = () => {
  return (
    <>
    <Hero/>
    <CategorySection />
    <SuccessSection />
    <WhyChooseUs />
    <TrainerSection />
    <TransformationPage/>
    <BlogSection />
    <ContactSection />
    </>
  )
}

export default Home