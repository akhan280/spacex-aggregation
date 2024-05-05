

import type { NextApiRequest, NextApiResponse } from 'next';
import LandingPad from '@/types/landpad';

export default async function handler(req: NextApiRequest, res: NextApiResponse<LandingPad | { message: string }>) {
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const response = await fetch(`https://api.spacexdata.com/v4/landpads/${id}`);
            if (!response.ok) {
                if (response.status === 404) {
                    return res.status(404).json({ message: 'Not Found' });
                }
                throw new Error('Failed to fetch SpaceX landing pad data.');
            }
            const data: LandingPad = await response.json();
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
