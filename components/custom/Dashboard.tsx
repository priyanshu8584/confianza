"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick"// Import react-slick for the slider

// Import Slick Carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaLinkedin } from "react-icons/fa";

const Dashboard = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
  
  <div className="bg-gradient-to-r from-orange-50 to-orange-100 font-title">
      <div className="pt-10 flex flex-col md:flex-row items-center justify-between min-h-screen px-6 md:px-16 bg-gradient-to-r from-orange-50 to-orange-100 font-title">
    <br />
    <br />  
      {/* Left Section: Animated Text */}
      <motion.div
        className="max-w-2xl"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      >
        <h1 className="text-2xl md:text-4xl font-extrabold leading-tight mb-6">
          Welcome to <span className="text-orange-600">Confianza!</span>
        </h1>
        
        <p className="text-lg md:text-2xl font-medium text-gray-800 tracking-wide">
          Developed in-house, this app is designed to meet all the essential needs of <span className="text-orange-600">PNB</span> employees, providing seamless access to food and related services.  
          From placing special orders to exploring the ever-changing daily menu from the comfort of your desk, we aim to simplify your experience.  
          Enjoy quality, efficiency, and convenience—all in one place.  
          <span className="text-orange-600 font-semibold">Proudly serving excellence for over 10 years!</span>
        </p>

        {/* Animated Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8"
          viewport={{ once: true }}
        >
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 text-lg shadow-lg transition-all">
            <Link href="/menu"> View Menu 🍽️</Link>
          </Button>
        </motion.div>
      </motion.div>

     
      <motion.div
        className="mt-10 md:mt-0 w-full max-w-xl "
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      >
        <Slider {...sliderSettings}>
          
          <div className="">
            <Image
              src="/canteen1.jpg" 
              alt="Eatery Image 1"
              width={500}
              height={600}
              className="rounded-lg"
            />
          </div>
          <div>
            <Image
              src="/cante.jpg"
              alt="Eatery Image 2"
              width={500}
              height={600}
              className="rounded-lg"
            />
          </div>
       
        </Slider>
      </motion.div>
      

    </div>
   <div className="flex items-center justify-center">
   <footer className="text-gray-800 py-6 mt-10">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
    <div className="text-center md:text-left">
      <h1 className="text-lg font-semibold flex items-center justify-center md:justify-start space-x-2">
        <span>Developed by</span>
        <Link
          href="https://www.linkedin.com/in/priyanshu-singh-8a7652258/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-gray-800 hover:text-orange-300 flex items-center space-x-1"
        >
          <FaLinkedin className="text-blue-700" />
          <span>Priyanshu Singh</span>
        </Link>
      </h1>
    </div>
  </div>
</footer>
   </div>

  </div>
  );
};

export default Dashboard;
