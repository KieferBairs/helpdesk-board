'use client';

export default function SearchBox({ value, onChange }) {
    return (
        <input
            className="border rounded px-3 py-2 flex-1 min-w-[220px]"
            placeholder="Search tickets..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}