
import type { NextApiRequest, NextApiResponse } from 'next';
import Launch from '@/types/launch';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Launch | { message: string }>) {
    const { id } = req.query; // Get the 'id' parameter from the URL

    if (req.method === 'GET') {
        try {
            const response = await fetch(`https://api.spacexdata.com/v5/launches/${id}`);
            if (!response.ok) {
                // If the status code is not OK, consider it as the launch not found or other fetch errors
                if (response.status === 404) {
                    return res.status(404).json({ message: 'Not Found' });
                }
                throw new Error('Failed to fetch the SpaceX data.');
            }
            const data: Launch = await response.json();
            res.status(200).json(data);
        } catch (error: unknown) {
            // Handle errors from fetch or other parts of the try block
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unexpected error occurred' });
            }
        }
    } else {
        // If the method is not GET, return method not allowed
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
