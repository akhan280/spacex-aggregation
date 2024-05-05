
interface LandingPad {
    name: string | null;
    full_name: string | null;
    status: 'active' | 'inactive' | 'unknown' | 'retired' | 'lost' | 'under construction';
    type: string | null;
    locality: string | null;
    region: string | null;
    latitude: number | null;
    longitude: number | null;
    landing_attempts: number;
    landing_successes: number;
    wikipedia: string | null;
    details: string | null;
    launches: string[];
}

export default LandingPad;
