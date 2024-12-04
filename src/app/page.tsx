import { Suspense } from 'react';
import { LaunchStats } from '@/types/launches';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

async function getLaunchStats(): Promise<LaunchStats> {
  const response = await fetch('http://localhost:3000/api/launches/stats', {
    next: { revalidate: 3600 } // Revalidate every hour
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch launch stats');
  }
  
  return response.json();
}

function LaunchList({ launches, title }: { launches: LaunchStats['completed'] | LaunchStats['upcoming']; title: string }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {launches.map((launch) => (
          <Card key={launch.name} className="p-4">
            <h3 className="font-semibold">{launch.name}</h3>
            <p className="text-sm text-gray-500">
              {new Date(launch.date).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">{launch.rocket}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

function VehicleBreakdown({ breakdown }: { breakdown: LaunchStats['breakdown'] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Vehicle Breakdown</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {Object.values(breakdown).map((vehicle) => (
          <Card key={vehicle.name} className="p-4">
            <h3 className="font-semibold">{vehicle.name}</h3>
            <p className="text-2xl font-bold">{vehicle.count} launches</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

async function LaunchStatsContent() {
  const stats = await getLaunchStats();
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">SpaceX Launches {stats.year}</h1>
        <div className="text-right">
          <p className="text-xl">
            {stats.completed.length} completed
          </p>
          <p className="text-xl">
            {stats.upcoming.length} upcoming
          </p>
        </div>
      </div>
      
      <Separator />
      
      <VehicleBreakdown breakdown={stats.breakdown} />
      
      <Separator />
      
      <LaunchList launches={stats.completed} title="Completed Launches" />
      
      <Separator />
      
      <LaunchList launches={stats.upcoming} title="Upcoming Launches" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <Suspense fallback={<div>Loading launch statistics...</div>}>
        <LaunchStatsContent />
      </Suspense>
    </main>
  );
} 