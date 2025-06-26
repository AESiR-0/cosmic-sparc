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
  const [debugInfo, setDebugInfo] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchAssignedEvents();
  }, []);

  const fetchAssignedEvents = async () => {
    setLoading(true);
    setError("");
    setDebugInfo("");
    
    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      console.log("Auth user:", user);
      console.log("Auth error:", userError);
      
      if (userError || !user) {
        setError("Not authenticated");
        setDebugInfo("No authenticated user found");
        setLoading(false);
        return;
      }

      // Check if user exists in users table
      const { data: userData, error: userDbError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
      
      console.log("User from DB:", userData);
      console.log("User DB error:", userDbError);
      
      if (userDbError) {
        setError("User not found in database");
        setDebugInfo(`User DB error: ${userDbError.message}`);
        setLoading(false);
        return;
      }

      // Fetch events assigned to this ticketeer
      console.log("Fetching events for user:", user.id);
      const { data, error } = await eventTicketeerDb.getTicketeerEvents(user.id);
      console.log("Events data:", data);
      console.log("Events error:", error);
      
      // Test direct query to event_ticketeers table
      const { data: directData, error: directError } = await supabase
        .from('event_ticketeers')
        .select('*')
        .eq('user_id', user.id);
      console.log("Direct event_ticketeers query:", directData);
      console.log("Direct query error:", directError);
      
      if (error) {
        setError(error);
        setDebugInfo(`Events fetch error: ${error}`);
        setLoading(false);
        return;
      }
      
      setEvents(data || []);
      setDebugInfo(`Found ${data?.length || 0} events. Direct query found ${directData?.length || 0} assignments.`);
      setLoading(false);
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Unexpected error occurred");
      setDebugInfo(`Unexpected error: ${err}`);
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  
  return (
    <AdminLayout title="Ticketeer Dashboard">
      <div className="max-w-2xl mx-auto py-6 px-2">
        <h1 className="text-2xl font-bold mb-4">Assigned Events</h1>
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="text-red-800 font-semibold">Error: {error}</div>
            {debugInfo && <div className="text-red-600 text-sm mt-1">{debugInfo}</div>}
          </div>
        )}
        
        {events.length === 0 && !error ? (
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
        
        {debugInfo && !error && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
            Debug: {debugInfo}
          </div>
        )}
      </div>
    </AdminLayout>
  );
} 