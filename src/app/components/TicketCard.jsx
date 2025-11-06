'use client';

export default function TicketCard({ ticket, onAdd, isQueued }) {
  return (
    <article className="border rounded-xl p-4 bg-white shadow-sm">
      <h3 className="font-semibold">{ticket.title}</h3>
      <p className="text-sm text-black-600 mt-1 line-clamp-2">{ticket.description}</p>

      <div className="mt-3 text-sm">
        <div><span className="font-medium">Priority:</span> {ticket.priority}</div>
        <div><span className="font-medium">Status:</span> {ticket.status}</div>
        <div><span className="font-medium">Assignee:</span> {ticket.assignee}</div>
        <div className="text-gray-500">Updated: {new Date(ticket.updatedAt).toLocaleString()}</div>
      </div>

      <button
        className="mt-3 rounded px-3 py-2 bg-black text-white disabled:opacity-50"
        onClick={onAdd}
        disabled={isQueued}
      >
        {isQueued ? 'In My Queue' : 'Add to My Queue'}
      </button>

      {isQueued && <p className="text-xs text-black-500 mt-2">This ticket is already in your queue.</p>}
    </article>
  );
}
