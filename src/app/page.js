"use client";
import React from "react";
import Head from "next/head";
import CustomGlobe from "./globe.js";
import { useLaunchpads } from "@/hooks/useLaunchpads";
import { useLaunchpadStore } from "@/stores/useLaunchpadStore";

export default function Home() {
  const { loading } = useLaunchpads();
  const { selectedLaunch } = useLaunchpadStore();

  return (
    <div className="flex flex-row items-center justify-center h-screen bg-black">
      <div className="w-1/2 h-full flex items-center justify-center">
        <div className="relative w-full h-full rounded-full flex justify-center items-center">
          {loading ? (
            <div className="text-zinc-100">Loading...</div>
          ) : (
            <CustomGlobe />
          )}
        </div>
      </div>
      <div className="absolute top-0 left-0 right-0 mt-6 text-center text-zinc-100">
        SpaceX Visualizer
      </div>
      <div className="w-1/2 h-full z-50 flex items-center justify-center">
        {selectedLaunch ? (
          <div className="text-lg text-center p-8 border-2 border-dotted border-white text-zinc-100">
            <div>
              <p>Name: {selectedLaunch.full_name}</p>
              <p>Latitude: {selectedLaunch.latitude}</p>
              <p>Longitude: {selectedLaunch.longitude}</p>
              <p>Launch Attempts: {selectedLaunch.launch_attempts}</p>
              <p>Launch Successes: {selectedLaunch.launch_successes}</p>
              <p>Status: {selectedLaunch.status}</p>
            </div>
          </div>
        ) : (
          <div className="text-lg text-center p-8 border-2 border-dotted border-white text-zinc-100">
            <h1>Welcome to SpaceX Visualized</h1>
            <p>Whether you're making content, or trying to show users future rocket launches.</p>
            <p>We've created the place for all visualization.</p>
          </div>
        )}
      </div>
    </div>
  );
}