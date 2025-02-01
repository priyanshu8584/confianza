'use client';
import { api } from '@/convex/_generated/api';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaHome, FaConciergeBell, FaClipboardList, FaPhoneAlt, FaBars, FaTimes } from 'react-icons/fa';

const Appbar = () => {
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  const name = user?.firstName;
  const userId = user?.id;
  const isAdmin = email === 'singh.priyanshu.1024@gmail.com';
  const creatingUser = useMutation(api.users.createUser);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility
  
  useEffect(() => {
    if (userId && email && name) {
      creatingUser({ userId, name, email, isAdmin });
    }
  }, [userId, name, email]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className="relative">
      {/* Sidebar for small devices */}
      <div
        className={`fixed top-0 left-0 w-3/4 h-full bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-400 shadow-lg z-40 transform transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`}
      >
        <div className="flex justify-between items-center p-4">
          <button onClick={toggleSidebar} className="text-white text-2xl ml-auto">
            <FaTimes />
          </button>
        </div>
        <div className="space-y-8 px-4 py-6">
          <Link href="/" className="text-white hover:text-yellow-200 flex items-center gap-2" onClick={toggleSidebar}>
            <FaHome /> Home
          </Link>
          <Link href="/menu" className="text-white hover:text-yellow-200 flex items-center gap-2" onClick={toggleSidebar}>
            <FaConciergeBell /> Menu
          </Link>
          <Link href="/orders" className="text-white hover:text-yellow-200 flex items-center gap-2" onClick={toggleSidebar}>
            <FaClipboardList /> Orders
          </Link>
          <Link href="/contact-us" className="text-white hover:text-yellow-200 flex items-center gap-2" >
            <FaPhoneAlt /> Contact Us
          </Link>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <button className="bg-white text-gray-800 px-6 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition transform hover:scale-105 shadow-lg border-2 border-gray-300">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>

      
      <div className="w-full bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-400 shadow-lg sticky top-0 z-10 md:flex justify-between items-center p-4 hidden">
        {/* Left section: Navigation links */}
        <div className="flex space-x-8 text-white font-medium">
          <Link href="/" className="hover:text-yellow-200 transition flex items-center gap-2">
            <FaHome /> Home
          </Link>
          <Link href="/menu" className="hover:text-yellow-200 transition flex items-center gap-2">
            <FaConciergeBell /> Menu
          </Link>
          <Link href="/orders" className="hover:text-yellow-200 transition flex items-center gap-2">
            <FaClipboardList /> Orders
          </Link>
          <Link href="/contact-us" className="hover:text-yellow-200 transition flex items-center gap-2">
            <FaPhoneAlt /> Contact Us
          </Link>
        </div>

        {/* Right section: User sign-in and user button */}
        <div className="flex items-center space-x-4">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <button className="bg-white text-gray-800 px-6 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition transform hover:scale-105 shadow-lg border-2 border-gray-300">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>

      {/* Mobile Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden p-4 fixed top-4 left-4 z-50 bg-primary text-white rounded-full"
      >
        <FaBars size={20} />
      </button>
    </div>
  );
};

export default Appbar;
