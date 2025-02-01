'use client'
import React from 'react';
import { motion } from 'framer-motion';

const ConfirmationPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-500 to-red-500 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white text-orange-700 font-semibold text-lg p-6 rounded-xl shadow-lg text-center max-w-md"
      >
        <motion.h2
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl font-bold"
        >
          ✅ Order Confirmed!
        </motion.h2>
        <p className="mt-2 text-orange-800">
          Your order is sent! We will reach back to you in an hour.
        </p>
      </motion.div>
    </div>
  );
};

export default ConfirmationPage;
