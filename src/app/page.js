import Board from './components/Board';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-900">Helpdesk Ticket Board</h1>
      <Board /> 
    </main>
  );
}