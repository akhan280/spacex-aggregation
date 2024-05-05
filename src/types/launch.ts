
interface Failure {
    time: number;
    altitude: number;
    reason: string;
}

interface Fairings {
    reused: boolean | null;
    recovery_attempt: boolean | null;
    recovered: boolean | null;
    ships: string[];
}

interface CrewMember {
    crew: string | null; // UUID
    role: string | null;
}

interface Core {
    core: string | null; // UUID
    flight: number | null;
    gridfins: boolean | null;
    legs: boolean | null;
    reused: boolean | null;
    landing_attempt: boolean | null;
    landing_success: boolean | null;
    landing_type: string | null;
    landpad: string | null; // UUID
}

interface Link {
    small: string | null;
    large: string | null;
}

interface Links {
    patch: Link;
    reddit: {
        campaign: string | null;
        launch: string | null;
        media: string | null;
        recovery: string | null;
    };
    flickr: {
        small: string[];
        original: string[];
    };
    presskit: string | null;
    webcast: string | null;
    youtube_id: string | null;
    article: string | null;
    wikipedia: string | null;
}

interface Launch {
    flight_number: number;
    name: string;
    date_utc: string;
    date_unix: number;
    date_local: string;
    date_precision: 'half' | 'quarter' | 'year' | 'month' | 'day' | 'hour';
    static_fire_date_utc: string | null;
    static_fire_date_unix: number | null;
    tdb: boolean;
    net: boolean;
    window: number | null;
    rocket: string | null; // UUID
    success: boolean | null;
    failures: Failure[];
    upcoming: boolean;
    details: string | null;
    fairings: Fairings;
    crew: CrewMember[];
    ships: string[]; // UUIDs
    capsules: string[]; // UUIDs
    payloads: string[]; // UUIDs
    launchpad: string | null; // UUID
    cores: Core[];
    links: Links;
    auto_update: boolean;
}

export default Launch;
