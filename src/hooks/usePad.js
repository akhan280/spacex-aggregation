import { useEffect } from 'react';
import { usePadStore } from '../stores/usePadStore';

export const usePads = () => {
  const { pads, setPads, loading, setLoading } = usePadStore();

  useEffect(() => {
    async function fetchPads() {
      const launchResponse = await fetch("/api/launchpads/");
      const launchData = await launchResponse.json();
      const landResponse = await fetch("/api/landpads/");
      const landData = await landResponse.json();
      const data = [...launchData, ...landData];

      const updatedPads = await Promise.all(
        data.map(async (pad) => {
          const launches = await Promise.all(
            pad.launches.map(async (launchId) => {
              const response = await fetch(`https://api.spacexdata.com/v5/launches/${launchId}`);
              const launchData = await response.json();
              return launchData;
            })
          );

          return {
            ...pad,
            launches,
          };
        })
      );

      setPads(updatedPads);
      setLoading(false);
    }

    fetchPads().catch(console.error);
  }, []);

  return { pads, loading };
};