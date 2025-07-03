"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Event } from '@/lib/types';
import { Calendar, MapPin, Ticket, Search, Star, Users, Music, Camera, Code, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import CategoryBar from '@/components/CategoryBar';

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
  { name: 'Standups', icon: <Users className="w-8 h-8 text-blue-500" />, color: 'bg-blue-50' },
  { name: 'Shows', icon: <Star className="w-8 h-8 text-orange-400" />, color: 'bg-orange-50' },
  { name: 'Concerts', icon: <Music className="w-8 h-8 text-orange-600" />, color: 'bg-orange-100' },
  { name: 'College Events', icon: <Users className="w-8 h-8 text-blue-700" />, color: 'bg-blue-100' },
  { name: 'Outing', icon: <MapPin className="w-8 h-8 text-blue-400" />, color: 'bg-blue-50' },
  { name: 'Techno', icon: <Code className="w-8 h-8 text-blue-700" />, color: 'bg-blue-200' },
  { name: 'Sufi', icon: <Music className="w-8 h-8 text-orange-700" />, color: 'bg-orange-200' },
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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const totalSlides = FEATURED_EVENTS.length;

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    let filtered = events;
    if (search) {
      filtered = filtered.filter(e =>
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.venue.toLowerCase().includes(search.toLowerCase()) ||
        (e.description || '').toLowerCase().includes(search.toLowerCase())
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter(e => (e.category || '').toLowerCase() === selectedCategory.toLowerCase());
    }
    setFilteredEvents(filtered);
  }, [search, events, selectedCategory]);

  useEffect(() => {
    const timer = setTimeout(() => setCarouselIndex((carouselIndex + 1) % totalSlides), 6000);
    return () => clearTimeout(timer);
  }, [carouselIndex, totalSlides]);

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

  const goToSlide = (idx: number) => setCarouselIndex((idx + totalSlides) % totalSlides);

  return (
    <main className="w-full min-h-screen relative px-0 py-0">
      {/* CategoryBar below navbar */}
      <CategoryBar
        categories={CATEGORIES}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      {/* Full-Screen Hero Carousel */}
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        {FEATURED_EVENTS.map((event, idx) => {
          if (idx !== carouselIndex) return null;
          const dateObj = event.date ? new Date(event.date) : null;
          const dateStr = dateObj ? dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : '';
          return (
            <div key={event.id} className="absolute inset-0 w-full h-full">
              <Image
                src={event.image_url}
                alt={event.name}
                fill
                className="object-cover object-center w-full h-full"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
              <div className="absolute left-0 bottom-0 p-8 max-w-xl text-white z-10">
                <h1 className="text-3xl md:text-5xl font-extrabold mb-2 drop-shadow">{event.name}</h1>
                <div className="flex items-center gap-3 text-lg mb-2">
                  <Calendar className="w-5 h-5 text-orange-400" />
                  <span>{dateStr}</span>
                  <MapPin className="w-5 h-5 text-blue-300" />
                  <span>{event.venue}</span>
                </div>
                <div className="flex items-center gap-2 text-orange-300 font-semibold text-lg mb-4">
                  <Ticket className="w-5 h-5" />
                  <span>₹{event.ticket_price}</span>
                </div>
                <Link
                  href={`/events/${event.slug}`}
                  className="inline-block bg-[#FF6F20] hover:bg-[#006D92] text-white font-semibold px-8 py-3 rounded-lg text-lg shadow transition"
                >
                  View Event
                </Link>
              </div>
            </div>
          );
        })}
        {/* Carousel Arrows */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-blue-100 rounded-full p-2 shadow border border-blue-100 z-20"
          onClick={() => goToSlide(carouselIndex - 1)}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-7 h-7 text-[#006D92]" />
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-blue-100 rounded-full p-2 shadow border border-blue-100 z-20"
          onClick={() => goToSlide(carouselIndex + 1)}
          aria-label="Next slide"
        >
          <ChevronRight className="w-7 h-7 text-[#006D92]" />
        </button>
        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {FEATURED_EVENTS.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full ${carouselIndex === idx ? 'bg-[#FF6F20]' : 'bg-white/60'} transition-all`}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#006D92] text-center">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center border border-blue-100">
              <Image src={t.avatar} alt={t.name} width={1000} height={1000} className="w-16 h-16 rounded-full mb-3 object-cover border-2 border-orange-200" />
              <p className="text-[#006D92] italic mb-2">"{t.quote}"</p>
              <span className="font-semibold text-[#006D92]">{t.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Events Grid */}
      <section id="events" className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#006D92]">Upcoming Events</h2>
        {loading && <div className="text-center [#006D92]">Loading events...</div>}
        {error && <div className="text-center text-orange-700">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredEvents.map(event => {
            const dateObj = event.date ? new Date(event.date) : null;
            const dateStr = dateObj ? dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : '';
            const timeStr = dateObj ? dateObj.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }) : '';
            return (
              <div key={event.id} className="bg-white rounded-2xl shadow-lg border border-blue-100 flex flex-col overflow-hidden hover:shadow-2xl transition-all">
                <div className="h-40 w-full bg-blue-100 overflow-hidden">
                  <Image
                    src={event.image_url || PLACEHOLDER_IMAGE}
                    alt={event.name}
                    width={1000}
                    height={1000}
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
          <div className="text-center text-[#006D92] mt-12">No events found.</div>
        )}
      </section>

      {/* Call to Action */}
      <section className="w-full  bg-gradient-to-br from-[#006D92] via-[#BDEDE0] to-[#E28618]  py-16 mt-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to create your own event?</h2>
          <p className="text-lg text-white mb-6">Join hundreds of organizers using Cosmic Sparc to host amazing experiences.</p>
          <Link href="/dashboard/events/create" className="inline-block bg-white text-[#006D92] hover:bg-orange-100 font-semibold px-8 py-3 rounded-lg text-lg shadow transition">Create Event</Link>
        </div>
      </section>
    </main>
  );
}
