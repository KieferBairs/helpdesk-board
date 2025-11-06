'use client';

export default function TicketCard({ ticket, onAdd, isQueued }) {
  return (
    <article className="border border-gray-300 rounded-xl p-5 bg-white shadow-md">
  <h3 className="font-semibold text-lg text-gray-900">{ticket.title}</h3>
  <p className="text-sm text-gray-700 mt-1 line-clamp-2">{ticket.description}</p>

  <div className="mt-3 text-sm text-gray-800 space-y-0.5">
    <div><span className="font-medium">Priority:</span> {ticket.priority}</div>
    <div><span className="font-medium">Status:</span> {ticket.status}</div>
    <div><span className="font-medium">Assignee:</span> {ticket.assignee}</div>
    <div className="text-gray-600">Updated: {new Date(ticket.updatedAt).toLocaleString()}</div>
  </div>

  <button
    className="mt-3 w-full rounded-md px-3 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
    onClick={onAdd}
    disabled={isQueued}
  >
    {isQueued ? 'In My Queue' : 'Add to My Queue'}
  </button>

  {isQueued && <p className="text-xs text-gray-600 mt-2">This ticket is already in your queue.</p>}
</article>

  );
}
