"use client";
import React from "react";
import Head from "next/head";
import CustomGlobe from "./globe.js";
import { usePads } from "@/hooks/usePad";
import { usePadStore } from "@/stores/usePadStore";
import { useLaunch } from "@/hooks/useLaunch";
import { useState } from "react";
import LaunchModal from "./LaunchModal.js";

export default function Home() {
  const { loading } = usePads();
  const { loading: launchLoading } = useLaunch();
  const { selectedPad, setSelectedPad } = usePadStore();
  const [selectedLaunch, setSelectedLaunch] = useState(null);

  const handleLaunchClick = (launch) => {
    setSelectedLaunch(launch);
  };

  const handleModalClose = () => {
    setSelectedLaunch(null);
  };

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
        {selectedPad ? (
          <div className="text-lg text-center p-8 border-2 border-dotted border-white text-zinc-100 overflow-y-auto max-h-full ">
            <div>
              {selectedPad.isLaunch ? (
                <div>
                  <p>{selectedPad.full_name}</p>
                  <p>
                    {selectedPad.latitude}, {selectedPad.longitude}
                  </p>
                  <p>Launch Attempts: {selectedPad.launch_attempts}</p>
                  <p>Launch Successes: {selectedPad.launch_successes}</p>
                  <p>Status: {selectedPad.status}</p>
                  <p>Details: {selectedPad.details}</p>

                  {selectedPad.launches && (
                    <div className="max-h-40 overflow-y-auto">
                      <p>Launches:</p>
                      <ul>
                        {selectedPad.launches.map((launch, index) => (
                          <li
                            key={index}
                            className="cursor-pointer underline"
                            onClick={() => handleLaunchClick(launch)}
                          >
                            {launch.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <p>Upcoming Launches: {selectedPad.status}</p>

                  {selectedPad.images.large &&
                    Array.isArray(selectedPad.images.large) && (
                      <div>
                        <div className="flex flex-row">
                          {selectedPad.images.large.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Image ${index + 1}`}
                              className="mr-2"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              ) : (
                <div>
                  <p>{selectedPad.full_name}</p>
                  <p>
                    {selectedPad.latitude}, {selectedPad.longitude}
                  </p>
                  <p>Land Attempts: {selectedPad.landing_attempts}</p>
                  <p>Land Successes: {selectedPad.landing_successes}</p>
                  <p>Status: {selectedPad.status}</p>
                  <p>Details: {selectedPad.details}</p>

                  <p>Upcoming Launches: {selectedPad.status}</p>

                  {selectedPad.images.large &&
                    Array.isArray(selectedPad.images.large) && (
                      <div>
                        <div className="flex flex-row">
                          {selectedPad.images.large.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Image ${index + 1}`}
                              className="mr-2"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  {selectedPad.launches && (
                    <div className="max-h-40 overflow-y-auto">
                      <p>Launches:</p>
                      <ul>
                        {selectedPad.launches.map((launch, index) => (
                          <li
                            key={index}
                            className="cursor-pointer underline"
                            onClick={() => handleLaunchClick(launch)}
                          >
                            {launch.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-lg text-center p-8 border-2 border-dotted border-white text-zinc-100">
          <h1>Welcome to SpaceX Visualized</h1>
          <p>
            Whether you&apos;re making content, or trying to show users future
            rocket launches.
          </p>
          <p>We&apos;ve created the place for all visualization.</p>
        </div>
        
        )}
      </div>
      <LaunchModal launch={selectedLaunch} onClose={handleModalClose} />
    </div>
  );
}
