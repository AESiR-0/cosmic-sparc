"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { eventTicketeerDb } from "@/lib/db";
import AdminLayout from "@/components/layout/AdminLayout";
import { Calendar, MapPin, Ticket } from "lucide-react";

export default function TicketeerPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchAssignedEvents();
  }, []);

  const fetchAssignedEvents = async () => {
    setLoading(true);
    setError("");
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      setError("Not authenticated");
      setLoading(false);
      return;
    }
    // Fetch events assigned to this ticketeer
    const { data, error } = await eventTicketeerDb.getTicketeerEvents(user.id);
    if (error) {
      setError(error);
      setLoading(false);
      return;
    }
    setEvents(data || []);
    setLoading(false);
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (error) return <div className="text-center text-red-600 py-12">{error}</div>;

  return (
    <AdminLayout title="Ticketeer Dashboard">
      <div className="max-w-2xl mx-auto py-6 px-2">
        <h1 className="text-2xl font-bold mb-4">Assigned Events</h1>
        {events.length === 0 ? (
          <div className="text-gray-500">No events assigned yet.</div>
        ) : (
          <div className="space-y-4">
            {events.map(event => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow border p-4 flex flex-col gap-2 cursor-pointer hover:bg-blue-50"
                onClick={() => router.push(`/ticketeer/${event.id}`)}
              >
                <div className="flex items-center gap-2 text-blue-700 font-semibold">
                  <Calendar className="w-4 h-4" />
                  <span>{event.name}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{event.venue}</span>
                </div>
                <div className="flex items-center gap-2 text-green-700 text-sm">
                  <Ticket className="w-4 h-4" />
                  <span>₹{event.ticket_price}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
} 