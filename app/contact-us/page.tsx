'use client';

import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";

const ContactPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 px-6 py-10">
      <Card className="w-full max-w-5xl bg-white shadow-2xl rounded-3xl p-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">📞 Get in Touch</h2>
        <p className="text-gray-600 text-center mb-8 text-lg">
          Have questions or feedback? Reach out to us, and we’ll be happy to assist you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">📍 Contact Details</h3>
            <p className="flex items-center gap-3 text-gray-700">
              <Phone className="text-orange-600" size={20} /> 
              <span className="hover:text-orange-600 transition">+91 9088833789 / 9831000880</span>
            </p>
            <p className="flex items-center gap-3 text-gray-700">
              <Mail className="text-orange-600" size={20} /> 
              <span className="hover:text-orange-600 transition">sampam22@gmail.com</span>
            </p>
            <p className="flex items-center gap-3 text-gray-700">
              <MapPin className="text-orange-600" size={20} /> 
              <span className="hover:text-orange-600 transition">
                United Tower, 11 Hemanta Basu Sarani, Dalhousie, Kolkata-700001
              </span>
            </p>
            <p className="text-gray-700 mt-4"><strong>👨‍💼 Proprietor:</strong> Sanjiv Singh</p>
          </div>

          {/* Map Section */}
          <div className="flex justify-center items-center">
            <iframe
              className="w-full h-64 md:h-80 rounded-xl shadow-md"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.8521541352933!2d88.3529638751241!3d22.567758234560104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277f48e416d69%3A0x2bdf8c00a8a04ae9!2sUnited%20Tower!5e0!3m2!1sen!2sin!4v1704125123456!5m2!1sen!2sin"
              
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-center text-gray-500 text-sm mt-6">
          We have been <span className="text-orange-600 font-semibold">proudly serving excellence for over 10 years</span>. 
          Your satisfaction is our priority!
        </p>
      </Card>
    </div>
  );
};

export default ContactPage;
