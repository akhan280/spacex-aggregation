import { NextResponse } from 'next/server';
import Launchpad from '@/types/launchpad';

export async function GET(request: Request) {
 try {
   const response = await fetch('https://api.spacexdata.com/v4/launchpads');
   if (!response.ok) {
     throw new Error('Failed to fetch SpaceX launchpads data.');
   }
   const data: Launchpad[] = await response.json();
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