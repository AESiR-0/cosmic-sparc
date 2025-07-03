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
      {/* Banner Image with Glassy Overlay and Event Badge */}
      {event.image_url && (
        <div className="w-full h-64 md:h-[420px] bg-gray-200 relative overflow-hidden flex items-end">
          <Image
            width={1200}
            height={600}
            src={event.image_url}
            alt={event.name}
            className="w-full h-full object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          {/* Event Badge */}
          <div className="absolute top-6 left-6 bg-white/30 backdrop-blur-md px-4 py-2 rounded-full shadow flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#006D92]" />
            <span className="font-semibold text-[#006D92] text-sm">Featured Event</span>
          </div>
        </div>
      )}
      <div className="max-w-3xl mx-auto px-4 py-8 -mt-28 relative z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 relative border border-blue-100">
          {/* Event Title and Share */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#006D92] drop-shadow mb-2 md:mb-0">{event.name}</h1>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-white/60 hover:bg-blue-50 text-[#006D92] rounded-full shadow border border-blue-100 transition"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: event.name,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Event link copied!');
                }
              }}
              aria-label="Share event"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 8a3 3 0 11-6 0 3 3 0 016 0zm6 8a3 3 0 11-6 0 3 3 0 016 0zm-6 4a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span className="text-sm font-medium">Share</span>
            </button>
          </div>
          {/* Date, Time, Venue, Ticket Price */}
          <div className="flex flex-wrap items-center gap-4 text-[#006D92] mb-6">
            <span className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full text-sm font-medium"><Calendar className="w-5 h-5 text-orange-500" /> {dateStr}</span>
            {timeStr && <span className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full text-sm font-medium"><Ticket className="w-5 h-5 text-orange-500" /> {timeStr}</span>}
            <span className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full text-sm font-medium"><MapPin className="w-5 h-5 text-[#006D92]" /> {event.venue}</span>
            <span className="flex items-center gap-2 bg-gradient-to-r from-[#FF6F20] to-[#E28618] text-white px-4 py-1 rounded-full text-lg font-bold shadow"><Ticket className="w-5 h-5" /> ₹{event.ticket_price}</span>
          </div>
          {/* Description */}
          <p className="text-gray-700 mb-8 whitespace-pre-line text-lg leading-relaxed">{event.description}</p>
          {/* Register Button */}
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