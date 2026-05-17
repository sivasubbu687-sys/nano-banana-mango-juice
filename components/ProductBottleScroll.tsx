"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Product } from "@/data/products";

interface Props {
  product: Product;
}

export default function ProductBottleScroll({ product }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  


  const [images, setImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    // Preload images
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;
    const totalFrames = 120; // 1 to 120

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      // Using .jpg as we processed the user's files to .jpg format earlier
      img.src = `${product.folderPath}/${i}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          setImages(loadedImages);
        }
      };
      loadedImages.push(img);
    }
  }, [product.folderPath]);

  // Auto-play video frames without using cursor/scroll
  const frameRef = useRef(0);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    if (!canvasRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const deltaTime = time - lastTimeRef.current;
      
      // Play at roughly 30 FPS
      if (deltaTime > 1000 / 30) {
        frameRef.current = (frameRef.current + 1) % images.length;
        lastTimeRef.current = time;
      }
      
      const img = images[frameRef.current];
      
      if (img) {
        // Force 2160p (4K UHD) internal resolution
        const targetWidth = 3840;
        const targetHeight = 2160;
        
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        
        const hRatio = targetWidth / img.width;
        const vRatio = targetHeight / img.height;
        // Use Math.max for cover (full screen) instead of Math.min
        const ratio = Math.max(hRatio, vRatio);
        
        const centerShift_x = (targetWidth - img.width * ratio) / 2;
        const centerShift_y = (targetHeight - img.height * ratio) / 2;
        
        ctx.clearRect(0, 0, targetWidth, targetHeight);
        ctx.drawImage(img, 0, 0, img.width, img.height,
                      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
      }
      animationId = requestAnimationFrame(render);
    };

    let animationId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationId);
  }, [images]);

  return (
    <div ref={containerRef} className="relative w-full h-screen">
      <div className="absolute inset-0 w-full h-screen overflow-hidden flex items-center justify-center pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full object-cover" style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
}
