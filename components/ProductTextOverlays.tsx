"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { Product } from "@/data/products";

interface Props {
  product: Product;
  scrollYProgress: MotionValue<number>;
}

export default function ProductTextOverlays({ product, scrollYProgress }: Props) {
  // Fade IN and OUT sections based on scroll progress of the h-[500vh] container.
  
  // Section 1: visible at 0 to 0.15, fades out by 0.2
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  
  // Section 2: fades in at 0.2, peaks at 0.35, fades out by 0.5
  const opacity2 = useTransform(scrollYProgress, [0.15, 0.25, 0.4, 0.5], [0, 1, 1, 0]);
  
  // Section 3: fades in at 0.45, peaks at 0.6, fades out by 0.75
  const opacity3 = useTransform(scrollYProgress, [0.4, 0.5, 0.65, 0.75], [0, 1, 1, 0]);
  
  // Section 4: fades in at 0.7, peaks at 0.85, stays visible until end
  const opacity4 = useTransform(scrollYProgress, [0.65, 0.75, 1], [0, 1, 1]);

  return (
    <div className="absolute inset-0 pointer-events-none w-full h-[500vh]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center p-8">
        
        {/* Section 1 */}
        <motion.div 
          style={{ opacity: opacity1 }}
          className="absolute text-center max-w-4xl"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-4 drop-shadow-2xl">
            {product.section1.title}
          </h1>
          <p className="text-3xl md:text-5xl font-light opacity-90 drop-shadow-lg">
            {product.section1.subtitle}
          </p>
        </motion.div>

        {/* Section 2 */}
        <motion.div 
          style={{ opacity: opacity2 }}
          className="absolute text-center max-w-4xl mt-32 md:mr-[30vw]"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-2xl">
            {product.section2.title}
          </h2>
          <p className="text-2xl md:text-4xl font-light opacity-90 drop-shadow-lg">
            {product.section2.subtitle}
          </p>
        </motion.div>

        {/* Section 3 */}
        <motion.div 
          style={{ opacity: opacity3 }}
          className="absolute text-center max-w-4xl mt-32 md:ml-[30vw]"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-2xl">
            {product.section3.title}
          </h2>
          <p className="text-2xl md:text-4xl font-light opacity-90 drop-shadow-lg">
            {product.section3.subtitle}
          </p>
        </motion.div>

        {/* Section 4 */}
        <motion.div 
          style={{ opacity: opacity4 }}
          className="absolute text-center max-w-4xl mt-64"
        >
          <h2 className="text-6xl md:text-8xl font-bold mb-4 drop-shadow-2xl">
            {product.section4.title}
          </h2>
          {product.section4.subtitle && (
            <p className="text-3xl md:text-5xl font-light opacity-90 drop-shadow-lg">
              {product.section4.subtitle}
            </p>
          )}
        </motion.div>

      </div>
    </div>
  );
}
