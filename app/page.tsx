"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Event } from '@/lib/types';
import { Calendar, MapPin, Ticket, Search, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import Image from 'next/image';
import RootNavbar from '@/components/layout/RootNavbar';
import { useRouter } from 'next/navigation';

const HERO_EVENTS = [
  {
    id: 'h1',
    name: 'Tech Innovators Summit 2025',
    date: '2025-07-10T18:00:00Z',
    venue: 'Grand Hall, Mumbai',
    image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    ticket_price: 1499,
    slug: 'tech-innovators-summit-2025',
  },
  {
    id: 'h2',
    name: 'Summer Music Festival',
    date: '2025-08-05T19:00:00Z',
    venue: 'Open Air Arena, Delhi',
    image_url: 'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=1200&q=80',
    ticket_price: 2499,
    slug: 'summer-music-festival',
  },
  {
    id: 'h3',
    name: 'Startup Pitch Night',
    date: '2025-09-15T17:00:00Z',
    venue: 'Innovation Hub, Bangalore',
    image_url: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80',
    ticket_price: 999,
    slug: 'startup-pitch-night',
  },
];

const CATEGORIES = [
  { name: 'Standup Comedy', color: 'from-purple-500 to-pink-500' },
  { name: 'Music Concerts', color: 'from-indigo-500 to-blue-500' },
  { name: 'Technology', color: 'from-blue-500 to-cyan-500' },
  { name: 'Business', color: 'from-orange-400 to-yellow-500' },
  { name: 'Sports', color: 'from-green-500 to-emerald-500' },
  { name: 'Arts & Culture', color: 'from-pink-500 to-red-400' },
  { name: 'Food & Drink', color: 'from-yellow-400 to-orange-400' },
  { name: 'Education', color: 'from-teal-500 to-blue-400' },
];

const CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
  'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat'
];

const CATEGORY_COLORS = [
  'bg-purple-600', // Standup Comedy
  'bg-indigo-600', // Music Concerts
  'bg-blue-600',   // Technology
  'bg-orange-500', // Business
  'bg-green-600',  // Sports
  'bg-pink-500',   // Arts & Culture
  'bg-yellow-500', // Food & Drink
  'bg-teal-600',   // Education
];

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>('Mumbai');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    let filtered = events;
    if (search) {
      filtered = filtered.filter(e =>
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.venue.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter(e => (e.category || '').toLowerCase() === selectedCategory.toLowerCase());
    }
    setFilteredEvents(filtered);
  }, [search, events, selectedCategory]);

  useEffect(() => {
    const timer = setTimeout(() => setCarouselIndex((carouselIndex + 1) % HERO_EVENTS.length), 5000);
    return () => clearTimeout(timer);
  }, [carouselIndex]);

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

  const goToSlide = (idx: number) => setCarouselIndex((idx + HERO_EVENTS.length) % HERO_EVENTS.length);

  return (
    <>
      <RootNavbar context="public" />
      <main className="w-full min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-orange-50/30">
        {/* Category Bar (transparent, brand blue border/text) */}
        <div className="w-full">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center">
            {/* Left 4 categories */}
            <div className="flex gap-2">
              {CATEGORIES.slice(0, 4).map((category, idx) => (
                <Link
                  key={category.name}
                  href={`/events?category=${encodeURIComponent(category.name)}`}
                  className={`px-4 py-2 rounded-full border border-[#006D92] text-[#006D92] font-semibold text-sm bg-transparent hover:bg-[#006D92]/10 hover:border-[#006D92] transition whitespace-nowrap`}
                >
                  {category.name}
                </Link>
              ))}
            </div>
            {/* Spacer */}
            <div className="flex-1" />
            {/* Right 4 categories */}
            <div className="flex gap-2">
              {CATEGORIES.slice(4, 8).map((category, idx) => (
                <Link
                  key={category.name}
                  href={`/events?category=${encodeURIComponent(category.name)}`}
                  className={`px-4 py-2 rounded-full border border-[#006D92] text-[#006D92] font-semibold text-sm bg-transparent hover:bg-[#006D92]/10 hover:border-[#006D92] transition whitespace-nowrap`}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Hero Carousel */}
        <section className="relative w-full h-[70vh] overflow-hidden">
          {HERO_EVENTS.map((event, idx) => {
            if (idx !== carouselIndex) return null;
            const dateObj = new Date(event.date);
            const dateStr = dateObj.toLocaleDateString('en-IN', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            });
            const timeStr = dateObj.toLocaleTimeString('en-IN', { 
              hour: '2-digit', 
              minute: '2-digit' 
            });
            
            return (
              <div key={event.id} className="absolute inset-0 w-full h-full">
                <Image
                  src={event.image_url}
                  alt={event.name}
                  fill
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                <div className="absolute left-0 top-0 w-full h-full flex items-center">
                  <div className="max-w-2xl ml-16 text-white">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">{event.name}</h1>
                    <div className="flex items-center gap-6 text-xl mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        <span>{dateStr}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        <span>{event.venue}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                        <span className="text-2xl font-bold">₹{event.ticket_price}</span>
                        <span className="text-sm ml-1">per ticket</span>
                      </div>
                      <div className="text-sm text-gray-300">
                        {timeStr} • {event.venue}
                      </div>
                    </div>
                    <Link
                      href={`/events/${event.slug}`}
                      className="inline-block bg-gradient-to-r from-[#006D92] to-[#e28618] text-white font-bold px-8 py-4 rounded-lg text-lg hover:from-[#005a7a] hover:to-[#d17a15] transition"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Carousel Controls */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 transition"
            onClick={() => goToSlide(carouselIndex - 1)}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 transition"
            onClick={() => goToSlide(carouselIndex + 1)}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
          
          {/* Carousel Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {HERO_EVENTS.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full transition-all ${carouselIndex === idx ? 'bg-white' : 'bg-white/40'
                  }`}
                onClick={() => goToSlide(idx)}
              />
            ))}
          </div>
        </section>

        {/* Prominent Search Bar below Hero */}
        <section className="w-full">
          <div className="max-w-2xl mx-auto -mt-12 relative z-10">
            <form
              className="relative shadow-lg rounded-2xl bg-white"
              onSubmit={e => {
                e.preventDefault();
                if (search.trim()) {
                  router.push(`/events?search=${encodeURIComponent(search.trim())}`);
                }
              }}
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#006D92]" />
              <input
                type="text"
                placeholder="Search for events, artists, or venues..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-16 py-4 rounded-2xl border border-gray-200 text-lg focus:outline-none focus:ring-2 focus:ring-[#006D92] focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-[#006D92] text-white font-semibold hover:bg-[#005a7a] transition"
              >
                Search
              </button>
            </form>
          </div>
        </section>

        {/* Events Grid */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {selectedCategory ? `${selectedCategory} Events` : 'Popular Events'}
            </h2>
            <span className="text-gray-600">
              {filteredEvents.length} events found
            </span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-3 bg-gray-200 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-600 mb-4">{error}</div>
              <button
                onClick={fetchEvents}
                className="px-4 py-2 bg-[#006D92] text-white rounded-lg hover:bg-[#005a7a]"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredEvents.map(event => {
                const dateObj = new Date(event.date);
                const dateStr = dateObj.toLocaleDateString('en-IN', {
                  month: 'short',
                  day: 'numeric'
                });
                const timeStr = dateObj.toLocaleTimeString('en-IN', {
                  hour: '2-digit',
                  minute: '2-digit'
                });

                return (
                  <Link
                    key={event.id}
                    href={`/events/${event.slug}`}
                    className="group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={event.image_url || 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80'}
                        alt={event.name}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-sm font-medium">
                        {dateStr}
                      </div>
                      <div className="absolute top-3 right-3 bg-white/90 text-gray-900 px-2 py-1 rounded text-sm font-bold">
                        ₹{event.ticket_price}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#006D92] transition">
                        {event.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span className="line-clamp-1">{event.venue}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{dateStr} • {timeStr}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {!loading && filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-4">No events found</div>
              <button
                onClick={() => setSelectedCategory(null)}
                className="px-4 py-2 bg-[#006D92] text-white rounded-lg hover:bg-[#005a7a]"
              >
                View All Events
              </button>
            </div>
          )}
        </section>

        {/* Location & Category Modal */}
        {showLocationModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
              <h3 className="text-xl font-bold mb-4">Select Your City</h3>
              {/* Cities Section */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Choose Your City</h4>
                <div className="grid grid-cols-2 gap-2">
                  {CITIES.map(city => (
                    <button
                      key={city}
                      onClick={() => setSelectedCity(city)}
                      className={`p-3 rounded-lg border text-left transition ${selectedCity === city
                        ? 'bg-[#006D92]/10 border-[#006D92] text-[#006D92]'
                        : 'border-gray-200 hover:bg-gray-50'
                        }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowLocationModal(false);
                  }}
                  className="flex-1 p-3 bg-[#006D92] text-white rounded-lg hover:bg-[#005a7a] font-medium"
                >
                  Apply
                </button>
                <button
                  onClick={() => {
                    setShowLocationModal(false);
                  }}
                  className="flex-1 p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
