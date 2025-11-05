'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
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