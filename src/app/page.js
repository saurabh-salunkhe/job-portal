// pages/index.js or app/page.js
import React from 'react';
import Header from '../components/home/Header';
import HeroSection from '../components/home/HeroSection';
import StatsSection from '../components/home/StatsSection';
import FeaturedJobs from '../components/home/FeaturedJobs';
import TopCompanies from '../components/home/TopCompanies';
import BrowseOrPost from '../components/home/BrowseOrPost';
import Footer from '../components/home/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className='pt-16'>
        <HeroSection />
        <StatsSection />
        <FeaturedJobs />
        <TopCompanies />
        <BrowseOrPost/>
        <Footer />
      </main>
    </div>
  );
}