"use client"
import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import Globe from 'globe.gl';

export default function Home() {
  const globeContainerRef = useRef(null);

  useEffect(() => {
    // Initialize the globe only if the container exists
    if (globeContainerRef.current) {
      const N = 10;
      const gData = [...Array(N).keys()].map(() => ({
        lat: (Math.random() - 0.5) * 180,
        lng: (Math.random() - 0.5) * 360,
        maxR: Math.random() * 20 + 3,
        propagationSpeed: (Math.random() - 0.5) * 20 + 1,
        repeatPeriod: Math.random() * 2000 + 200
      }));

      const colorInterpolator = t => `rgba(255,100,50,${Math.sqrt(1-t)})`;

      const myGlobe = Globe()
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
        .ringsData(gData)
        .ringColor(() => colorInterpolator)
        .ringMaxRadius('maxR')
        .ringPropagationSpeed('propagationSpeed')
        .ringRepeatPeriod('repeatPeriod');

      myGlobe(globeContainerRef.current);


      return () => {
        if (globeContainerRef.current) {
          globeContainerRef.current.innerHTML = '';
        }
      };
    }
  }, []);

  return (
    <div>
      <Head>
        <style>{`body { margin: 0; }`}</style>
      </Head>
      <div ref={globeContainerRef} style={{ width: '100vw', height: '100vh' }} />
    </div>
  );
}
