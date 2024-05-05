

interface Launchpad {
    name: string | null;
    full_name: string | null;
    status: 'active' | 'inactive' | 'unknown' | 'retired' | 'lost' | 'under construction';
    locality: string | null;
    region: string | null;
    timezone: string | null;
    latitude: number | null;
    longitude: number | null;
    launch_attempts: number;
    launch_successes: number;
    rockets: string[]; 
    launches: string[];
}

export default Launchpad;
