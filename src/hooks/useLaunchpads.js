import { useEffect } from 'react';
import { useLaunchpadStore } from '../stores/useLaunchpadStore';

export const useLaunchpads = () => {
    const { launchpads, setLaunchpads, loading, setLoading } = useLaunchpadStore();

  useEffect(() => {
    async function fetchLaunchpads() {
      const response = await fetch("/api/launchpads/");
      const data = await response.json();
      setLaunchpads(data);
      setLoading(false);
    }


    fetchLaunchpads().catch(console.error);
  }, []);

  return { launchpads, loading };
};