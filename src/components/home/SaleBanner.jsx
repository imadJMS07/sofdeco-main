import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Partners from './Partners';
import Subscribe from './Subscribe';
import { Link } from 'react-router-dom';

const SaleBanner = () => {
  return (
    <>
      <section className="bg-[#F8F3EE] relative py-16">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-30" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C5A05C' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-8 gap-1 bg-white/90 backdrop-blur-sm shadow-[0_20px_50px_rgba(78,59,38,0.1)]">
            {/* Left Banner - Armchair */}
            <motion.div 
              className="group relative h-[400px] md:h-[480px] overflow-hidden md:col-span-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
                style={{
                  backgroundImage: 'url("https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&auto=format&fit=crop&q=80")',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#E9DFD3] via-[#E9DFD3]/60 to-transparent opacity-95 group-hover:opacity-90 transition-opacity duration-500" />
              
              <div className="relative h-full p-10 flex flex-col items-center justify-center z-10 text-center">
                <motion.div 
                  className="inline-block bg-white/95 backdrop-blur-sm px-5 py-2.5 mb-8 shadow-lg"
                  whileHover={{ y: -3, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="text-sm font-medium tracking-[0.2em] text-[#4E3B26]">
                    40% OFF
                  </span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="relative"
                >
                  <span className="absolute -inset-6 blur-md bg-[#C5A05C]/5 rounded-full"></span>
                  <h3 className="relative text-3xl md:text-4xl font-bold text-[#4E3B26] leading-[1.1] tracking-tight">
                    Fauteuil
                    <span className="block font-serif italic mt-1">moderne</span>
                  </h3>
                  <div className="w-12 h-0.5 bg-[#C5A05C]/30 mx-auto my-4"></div>
                  <p className="mt-3 text-[#4E3B26]/70 font-medium tracking-wide text-sm">
                    Découvrez notre collection
                  </p>
                </motion.div>
                <Link to="/products">
                  <motion.button
                    className="inline-flex items-center mt-8 text-sm font-medium text-[#4E3B26] group/btn relative overflow-hidden"
                    whileHover={{ x: 10 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <span className="relative tracking-[0.2em]">
                      EXPLORER
                      <span className="absolute inset-x-0 -bottom-2 border-b-2 border-[#C5A05C] transform origin-left scale-x-0 transition-transform group-hover/btn:scale-x-100" />
                    </span>
                    <ArrowRightIcon className="w-5 h-5 ml-3 transition-transform group-hover/btn:translate-x-2" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Center Banner - Main Sale */}
            <motion.div 
              className="group relative h-[400px] md:h-[480px] overflow-hidden md:col-span-2"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#C5A05C] via-[#B89451] to-[#8B6B2F]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]" />
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23FFFFFF' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`
                }}
              />
              <div className="relative h-full p-6 flex flex-col items-center justify-center z-10">
                <motion.div 
                  className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 shadow-lg"
                  whileHover={{ y: -3, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="text-xs font-medium tracking-[0.2em] text-[#4E3B26]">30% OFF</span>
                </motion.div>
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="relative">
                    <span className="absolute -inset-1 blur-lg bg-white/30 rounded-full"></span>
                    <h2 className="relative text-6xl font-serif text-white tracking-tight drop-shadow-lg mb-2">
                      Soldes
                    </h2>
                  </div>
                  <div className="w-12 h-0.5 bg-white/30 mx-auto my-4"></div>
                  <div className="text-white/90 text-sm tracking-[0.2em] font-light uppercase mb-8">
                    Nouvelle Collection
                  </div>
                  <Link to="/products">
                    <motion.button
                      className="group/btn inline-flex items-center px-6 py-2.5 bg-[#2A2118] text-white text-xs font-medium tracking-[0.2em] transition-all duration-300 shadow-xl hover:shadow-2xl relative overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <span className="relative z-10 group-hover/btn:text-[#2A2118]">ACHETER MAINTENANT</span>
                      <ArrowRightIcon className="w-4 h-4 ml-2 relative z-10 transition-transform group-hover/btn:translate-x-1" />
                      <span className="absolute inset-0 bg-white transform origin-left scale-x-0 transition-transform duration-300 ease-out group-hover/btn:scale-x-100"></span>
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Banner - Design Table */}
            <motion.div 
              className="group relative h-[400px] md:h-[480px] overflow-hidden md:col-span-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
                style={{
                  backgroundImage: 'url("https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&auto=format&fit=crop&q=80")',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#E9DFD3] via-[#E9DFD3]/60 to-transparent opacity-95 group-hover:opacity-90 transition-opacity duration-500" />
              
              <div className="relative h-full p-10 flex flex-col items-center justify-center z-10 text-center">
                <motion.div 
                  className="inline-block bg-white/95 backdrop-blur-sm px-5 py-2.5 mb-8 shadow-lg"
                  whileHover={{ y: -3, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="text-sm font-medium tracking-[0.2em] text-[#4E3B26]">
                    30% OFF
                  </span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="relative"
                >
                  <span className="absolute -inset-6 blur-md bg-[#C5A05C]/5 rounded-full"></span>
                  <h3 className="relative text-3xl md:text-4xl font-bold text-[#4E3B26] leading-[1.1] tracking-tight">
                    Table
                    <span className="block font-serif italic mt-1">design</span>
                  </h3>
                  <div className="w-12 h-0.5 bg-[#C5A05C]/30 mx-auto my-4"></div>
                  <p className="mt-3 text-[#4E3B26]/70 font-medium tracking-wide text-sm">
                    Sublimez votre espace
                  </p>
                </motion.div>
                <Link to="/products">
                  <motion.button
                    className="inline-flex items-center mt-8 text-sm font-medium text-[#4E3B26] group/btn relative overflow-hidden"
                    whileHover={{ x: 10 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <span className="relative tracking-[0.2em]">
                      EXPLORER
                      <span className="absolute inset-x-0 -bottom-2 border-b-2 border-[#C5A05C] transform origin-left scale-x-0 transition-transform group-hover/btn:scale-x-100" />
                    </span>
                    <ArrowRightIcon className="w-5 h-5 ml-3 transition-transform group-hover/btn:translate-x-2" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SaleBanner; 