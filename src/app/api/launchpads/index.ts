
import type { NextApiRequest, NextApiResponse } from 'next';
import Launchpad from '@/types/launchpad';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Launchpad[] | { message: string }>) {
    if (req.method === 'GET') {
        try {
            const response = await fetch('https://api.spacexdata.com/v4/launchpads');
            if (!response.ok) {
                throw new Error('Failed to fetch SpaceX launchpads data.');
            }
            const data: Launchpad[] = await response.json();
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
