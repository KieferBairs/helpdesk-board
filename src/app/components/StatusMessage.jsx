'use client';

export default function StatusMessage({loading, error, isEmpty}) {
    if (loading) return <p className="text-center text-gray-500">Loading tickets...</p>;
    if (error) return <p className="text-center text-red-500">Error loading tickets: {error.message}</p>;
    if (isEmpty) return <p className="text-center text-gray-500">No tickets found.</p>;
    return null;
}