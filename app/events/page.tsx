"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import EventCard from "@/components/cards/EventCard";

export default function EventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");
  const [priceFilter, setPriceFilter] = useState<"all" | "free" | "paid">("all");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    setError("");
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });
      if (error) throw error;
      setEvents(data || []);
    } catch (err) {
      setError("Failed to load events.");
    } finally {
      setLoading(false);
    }
  };

  // Filtering logic
  const now = new Date();
  const filteredEvents = events.filter((event) => {
    // Search
    if (
      search &&
      !event.name.toLowerCase().includes(search.toLowerCase()) &&
      !event.venue?.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    // Date filter
    const eventDate = new Date(event.date);
    if (filter === "upcoming" && eventDate < now) return false;
    if (filter === "past" && eventDate >= now) return false;
    // Price filter
    if (priceFilter === "free" && Number(event.ticket_price) > 0) return false;
    if (priceFilter === "paid" && Number(event.ticket_price) === 0) return false;
    return true;
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-orange-50/30 px-0 py-0">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row md:items-end gap-4 mb-10">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search events by name or venue..."
              className="w-full px-6 py-4 rounded-2xl bg-white/60 backdrop-blur border border-blue-100 shadow focus:outline-none focus:ring-2 focus:ring-[#006D92] text-lg placeholder-gray-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              className="px-4 py-2 rounded-xl bg-white/60 border border-blue-100 shadow text-[#006D92]"
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
            >
              <option value="all">All Dates</option>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
            </select>
            <select
              className="px-4 py-2 rounded-xl bg-white/60 border border-blue-100 shadow text-[#006D92]"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value as any)}
            >
              <option value="all">All Prices</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
          </div>
        </div>
        {/* Events Grid */}
        {loading ? (
          <div className="text-center py-20 text-lg text-[#006D92]">Loading events...</div>
        ) : error ? (
          <div className="text-center py-20 text-red-600">{error}</div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No events found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} onView={() => router.push(`/events/${event.slug}`)} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 