'use client';

import { useState, useMemo, useEffect, useCallback, use } from 'react';
import StatusFilter from './StatusFilter';
import PriorityFilter from './PriorityFilter';
import SearchBox from './SearchBox';
import TicketList from './TicketList';
import MyQueueSummary from './MyQueueSummary';
import StatusMessage from './StatusMessage';

const STATUS_VALUES = ['All', 'Open', 'In Progress', 'On Hold', 'Resolved', 'Closed'];
const PRIORITY_VALUES = ['All', 'Low', 'Medium', 'High', 'Critical'];

export default function Board() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filters, setFilters] = useState({ status: 'All', priority: 'All', search: '' });
    const [search, setSearch] = useState('');
    const [queue, setQueue] = useState({});


// Fetch tickets on component mount
    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        fetch('/api/tickets')
            .then(r) => {
                if (!r.ok) throw new Error('Failed to fetch tickets');
                return r.json();
            })
            .then((data) => {
                if (!cancelled) {
                    setTickets(data);
                    setError('');
                }
            })
            .catch(() => !cancelled && setError('Error loading tickets'))
            .finally(() => !cancelled && setLoading(false));
        return () => {
            cancelled = true;
        };
    }, []);

    // Simulate live updates every 8 seconds
    useEffect(() => {
        if (!tickets.length) return;
        const id = setInterval(() => {
            setTickets(prev) => {
                if (!prev.length) return prev;
                const idx = Math.floor(Math.random() * prev.length);
                const t = prev[idx];

                // decide to change status or priority
                const changeStatus = Math.random() < 0.5;

                const nextStatus = (cur) => {
                    if (cur === 'Open') return 'In Progress';
                    if (cur === 'In Progress') return 'On Hold';
                    if (cur === 'On Hold') return 'Resolved';
                    return 'Resolved';
                };      
                const nextPriority = (cur) => {
                    if (cur === 'Low') return 'Medium';
                    if (cur === 'Medium') return 'High';
                    if (cur === 'High') return 'Critical';
                    return 'High';
                };

                const updated = {
                    ...t,
                    status: changeStatus ? nextStatus(t.status) : t.status,
                    priority: !changeStatus ? nextPriority(t.priority) : t.priority,
                    updatedAt: new Date().toISOString(),
                };
                const copy = prev.slice();
                copy[idx] = updated;
                return copy;
            };
        }, 8000);
        return () => clearInterval(id);
    }, [tickets.length]);

// Derived visible tickets
    const visibleTickets = useMemo(() => {
        const q = search.trim().toLowerCase();
        return tickets.filter (t => {
            const statusOk = filters.status === 'All' || t.status === filters.status;
            const priorityOk = filters.priority === 'All' || t.priority === filters.priority;
            const textOk = !q || t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
            return statusOk && priorityOk && textOk;
        });
    }, [tickets, filters, search]);

    // Queue summary
    const addToQueue = useCallback((id) => {
        setQueue(q => (q[id] ? q : { ...q, [id]: true }));
    }, []);
    
    const removeFromQueue = useCallback((id) => {
        setQueue(q => {
            const copy = { ...q };
            delete copy[id];
            return copy;
        });
    }, []);
    const clearQueue = useCallback(() => setQueue({}), []);

    return (
        <section className="space-y-4">
            <div className="flex flex-wrap gap-2 items-center">
                <StatusFilter
                    values={filters.status}
                    onChange={(v) => setFilters(f => ({ ...f, status: v }))}
                    options={STATUS_VALUES}
                />
                <PriorityFilter
                    values={filters.priority}
                    onChange={(v) => setFilters(f => ({ ...f, priority: v }))}
                    options={PRIORITY_VALUES}
                />
                <SearchBox
                    value={search}
                    onChange={(v) => setSearch(v)}/>
            </div>
            <StatusMessage loading={loading} error={error} isEmpty={!loading && !error && visibleTickets.length === 0} />
            {!loading && !error && visibleTickets.length > 0 && (
                <TicketList
                    tickets={visibleTickets}
                    onAddToQueue={addToQueue}
                    queuedMap={queue}
                    />
            )}
            <MyQueueSummary
                queuedMap={queue}
                tickets={tickets}
                onRemove={removeFromQueue}
                onClear={clearQueue}
            />
        </section>
    );
}