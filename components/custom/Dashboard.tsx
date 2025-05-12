"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick"; // Import react-slick for the slider

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
    <div className="bg-gray-100 text-red-400">
      <div className="pt-10 ml-0 left-0 flex flex-col md:flex-row md:gap-x-12 gap-y-8 items-center justify-center min-h-screen px-6 bg-gray-100 text-red-400 font-title">
        <br />
        <br />
        {/* Left Section: Animated Text */}
        <motion.div
          className="max-w-4xl text-left"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          <h1 className="text-2xl md:text-5xl lg:text-8xl font-extrabold text-gray-900 mb-6 max-w-4xl text-center md:text-left">
            Welcome to <span className="text-red-500">The Urban Palate!</span>
          </h1>

          <p className="text-lg md:text-2xl font-bold text-gray-800 tracking-wide text-center md:text-left">
            At <span className="text-red-500">The Urban Palate</span>, we aim to provide
            employees with the highest quality food services that are efficient,
            convenient, and delightful. From daily changing menus to special orders
            on specific days, you’ll find everything you need right at your desk.{" "}
            <span className="text-red-500 font-semibold">
              Proudly serving excellence for over 10 years!
            </span>
          </p>

          {/* Animated Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 flex justify-center md:justify-start"
            viewport={{ once: true }}
          >
            <Button className="bg-red-500 hover:bg-red-700 text-white px-6 py-3 md:min-w-60 md:min-h-20 text-2xl shadow-lg transition-all rounded-xl sm:rounded-md">
              <Link href="/menu"> View Menu 🍽️</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Slider */}
        <motion.div
          className="mt-10 md:mt-0 w-full max-w-xl"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          <Slider {...sliderSettings}>
            <div className="flex justify-center">
              <Image
                src="/canteen1.jpg"
                alt="Eatery Image 1"
                width={500}
                height={600}
                className="rounded-lg"
              />
            </div>
            <div className="flex justify-center">
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
   <div className="m-10 flex justify-center items-center">
   <h2 className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-center mb-8 text-red-500">
          What We Offer
        </h2>
   </div>
      {/* What We Offer Section */}
      <div className="flex flex-col justify-center items-center py-16 bg-gray-100 text-gray-800">
       
        <h3 className="text-3xl md:text-5xl font-extrabold text-center mb-8 text-red-500">
          Menu
        </h3>

        <p className="text-lg md:text-2xl text-center font-semibold mb-8 tracking-wide px-6">
          Keep a check on daily changing menus and place orders on special days.
          We offer a variety of options for every occasion.
        </p>

        {/* Screenshot/Visual Section */}
        <div className="flex flex-col md:flex-row justify-center items-center lg:mb-10">
          <div className="max-w-xs md:max-w-md lg:max-w-lg">
            <Image
              src="/menu1.png" // Replace with actual screenshot of menu
              alt="Menu Screenshot"
              width={400}
              height={600}
              className="rounded-lg shadow-lg"
            />
          </div>
          
        </div>
      </div>

      {/* Place Your Orders Section */}
      <div className="flex flex-col justify-center items-center py-16 bg-gray-100 text-gray-800">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-center mb-8 text-red-500">
          Place Your Orders
        </h2>
        <p className="text-lg md:text-2xl text-center font-semibold mb-8 tracking-wide px-6">
          Place your order from the daily menu or enjoy special orders on designated days. 
          Experience hassle-free ordering with just a few clicks.
        </p>

        {/* Screenshot of the order placement interface */}
        <div className="flex justify-center mb-8">
          <Image
            src="/orders.png" // Replace with your actual screenshot of the order placement interface
            alt="Order Placement Screenshot"
            width={300}
            height={200}
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="flex justify-center">
          <Button className="bg-red-500 hover:bg-red-700 text-white px-6 py-3 md:min-w-60 md:min-h-20 text-xl shadow-lg transition-all rounded-xl sm:rounded-md">
            <Link href="/order"> Place an Order 🍔</Link>
          </Button>
        </div>
      </div>

    

<div className="flex flex-col justify-center items-center py-16 bg-gray-100 text-gray-800">
  <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-center mb-8 text-red-500">
    We Value Your Feedback
  </h2>
  <p className="text-lg md:text-2xl text-center font-semibold mb-8 tracking-wide px-6">
    Your feedback helps us improve our services and provide a better experience. Share your thoughts and suggestions with us today!
  </p>

  {/* Feedback Form or Image */}
  <div className="flex justify-center mb-8">
   
  </div>

  <div className="flex justify-center">
    <Button className="bg-red-500 hover:bg-red-700 text-white px-6 py-3 md:min-w-60 md:min-h-20 text-xl shadow-lg transition-all rounded-xl sm:rounded-md">
      <Link href="/feedback"> Provide Feedback 📝</Link>
    </Button>
  </div>
</div>
      {/* Footer Section */}
      <div className="flex items-center justify-center py-6">
        <footer className="text-gray-800">
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
