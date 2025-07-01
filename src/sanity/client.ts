import { createClient } from 'next-sanity';

export const client = createClient({
    projectId: "076g8xzn",
    dataset: "production",
    apiVersion: '2025-06-15', // Use a specific date for the
    useCdn: false, // `false` if you want to ensure fresh data
});