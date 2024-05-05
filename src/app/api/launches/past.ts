
import Launch from '@/types/launch';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Launch[] | { message: string }>) {
    if (req.method === 'GET') {
        try {
            const response = await fetch('https://api.spacexdata.com/v5/launches/past');
            if (!response.ok) {
                throw new Error('Failed to fetch the SpaceX data.');
            }
            const data: Launch[] = await response.json();
            res.status(200).json(data);
        } catch (error: unknown) {
            // Check if error is an instance of Error
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                // If error is not an instance of Error, return a generic error message
                res.status(500).json({ message: 'An unexpected error occurred' });
            }
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
