
interface Core {
    serial: string; // Required and unique
    block: number | null; // Optional, can be null
    status: 'active' | 'inactive' | 'unknown' | 'expended' | 'lost' | 'retired'; // Enumerated values, required
    reuse_count: number; // Default is 0
    rtls_attempts: number; // Default is 0
    rtls_landings: number; // Default is 0
    asds_attempts: number; // Default is 0
    asds_landings: number; // Default is 0
    last_update: string | null; // Optional, can be null
    launches: string[]; // Array of UUIDs representing launches
}

export default Core;
