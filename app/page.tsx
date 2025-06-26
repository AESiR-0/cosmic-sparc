"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Event } from '@/lib/types';
import { Calendar, MapPin, Ticket, Search, Star, Users, Music, Camera, Code, Heart } from 'lucide-react';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80';
const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80';

const FEATURED_EVENTS = [
  {
    id: 'f1',
    name: 'Tech Innovators Summit',
    date: '2024-07-10T18:00:00Z',
    venue: 'Grand Hall, City Center',
    image_url: 'https://images.unsplash.com/photo-1515168833906-d2a3b82b3029?auto=format&fit=crop&w=600&q=80',
    ticket_price: 499,
    slug: 'tech-innovators-summit',
  },
  {
    id: 'f2',
    name: 'Summer Music Fest',
    date: '2024-08-05T19:00:00Z',
    venue: 'Open Air Arena',
    image_url: 'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=600&q=80',
    ticket_price: 799,
    slug: 'summer-music-fest',
  },
  {
    id: 'f3',
    name: 'Startup Pitch Night',
    date: '2024-09-15T17:00:00Z',
    venue: 'Innovation Hub',
    image_url: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    ticket_price: 299,
    slug: 'startup-pitch-night',
  },
];

const CATEGORIES = [
  { name: 'Music', icon: <Music className="w-8 h-8 text-orange-500" />, color: 'bg-orange-100' },
  { name: 'Tech', icon: <Code className="w-8 h-8 text-blue-600" />, color: 'bg-blue-100' },
  { name: 'Photography', icon: <Camera className="w-8 h-8 text-orange-400" />, color: 'bg-orange-50' },
  { name: 'Wellness', icon: <Heart className="w-8 h-8 text-blue-400" />, color: 'bg-blue-50' },
  { name: 'Business', icon: <Users className="w-8 h-8 text-blue-700" />, color: 'bg-blue-200' },
  { name: 'Art', icon: <Star className="w-8 h-8 text-orange-700" />, color: 'bg-orange-200' },
];

const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    quote: 'I found my favorite concert here! The ticketing process was seamless and the event was unforgettable.',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    name: 'Rahul Verma',
    quote: 'As an organizer, I love how easy it is to list and manage my events. Highly recommended!',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Aisha Khan',
    quote: 'The discover page is vibrant and makes it easy to find events that match my interests.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
];

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(
        events.filter(e =>
          e.name.toLowerCase().includes(search.toLowerCase()) ||
          e.venue.toLowerCase().includes(search.toLowerCase()) ||
          (e.description || '').toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, events]);

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
      setFilteredEvents(data || []);
    } catch (err) {
      setError('Failed to load events.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-[#006D92] via-[#BDEDE0] to-[#E28618] px-0 py-0">
      {/* Hero Section */}
      <section className="relative w-full h-[340px] md:h-[420px] flex items-center justify-center bg-blue-900">
        <img
          src={HERO_IMAGE}
          alt="Events Hero"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-orange-700/40 to-transparent" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">Discover Amazing Events Near You</h1>
          <p className="text-lg md:text-2xl mb-6 font-medium drop-shadow">Concerts, workshops, meetups, and more. Find your next experience.</p>
          {/* Search & Filters */}
          <section className="max-w-4xl mx-auto px-4  relative z-20">
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-4 border border-blue-100">
              <div className="flex-1 w-full flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-400" />
                <input
                  type="text"
                  placeholder="Search events, venues, or keywords..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full border-none outline-none bg-transparent text-lg px-2 text-blue-900"
                />
              </div>
              {/* Future: Add category/date filters here */}
            </div>
          </section>
          <Link href="#events" className="inline-block mt-10 bg-[#f76e2f] hover:bg-[#006D92] text-white font-semibold px-8 py-3 rounded-lg text-lg shadow transition">Browse Events</Link>
        </div>
      </section>

      {/* Featured Events */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-900 text-center">Featured Events</h2>
        <div className="flex gap-6 overflow-x-auto pb-2 snap-x">
          {FEATURED_EVENTS.map(event => {
            const dateObj = event.date ? new Date(event.date) : null;
            const dateStr = dateObj ? dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : '';
            return (
              <div key={event.id} className="min-w-[320px] max-w-xs bg-white rounded-2xl shadow-lg border border-blue-100 flex flex-col overflow-hidden hover:shadow-2xl transition-all snap-center">
                <div className="h-36 w-full bg-blue-100 overflow-hidden">
                  <img
                    src={event.image_url}
                    alt={event.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold mb-1 text-blue-900 line-clamp-1">{event.name}</h3>
                  <div className="flex items-center gap-2 text-blue-700 text-sm mb-1">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    <span>{dateStr}</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-700 text-sm mb-1">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span className="line-clamp-1">{event.venue}</span>
                  </div>
                  <div className="flex items-center gap-2 text-orange-700 font-semibold text-sm mb-2">
                    <Ticket className="w-4 h-4 text-orange-500" />
                    <span>₹{event.ticket_price}</span>
                  </div>
                  <Link
                    href={`/events/${event.slug}`}
                    className="mt-auto inline-block w-full bg-[#006D92] hover:bg-[#EF7B45] text-white font-semibold px-4 py-2 rounded-lg text-center transition"
                  >
                    View Event
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-900 text-center">Popular Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {CATEGORIES.map(cat => (
            <div key={cat.name} className={`flex flex-col items-center justify-center rounded-xl p-6 shadow bg-white hover:shadow-lg transition border border-blue-100 ${cat.color}`}>
              {cat.icon}
              <span className="mt-2 font-semibold text-blue-900 text-lg">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-900 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center border border-blue-100">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-orange-100 mb-4">
              <Search className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-blue-900">1. Discover</h3>
            <p className="text-blue-700">Browse and search for events that match your interests, from music to tech and more.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center border border-blue-100">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 mb-4">
              <Ticket className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-blue-900">2. Register</h3>
            <p className="text-blue-700">Sign up for events easily and securely. Get your tickets instantly after registration.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center border border-blue-100">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-orange-100 mb-4">
              <Users className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-blue-900">3. Attend & Enjoy</h3>
            <p className="text-blue-700">Show your ticket at the event and have a great time! Share your experience with friends.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-900 text-center">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center border border-blue-100">
              <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full mb-3 object-cover border-2 border-orange-200" />
              <p className="text-blue-700 italic mb-2">"{t.quote}"</p>
              <span className="font-semibold text-blue-900">{t.name}</span>
            </div>
          ))}
        </div>
      </section>



      {/* Events Grid */}
      <section id="events" className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-900">Upcoming Events</h2>
        {loading && <div className="text-center text-blue-700">Loading events...</div>}
        {error && <div className="text-center text-orange-700">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredEvents.map(event => {
            const dateObj = event.date ? new Date(event.date) : null;
            const dateStr = dateObj ? dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : '';
            const timeStr = dateObj ? dateObj.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }) : '';
            return (
              <div key={event.id} className="bg-white rounded-2xl shadow-lg border border-blue-100 flex flex-col overflow-hidden hover:shadow-2xl transition-all">
                <div className="h-40 w-full bg-blue-100 overflow-hidden">
                  <img
                    src={event.image_url || PLACEHOLDER_IMAGE}
                    alt={event.name}
                    className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-1 text-[#006D92] line-clamp-1">{event.name}</h3>
                  <div className="flex items-center gap-2 text-[#006D92] text-sm mb-1">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    <span>{dateStr} {timeStr && `• ${timeStr}`}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#006D92] text-sm mb-1">
                    <MapPin className="w-4 h-4 text-[#006D92]" />
                    <span className="line-clamp-1">{event.venue}</span>
                  </div>
                  <div className="flex items-center gap-2 text-orange-700 font-semibold text-sm mb-2">
                    <Ticket className="w-4 h-4 text-orange-500" />
                    <span>₹{event.ticket_price}</span>
                  </div>
                  <p className="text-[#006D92] text-sm mb-4 line-clamp-2 flex-1">{event.description}</p>
                  <Link
                    href={`/events/${event.slug}`}
                    className="mt-auto inline-block w-full bg-[#006D92] hover:bg-[#EF7B45] text-white font-semibold px-4 py-2 rounded-lg text-center transition"
                  >
                    View Event
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        {!loading && filteredEvents.length === 0 && (
          <div className="text-center text-[#1d375e] mt-12">No events found.</div>
        )}
      </section>

      {/* Call to Action */}
      <section className="w-full bg-gradient-to-r from-[#006D92] to-[#EF7B45] py-16 mt-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to create your own event?</h2>
          <p className="text-lg text-white mb-6">Join hundreds of organizers using Cosmic Sparc to host amazing experiences.</p>
          <Link href="/dashboard/events/create" className="inline-block bg-white text-[#1d375e] hover:bg-orange-100 font-semibold px-8 py-3 rounded-lg text-lg shadow transition">Create Event</Link>
        </div>
      </section>
    </main>
  );
}
