import React, { useEffect } from 'react';
import Footer from './components/footer';
import './assets/styles.css';
import Header from './components/header';
import Lander from './components/lander';
import Starter from './components/starter';
import Bookkeeping from './components/bookkeeping';
import UserFavourites from './components/userFavourites';
import Pricing from './components/pricing';
import Testimonial from './components/testimonial';
import FaqSection from './components/faqSection';
import ClientSection from './components/clientSection';
import RiseaaMOBee from './components/riseaaMOBee';
import { useNavigate } from 'react-router-dom';

function Index() {
  const navigate = useNavigate();
  const authuser = JSON.parse(localStorage.getItem('authUser')) || null ; 
  useEffect(() => {
    const links = [
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
      "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css",
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css",
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/brands.min.css",
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/fontawesome.min.css",
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/regular.min.css",
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/solid.min.css",
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
    ];

    links.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      links.forEach(href => {
        const link = document.querySelector(`link[href="${href}"]`);
        if (link) document.head.removeChild(link);
      });

      if (script) document.body.removeChild(script);
    };
  }, []);

  useEffect( ()=>{
    if(authuser!==null){
      navigate('/dashboard');
    }
  },[])

  return (
    <div>
      <Header />
      <Lander />
      <Starter />
      <Bookkeeping />
      <UserFavourites />
      <Pricing />
      <Testimonial />
      <FaqSection/>
      <ClientSection/>  
      <RiseaaMOBee/>
      <Footer />
    </div>
  );
}

export default Index;
