'use client'
import React from 'react';
import Head from 'next/head';
import CustomGlobe from './globe.js'

export default function Home() {
  return (
    <div className='flex flex-row items-center justify-center h-screen bg-black'>
      <div className="w-1/2 h-full flex items-center justify-cente">
        <div className="relative w-full h-full rounded-full flex justify-center items-center">
          <CustomGlobe />
        </div>
      </div>
      <div className="absolute top-0 mt-6 text-zinc-100">
        spacex visualizer
      </div>
      <div className="w-1/2 h-full flex items-center justify-center">
        <div className="text-lg text-center p-8 border-2 border-dotted border-white text-zinc-100">
          <h1>Welcome to Our Globe Visualization</h1>
          <p>This interactive globe shows various dynamic features based on user data.</p>
          <p>Explore the globe to learn more about the data points and their significance.</p>
        </div>
      </div>
    </div>
  );
}