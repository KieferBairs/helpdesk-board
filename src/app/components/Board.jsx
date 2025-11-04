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
    