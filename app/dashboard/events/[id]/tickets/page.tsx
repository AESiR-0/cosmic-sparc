'use client'

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import AdminLayout from '@/components/layout/AdminLayout';
import { CheckCircle, XCircle } from 'lucide-react';

export default function EventTicketsPage() {
  const { id } = useParams();
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTickets();
  }, [id]);

  const fetchTickets = async () => {
    setLoading(true);
    setError('');
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .eq('event_id', id);
      if (error) throw error;
      setTickets(data || []);
    } catch (err) {
      setError('Failed to load tickets.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Tickets Dashboard">
      <div className="max-w-3xl mx-auto py-8 px-2">
        <h1 className="text-2xl font-bold mb-6">Tickets for Event</h1>
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <div className="space-y-4">
          {tickets.map(ticket => (
            <div key={ticket.id} className="bg-white rounded-lg border p-4 flex items-center justify-between">
              <div>
                <div className="font-semibold">{ticket.name}</div>
                <div className="text-xs text-gray-500">{ticket.email}</div>
                <div className="text-xs text-gray-500">Ticket ID: {ticket.ticket_id}</div>
              </div>
              <div className="flex items-center gap-2">
                {ticket.status === 'entered' ? (
                  <span className="flex items-center gap-1 text-green-700 font-semibold"><CheckCircle className="w-4 h-4" /> Checked In</span>
                ) : (
                  <span className="flex items-center gap-1 text-orange-600 font-semibold"><XCircle className="w-4 h-4" /> Not Checked In</span>
                )}
              </div>
            </div>
          ))}
        </div>
        {!loading && tickets.length === 0 && <div className="text-gray-500 mt-8">No tickets found for this event.</div>}
      </div>
    </AdminLayout>
  );
} 