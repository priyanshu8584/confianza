"use client";
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { Cross, Pencil } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { useUser } from '@clerk/nextjs';
import Spinner from './Spinner';
import { Id } from '@/convex/_generated/dataModel';
import { motion, AnimatePresence } from 'framer-motion';

const Menu = () => {
  const { user } = useUser();
  const isAdmin = user?.emailAddresses[0].emailAddress === 'singh.priyanshu.1024@gmail.com';
  
  const latestImage = useQuery(api.storage.latestMenu);
  const imageUrl = useQuery(
    api.storage.getUrl, 
    latestImage ? { storageId: latestImage.storageId as Id<"_storage"> } : "skip"
  );
  
  const date = new Date(Date.now());
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const currentDate = `${year}-${month}-${day}`;

  const menuItems = useQuery(api.menu.getMenuByDate, { date: currentDate }) || [];
  const [expandImage, setExpandImage] = useState(false);

  function handleImageExpansion() {
    setExpandImage((e) => !e);
  }

  if (!menuItems) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="font-body min-h-screen bg-gradient-to-r from-orange-50 to-orange-100 text-gray-800 px-4 sm:px-8 flex flex-col lg:flex-row">
      {/* Menu Section */}
      <motion.div className="w-full lg:w-3/4 p-6" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <div className="flex justify-between items-center py-6">
          <h2 className="font-bold text-3xl text-orange-700">Today's Menu 🍽️</h2>
          {isAdmin && (
            <Link href="/edit-menu">
              <Button className="bg-gray-500 text-white flex items-center space-x-2">
                <Pencil className="w-4 h-4" /> <span>Edit Menu</span>
              </Button>
            </Link>
          )}
        </div>

        <div className="max-w-4xl mx-auto">
          {menuItems.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white backdrop-blur-md bg-opacity-70 rounded-lg shadow-md">
                <thead>
                  <tr className="bg-orange-500 text-white">
                    <th className="py-3 px-6 text-left">Item</th>
                    <th className="py-3 px-6 text-left">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {menuItems.map((menu, index) => (
                    <tr key={index} className={`transition-all duration-300 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'} hover:bg-orange-100`}>
                      <td className="py-3 px-6">{menu.item}</td>
                      <td className="py-3 px-6 font-semibold text-orange-700">₹{menu.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-600 py-6">
              <Spinner />
              <h2 className="text-2xl font-bold text-orange-800">We are figuring it out! Please wait...</h2>
            </div>
          )}
        </div>
      </motion.div>

      {/* Image Section */}
      <motion.div className="w-full lg:w-1/3 p-6 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
        {imageUrl ? (
          <>
            <motion.img src={imageUrl} alt="Menu Image" className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105" onClick={handleImageExpansion} />
            <AnimatePresence>
              {expandImage && (
                <motion.div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <motion.div className="relative" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
                    <img src={imageUrl} alt="Expanded Menu" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
                    <button onClick={handleImageExpansion} className="absolute top-4 right-4 bg-black bg-opacity-50 p-2 rounded-full">
                      <Cross className="text-white w-6 h-6" />
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <h2 className="text-3xl font-bold text-orange-600">Image Not Available</h2>
        )}
      </motion.div>
    </div>
  );
};

export default Menu;
