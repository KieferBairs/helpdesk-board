'use client';

export default function MyQueueSummary({ queuedMap, tickets, onRemove, onClear }) {
  const queuedIds = Object.keys(queuedMap);
  const queuedTickets = tickets.filter(t => queuedMap[t.id]);

  return (
    <aside className="mt-6 border rounded-xl p-4 bg-black-50">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">My Queue ({queuedIds.length})</h2>
        <button
          className="text-sm underline disabled:opacity-50"
          onClick={onClear}
          disabled={queuedIds.length === 0}
        >
          Clear Queue
        </button>
      </div>

      {queuedTickets.length === 0 ? (
        <p className="text-sm text-black-600 mt-2">No tickets selected.</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {queuedTickets.map(t => (
            <li key={t.id} className="flex items-center justify-between">
              <span className="text-sm">{t.title}</span>
              <button className="text-sm underline" onClick={() => onRemove(t.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
