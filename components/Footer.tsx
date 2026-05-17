"use client";

import React from "react";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-16 border-t border-gray-800">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-orange-400" />
            <span className="text-xl font-bold text-white tracking-tight">Nano Banana</span>
          </div>
          <p className="text-sm">
            The future of freshness. 100% natural, premium scrollytelling juice experience.
          </p>
        </div>

        {/* Shop Links */}
        <div className="flex flex-col gap-3">
          <h4 className="text-white font-semibold mb-2">Shop</h4>
          <a href="#" className="hover:text-white transition-colors">Cream Mango</a>
          <a href="#" className="hover:text-white transition-colors">Dutch Chocolate</a>
          <a href="#" className="hover:text-white transition-colors">Ruby Pomegranate</a>
          <a href="#" className="hover:text-white transition-colors">All Products</a>
        </div>

        {/* Support */}
        <div className="flex flex-col gap-3">
          <h4 className="text-white font-semibold mb-2">Support</h4>
          <a href="#" className="hover:text-white transition-colors">FAQ</a>
          <a href="#" className="hover:text-white transition-colors">Shipping & Returns</a>
          <a href="#" className="hover:text-white transition-colors">Contact Us</a>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-semibold mb-2">Join the Club</h4>
          <p className="text-sm">Get 10% off your first order and stay updated.</p>
          <div className="flex bg-gray-800 rounded-full overflow-hidden p-1 border border-gray-700 focus-within:border-orange-400 transition-colors">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-transparent border-none outline-none text-white px-4 py-2 w-full text-sm"
            />
            <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-orange-400 hover:text-white transition-colors">
              Subscribe
            </button>
          </div>
        </div>

      </div>
      
      <div className="container mx-auto px-6 mt-12 pt-8 border-t border-gray-800 text-center text-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} Nano Banana. All rights reserved.</p>
        <p className="flex items-center gap-1">Made with <span className="text-red-500">♥</span> for fresh lovers</p>
      </div>
    </footer>
  );
}
