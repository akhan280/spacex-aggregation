import { NextResponse } from 'next/server';
import LandingPad from '@/types/landpad';

type Params = {
  id: string;
};

export async function GET(request: Request, context: { params: Params }) {
  const { id } = context.params;
  try {
    const response = await fetch(`https://api.spacexdata.com/v4/landpads/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ message: 'Not Found' }, { status: 404 });
      }
      throw new Error('Failed to fetch SpaceX landing pad data.');
    }
    const data: LandingPad = await response.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
    }
  }
}

export async function OPTIONS(request: Request) {
  return NextResponse.json(null, {
    status: 200,
    headers: {
      'Allow': 'GET',
    },
  });
}