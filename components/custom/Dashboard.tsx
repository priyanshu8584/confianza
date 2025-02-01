"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div className="pt-10 flex items-center justify-center min-h-screen px-6 md:px-10 bg-gradient-to-r from-orange-50 to-orange-100 font-title flex-col">
      
      {/* Left Section: Animated Text */}
      <motion.div
        className="max-w-2xl text-center md:text-left flex flex-col items-center md:items-start"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      >
        <h1 className="text-2xl md:text-4xl font-extrabold leading-tight mb-6">
          Welcome to <span className="text-orange-600">Confianza!</span>
        </h1>
        
        <p className="text-lg md:text-2xl font-medium text-gray-800 tracking-wide">
  Located on the <span className="text-orange-600 font-semibold">16th floor</span> of PNB, Confianza 16 is your go-to eatery for satisfying cravings and fueling your day. 
  Whether you&apos;re in the mood for a hearty meal or a quick snack, we&apos;ve got you covered with a menu designed to 
  <span className="text-orange-600 font-semibold"> delight every palate.</span>
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
    </div>
  );
};

export default Dashboard;
