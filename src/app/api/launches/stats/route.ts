import { NextResponse } from 'next/server';

const LAUNCH_LIBRARY_BASE_URL = 'https://lldev.thespacedevs.com/2.2.0/launch/';
const MAX_PAGES = 10;
const SPACEX_AGENCY_ID = 121;

interface Launch {
  name: string;
  date: string;
  rocket: string;
}

interface LaunchResponse {
  results: LaunchLibraryLaunch[];
  next: string | null;
}

interface LaunchLibraryLaunch {
  name: string;
  net: string;
  launch_service_provider: {
    id: number;
    name: string;
  };
  rocket: {
    configuration: {
      name: string;
    };
  };
}

interface LaunchStats {
  year: number;
  completed: Launch[];
  upcoming: Launch[];
  breakdown: {
    [key: string]: {
      name: string;
      count: number;
    };
  };
}

async function apiGet(endpoint: string): Promise<LaunchResponse> {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }
  return response.json();
}

async function apiGetAllPages(endpoint: string): Promise<LaunchLibraryLaunch[]> {
  let data: LaunchLibraryLaunch[] = [];
  let currentResponse: LaunchResponse | null = null;
  let page = 1;

  try {
    do {
      const url = currentResponse?.next || endpoint;
      currentResponse = await apiGet(url);
      
      if (currentResponse?.results) {
        data = data.concat(currentResponse.results);
      }
      
      page++;
    } while (currentResponse?.next && page <= MAX_PAGES);

    return data.filter(
      (launch) => launch.launch_service_provider?.id === SPACEX_AGENCY_ID
    );
  } catch (error) {
    console.error('Error fetching launches:', error);
    throw error;
  }
}

function transformLaunch(launch: LaunchLibraryLaunch): Launch {
  return {
    name: launch.name,
    date: launch.net,
    rocket: launch.rocket.configuration.name,
  };
}

function calculateBreakdown(launches: Launch[]) {
  return launches.reduce((acc, launch) => {
    const rocketName = launch.rocket;
    if (!acc[rocketName]) {
      acc[rocketName] = { name: rocketName, count: 0 };
    }
    acc[rocketName].count++;
    return acc;
  }, {} as LaunchStats['breakdown']);
}

export async function GET() {
  try {
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(currentYear, 0, 1).toISOString();
    const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59).toISOString();
    
    const endpoint = `${LAUNCH_LIBRARY_BASE_URL}?limit=100&net__gte=${startOfYear}&net__lte=${endOfYear}`;
    const launches = await apiGetAllPages(endpoint);
    
    const now = new Date();
    const transformedLaunches = launches.map(transformLaunch);
    
    const completed = transformedLaunches.filter(
      (launch) => new Date(launch.date) <= now
    );
    const upcoming = transformedLaunches.filter(
      (launch) => new Date(launch.date) > now
    );

    const stats: LaunchStats = {
      year: currentYear,
      completed,
      upcoming,
      breakdown: calculateBreakdown(transformedLaunches),
    };

    console.log(`[DEBUG] Fetched ${launches.length} SpaceX launches`);
    console.log('[DEBUG] Launches breakdown:', {
      total: transformedLaunches.length,
      completed: completed.length,
      upcoming: upcoming.length,
    });
    console.log('[DEBUG] Final stats:', stats);

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error in GET handler:', error);
    return NextResponse.json(
      { error: 'Failed to fetch launch data' },
      { status: 500 }
    );
  }
} 