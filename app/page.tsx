"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Event } from '@/lib/types';
import { Calendar, MapPin } from 'lucide-react';

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    setError('');
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'published')
        .order('date', { ascending: true });
      if (error) throw error;
      setEvents(data || []);
    } catch (err) {
      setError('Failed to load events.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-orange-50/30 px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Discover Events</h1>
      {loading && <div className="text-center">Loading events...</div>}
      {error && <div className="text-center text-red-600">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {events.map(event => (
          <Link key={event.id} href={`/events/${event.slug}`} className="block bg-white rounded-xl shadow hover:shadow-lg border border-gray-100 p-6 transition-all">
            <h2 className="text-xl font-bold mb-2">{event.name}</h2>
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Calendar className="w-4 h-4" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <MapPin className="w-4 h-4" />
              <span>{event.venue}</span>
            </div>
            <p className="text-gray-500 mt-2 line-clamp-2">{event.description}</p>
          </Link>
        ))}
      </div>
      {!loading && events.length === 0 && (
        <div className="text-center text-gray-500 mt-12">No events found.</div>
      )}
    </main>
  );
}
