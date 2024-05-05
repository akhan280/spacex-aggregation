

import type { NextApiRequest, NextApiResponse } from 'next';
import LandingPad from '@/types/landpad';

export default async function handler(req: NextApiRequest, res: NextApiResponse<LandingPad[] | { message: string }>) {
    if (req.method === 'GET') {
        try {
            const response = await fetch('https://api.spacexdata.com/v4/landpads');
            if (!response.ok) {
                throw new Error('Failed to fetch SpaceX landing pads data.');
            }
            const data: LandingPad[] = await response.json();
            res.status(200).json(data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unexpected error occurred' });
            }
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
