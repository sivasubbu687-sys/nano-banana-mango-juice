"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle2, ShoppingBag, Truck } from "lucide-react";
import { products, Product } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductBottleScroll from "@/components/ProductBottleScroll";




function HeroSection({ product }: { product: Product }) {
  return (
    <div className="relative w-full h-screen">
      {/* We can hide the canvas logic inside a smaller component, but since I already wrote ProductBottleScroll with a 500vh div...
          I'll just re-write the Hero section to use the components properly. 
          Actually, ProductBottleScroll has h-[500vh] and uses useScroll internally. 
          I will just modify ProductBottleScroll directly to include ProductTextOverlays, 
          or pass scrollYProgress as a prop to ProductBottleScroll. 
          Let's just use the components as designed: ProductBottleScroll is self-contained. 
          But ProductTextOverlays needs the scrollYProgress. 
          Let me rewrite a combined version right here to be safe and flawless.
      */}
      <div className="absolute inset-0">
         <ProductBottleScroll product={product} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center text-center pointer-events-none p-6">
         {/* Static Hero Title overlaid on video */}
         <div className="max-w-4xl text-white drop-shadow-2xl">
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-6xl md:text-8xl font-bold mb-4"
            >
              {product.section1.title}
            </motion.h1>
            <motion.p 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-3xl md:text-5xl font-light opacity-90"
            >
              {product.section1.subtitle}
            </motion.p>
         </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const product = products[currentIndex];

  useEffect(() => {
    window.scrollTo(0, 0);
    // Update global CSS variable for background
    document.documentElement.style.setProperty('--product-gradient', product.gradient);
  }, [currentIndex, product]);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % products.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);

  return (
    <div className="min-h-screen selection:bg-orange-500 selection:text-white">
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.main
          key={product.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full"
        >
          {/* Scroll Experience */}
          <HeroSection product={product} />

          {/* Story Sections */}
          <section className="py-24 px-6 container mx-auto space-y-32 text-center text-white">
             <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-5xl md:text-7xl font-bold mb-4">{product.section2.title}</h2>
                <p className="text-2xl md:text-4xl font-light opacity-80">{product.section2.subtitle}</p>
             </motion.div>
             <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-5xl md:text-7xl font-bold mb-4">{product.section3.title}</h2>
                <p className="text-2xl md:text-4xl font-light opacity-80">{product.section3.subtitle}</p>
             </motion.div>
             <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-6xl md:text-8xl font-bold mb-4">{product.section4.title}</h2>
                {product.section4.subtitle && (
                  <p className="text-3xl md:text-5xl font-light opacity-80">{product.section4.subtitle}</p>
                )}
             </motion.div>
          </section>

          {/* Product Details Section */}
          <motion.section 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="py-32 px-6 container mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h3 className="text-4xl md:text-6xl font-bold">{product.detailsSection.title}</h3>
                <p className="text-xl leading-relaxed opacity-90">{product.detailsSection.description}</p>
                <div className="flex gap-4 flex-wrap">
                  {product.features.map((feature, i) => (
                    <span key={i} className="px-4 py-2 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-sm font-medium">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-black/10 backdrop-blur-3xl rounded-[3rem] p-12 border border-white/10 aspect-square flex flex-col justify-center gap-8 shadow-2xl">
                {product.stats.map((stat, i) => (
                  <div key={i} className="flex justify-between items-end border-b border-white/20 pb-4">
                    <span className="text-2xl opacity-80">{stat.label}</span>
                    <span className="text-5xl font-bold">{stat.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Freshness Section */}
          <motion.section
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="py-24 px-6 bg-black/20 backdrop-blur-xl border-y border-white/10"
          >
            <div className="container mx-auto text-center max-w-4xl space-y-8">
              <h3 className="text-4xl md:text-5xl font-bold">{product.freshnessSection.title}</h3>
              <p className="text-xl leading-relaxed opacity-90">{product.freshnessSection.description}</p>
            </div>
          </motion.section>

          {/* Buy Now Section */}
          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="py-32 px-6 container mx-auto flex justify-center"
          >
            <div className="max-w-2xl w-full bg-white text-black rounded-[3rem] p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10 space-y-12">
                <div className="text-center space-y-4">
                  <h2 className="text-5xl font-bold">{product.name}</h2>
                  <p className="text-xl text-gray-600">{product.subName}</p>
                </div>
                
                <div className="flex justify-center items-end gap-2">
                  <span className="text-7xl font-bold tracking-tighter">{product.buyNowSection.price}</span>
                  <span className="text-gray-500 mb-2">{product.buyNowSection.unit}</span>
                </div>

                <div className="space-y-4 text-gray-700">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                    <span>{product.buyNowSection.processingParams.join(" • ")}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="w-6 h-6 text-blue-500" />
                    <span>{product.buyNowSection.deliveryPromise}</span>
                  </div>
                </div>

                <button 
                  className="w-full py-6 rounded-full text-2xl font-bold text-white shadow-xl hover:scale-105 transition-transform"
                  style={{ background: product.gradient }}
                >
                  <span className="flex items-center justify-center gap-3">
                    <ShoppingBag className="w-6 h-6" /> Add to Cart
                  </span>
                </button>
                
                <p className="text-center text-sm text-gray-400">{product.buyNowSection.returnPolicy}</p>
              </div>
            </div>
          </motion.section>

          {/* Next Flavor Slanted CTA */}
          <button 
            onClick={handleNext}
            className="w-full relative overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
            <div 
              className="py-32 px-6 flex flex-col items-center justify-center transform transition-transform duration-700 group-hover:scale-105 relative z-20 text-white"
              style={{ background: products[(currentIndex + 1) % products.length].gradient }}
            >
              <span className="text-2xl font-light mb-4 opacity-80">Next Flavor</span>
              <h2 className="text-6xl md:text-8xl font-bold tracking-tighter drop-shadow-xl">
                {products[(currentIndex + 1) % products.length].name}
              </h2>
            </div>
            {/* Slanted edge effect using an SVG overlay could go here, or simple CSS clip-path */}
            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black/20 to-transparent z-30" />
          </button>
        </motion.main>
      </AnimatePresence>

      {/* Fixed Navigation UI */}
      <div className="fixed top-1/2 left-4 md:left-8 -translate-y-1/2 z-40 hidden md:block">
        <button 
          onClick={handlePrev}
          className="p-4 rounded-full bg-black/20 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all shadow-lg hover:shadow-xl"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
      <div className="fixed top-1/2 right-4 md:right-8 -translate-y-1/2 z-40 hidden md:block">
        <button 
          onClick={handleNext}
          className="p-4 rounded-full bg-black/20 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all shadow-lg hover:shadow-xl"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <div className="flex bg-black/30 backdrop-blur-xl border border-white/10 rounded-full p-2 shadow-2xl">
          {products.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setCurrentIndex(idx)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                currentIndex === idx 
                  ? "bg-white text-black shadow-md" 
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
