// app/api/cores/[id]/route.ts
import Core from '@/types/cores';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Define the parameter type according to your route parameters
type Params = {
    id: string;  // This corresponds to the [id] in the file path
};

// GET handler for fetching a specific SpaceX core by ID
export async function GET(request: NextRequest, context: { params: Params }) {
    const { id } = context.params; // Access the 'id' from the dynamic route parameters

    try {
        const url = `https://api.spacexdata.com/v4/cores/${id}`;
        const response = await fetch(url);
        if (!response.ok) {
            if (response.status === 404) {
                return new NextResponse('Not Found', { status: 404 });
            }
            throw new Error(`Failed to fetch SpaceX core data: HTTP status ${response.status}`);
        }
        const data: Core = await response.json();
        return new NextResponse(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        return new NextResponse(errorMessage, { status: 500 });
    }
}

// Optional: Define OPTIONS method if you need to specify allowed HTTP methods
export function OPTIONS() {
    const response = new NextResponse(null, { status: 204 });
    response.headers.set('Allow', 'GET, OPTIONS');
    return response;
}
