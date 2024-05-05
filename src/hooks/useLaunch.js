import { useEffect } from 'react';
import { useLaunchStore } from '../stores/useLaunchStore';

export const useLaunch = () => {
  const { launches, setLaunches, loading, setLoading } = useLaunchStore();

  useEffect(() => {
    async function fetchLaunch() {
      const response = await fetch("/api/launches/");
      const data = await response.json();
      setLaunches(data);
      setLoading(false);
    }

    fetchLaunch().catch(console.error);
  }, []);

  return { launches, loading };
};