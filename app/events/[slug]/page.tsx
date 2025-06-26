'use client'

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import Image from 'next/image';

export default function PublicEventPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    fetchEvent();
  }, [slug]);

  useEffect(() => {
    if (event?.date) {
      const dateObj = new Date(event.date);
      setDateStr(dateObj.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
      setTimeStr(dateObj.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }));
    }
  }, [event?.date]);

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

  if (loading) return <div className="text-center py-12">Loading event...</div>;
  if (error || !event) return <div className="text-center text-red-600 py-12">{error || 'Event not found.'}</div>;

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-orange-50/30 px-0 py-0">
      {/* Banner Image */}
      {event.image_url && (
        <div className="w-full h-64 md:h-96 bg-gray-200 relative overflow-hidden">
          <Image
            width={1000}
            height={1000}
            src={event.image_url}
            alt={event.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}
      <div className="max-w-3xl mx-auto px-4 py-8 -mt-24 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-8 relative">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">{event.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
            <span className="flex items-center gap-1"><Calendar className="w-5 h-5" /> {dateStr}</span>
            {timeStr && <span className="flex items-center gap-1"><Ticket className="w-5 h-5" /> {timeStr}</span>}
            <span className="flex items-center gap-1"><MapPin className="w-5 h-5" /> {event.venue}</span>
            <span className="flex items-center gap-1 text-green-700 font-semibold bg-green-50 px-3 py-1 rounded-full"><Ticket className="w-5 h-5" /> ₹{event.ticket_price}</span>
          </div>
          <p className="text-gray-700 mb-6 whitespace-pre-line">{event.description}</p>
          <button
            className="w-full md:w-auto bg-[#006D92] hover:bg-[#e28618] text-white font-semibold px-8 py-3 rounded-lg text-lg shadow transition"
            onClick={() => router.push(`/events/${event.slug}/register`)}
          >
            Register
          </button>
        </div>
      </div>
    </main>
  );
} 