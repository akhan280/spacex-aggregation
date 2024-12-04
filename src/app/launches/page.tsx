'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface Launch {
    date_utc: string;
    upcoming: boolean;
    rocket: string;
    name: string;
    success?: boolean;
}

interface LaunchStats {
    currentYear: number;
    completedLaunches: number;
    upcomingLaunches: Launch[];
    projectedLaunches: number;
    vehicleBreakdown: {
        [key: string]: {
            name: string;
            count: number;
        };
    };
}

export default function LaunchesPage() {
    const [stats, setStats] = useState<LaunchStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('/api/launches/stats');
                if (!response.ok) {
                    throw new Error('Failed to fetch launch stats');
                }
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error('Error fetching launch stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (!stats) {
        return <div className="flex justify-center items-center min-h-screen">Failed to load launch statistics</div>;
    }

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold mb-8">SpaceX Launch Statistics {stats.currentYear}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Card>
                    <CardHeader className="text-xl font-semibold">Completed Launches</CardHeader>
                    <CardContent className="text-3xl font-bold">{stats.completedLaunches}</CardContent>
                </Card>
                
                <Card>
                    <CardHeader className="text-xl font-semibold">Upcoming Launches</CardHeader>
                    <CardContent className="text-3xl font-bold">{stats.upcomingLaunches.length}</CardContent>
                </Card>
                
                <Card>
                    <CardHeader className="text-xl font-semibold">Projected EOY Total</CardHeader>
                    <CardContent className="text-3xl font-bold">{stats.projectedLaunches}</CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader className="text-xl font-semibold">Vehicle Breakdown</CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {Object.entries(stats.vehicleBreakdown).map(([rocketId, data]) => (
                                <li key={rocketId} className="flex justify-between items-center">
                                    <span className="font-medium">{data.name}</span>
                                    <span className="text-lg">{data.count} launches</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="text-xl font-semibold">Upcoming Launches</CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {stats.upcomingLaunches.map((launch, index) => (
                                <li key={index} className="flex flex-col">
                                    <span className="font-medium">{launch.name}</span>
                                    <span className="text-sm text-gray-500">
                                        {new Date(launch.date_utc).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                    {index < stats.upcomingLaunches.length - 1 && (
                                        <Separator className="my-2" />
                                    )}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 