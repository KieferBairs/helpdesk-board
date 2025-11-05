'use client';

import TicketCard from './TicketCard';

export default function TicketList({ tickets, onAddToQueue, queuedMap }) {
    return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tickets.map(t => (
            <TicketCard
                key={t.id}
                ticket={t}
                onAdd={() => onAddToQueue(t.id)}
                isQueued={!!queuedMap[t.id]}
            />
        ))}
    </div>
  );
}
