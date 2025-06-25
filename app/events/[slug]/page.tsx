'use client'

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Event } from '@/lib/types';
import { Calendar, MapPin } from 'lucide-react';
import PublicEventRegistrationForm from '@/components/forms/PublicEventRegistrationForm';

export default function PublicEventPage() {
  const { slug } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchEvent();
    fetchUser();
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

  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  if (loading) return <div className="text-center py-12">Loading event...</div>;
  if (error || !event) return <div className="text-center text-red-600 py-12">{error || 'Event not found.'}</div>;

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-orange-50/30 px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8">
        <h1 className="text-3xl font-bold mb-2">{event.name}</h1>
        <div className="flex items-center gap-4 text-gray-600 mb-4">
          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {event.date}</span>
          <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {event.venue}</span>
        </div>
        <p className="text-gray-700 mb-6">{event.description}</p>
        <h2 className="text-xl font-semibold mb-4">Register for this event</h2>
        {/* Registration form with auto-fill for logged-in users */}
        <PublicEventRegistrationForm event={event} user={user} />
      </div>
    </main>
  );
} 