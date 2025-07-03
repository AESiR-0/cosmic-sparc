import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Calendar, MapPin, Ticket, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function UserDashboard() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    setLoading(true);
    setError('');
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      setError('Not authenticated');
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*, event:events(*)')
        .eq('user_id', user.id);
      if (error) throw error;
      setRegistrations(data || []);
    } catch (err) {
      setError('Failed to load registrations.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto py-8 px-2">
      <h1 className="text-2xl font-bold mb-6">My Tickets</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div className="space-y-4">
        {registrations.map(reg => (
          <div key={reg.id} className="bg-white rounded-lg border p-4 flex items-center justify-between">
            <div>
              <div className="font-semibold">{reg.event?.name}</div>
              <div className="text-xs text-gray-500">{reg.event?.venue}</div>
              <div className="text-xs text-gray-500">Ticket ID: {reg.ticket_id}</div>
            </div>
            <div className="flex items-center gap-2">
              {reg.status === 'entered' ? (
                <span className="flex items-center gap-1 text-green-700 font-semibold"><CheckCircle className="w-4 h-4" /> Checked In</span>
              ) : (
                <span className="flex items-center gap-1 text-orange-600 font-semibold"><XCircle className="w-4 h-4" /> Not Checked In</span>
              )}
              <Link href={`/events/${reg.event?.slug}/ticket/${reg.ticket_id}`} className="ml-4 text-blue-700 underline">View Ticket</Link>
            </div>
          </div>
        ))}
      </div>
      {!loading && registrations.length === 0 && <div className="text-gray-500 mt-8">You have not registered for any events yet.</div>}
    </main>
  );
} 