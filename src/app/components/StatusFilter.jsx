'use client';

export default function StatusFilter({value, onChange, options}) {
    return (
        <label className="text-sm flex items-center gap-2">
            <span className="font-medium">Status:</span>
            <select
                className="border rounded px-2 py-2"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
        </label>
    );
}