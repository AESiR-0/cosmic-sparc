'use client'

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import PublicEventRegistrationForm from '@/components/forms/PublicEventRegistrationForm';

export default function EventRegistrationPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    fetchEvent();
    checkAuth();
  }, [slug]);

  const fetchEvent = async () => {
    setLoading(true);
    setError('');
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('slug', slug)
        .single();
      if (error) throw error;
      setEvent(data);
    } catch (err) {
      setError('Event not found.');
    } finally {
      setLoading(false);
    }
  };

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      // Redirect to login, preserve return URL
      router.replace(`/login?next=/events/${slug}/register`);
    } else {
      setUser(user);
      setAuthChecked(true);
    }
  };

  if (loading || !authChecked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cosmic-blue mb-4" />
        <p className="text-lg text-gray-700">Loading registration...</p>
      </div>
    );
  }
  if (error || !event) return <div className="text-center text-red-600 py-12">{error || 'Event not found.'}</div>;

  // Format date and time
  const dateObj = event.date ? new Date(event.date) : null;
  const dateStr = dateObj ? dateObj.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '';
  const timeStr = dateObj ? dateObj.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }) : '';

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-orange-50/30 px-0 py-0">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Event Summary */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 flex flex-col md:flex-row gap-6 items-center">
          {event.image_url && (
            <img
              src={event.image_url}
              alt={event.name}
              className="w-full md:w-48 h-40 object-cover object-center rounded-lg shadow"
            />
          )}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-1 text-gray-900">{event.name}</h1>
            <div className="flex flex-wrap items-center gap-3 text-gray-600 mb-2">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {dateStr}</span>
              {timeStr && <span className="flex items-center gap-1"><Ticket className="w-4 h-4" /> {timeStr}</span>}
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {event.venue}</span>
              <span className="flex items-center gap-1 text-green-700 font-semibold bg-green-50 px-2 py-0.5 rounded-full"><Ticket className="w-4 h-4" /> ₹{event.ticket_price}</span>
            </div>
            <p className="text-gray-700 text-sm line-clamp-2">{event.description}</p>
          </div>
        </div>
        {/* Registration Form */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Register for this Event</h2>
          <PublicEventRegistrationForm event={event} user={user} />
        </div>
      </div>
    </main>
  );
}
