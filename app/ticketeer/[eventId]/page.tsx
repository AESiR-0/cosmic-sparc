"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Calendar, MapPin, Ticket, CheckCircle, QrCode } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import react-qr-reader to avoid SSR issues
const QrReader = dynamic(
  () => import("react-qr-reader").then(mod => mod.QrReader),
  { ssr: false }
);

export default function TicketeerEventPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState<any>(null);
  const [attendees, setAttendees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [scanMessage, setScanMessage] = useState<string>("");

  useEffect(() => {
    fetchEventAndAttendees();
  }, [eventId]);

  const fetchEventAndAttendees = async () => {
    setLoading(true);
    setError("");
    const { data: eventData, error: eventError } = await supabase
      .from("events")
      .select("*")
      .eq("id", eventId)
      .single();
    if (eventError) {
      setError(eventError.message);
      setLoading(false);
      return;
    }
    setEvent(eventData);
    const { data: attendeeData, error: attendeeError } = await supabase
      .from("registrations")
      .select("*")
      .eq("event_id", eventId);
    if (attendeeError) {
      setError(attendeeError.message);
      setLoading(false);
      return;
    }
    setAttendees(attendeeData);
    setLoading(false);
  };

  const markAsEntered = async (ticketId: string) => {
    await supabase
      .from("registrations")
      .update({ status: "entered" })
      .eq("ticket_id", ticketId);
    setAttendees(prev => prev.map(a => a.ticket_id === ticketId ? { ...a, status: "entered" } : a));
  };

  // Handle QR scan
  const handleScan = async (data: string | null) => {
    if (data && data !== scanResult) {
      setScanResult(data);
      // Find attendee by ticket_id
      const attendee = attendees.find(a => a.ticket_id === data);
      if (attendee) {
        if (attendee.status === "entered") {
          setScanMessage("Ticket already marked as entered.");
        } else {
          await markAsEntered(data);
          setScanMessage(`Success! ${attendee.name} marked as entered.`);
        }
      } else {
        setScanMessage("Ticket not found for this event.");
      }
      // Clear scan result after a short delay
      setTimeout(() => {
        setScanResult(null);
        setScanMessage("");
      }, 2500);
    }
  };

  const handleError = (err: any) => {
    setScanMessage("QR Scanner error: " + err?.message || err);
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (error) return <div className="text-center text-red-600 py-12">{error}</div>;

  return (
    <div className="max-w-md mx-auto py-4 px-2">
      <h1 className="text-xl font-bold mb-2">{event?.name}</h1>
      <div className="flex items-center gap-2 text-gray-600 mb-2">
        <Calendar className="w-4 h-4" />
        <span>{event?.date}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-600 mb-2">
        <MapPin className="w-4 h-4" />
        <span>{event?.venue}</span>
      </div>
      <div className="flex items-center gap-2 text-green-700 mb-4">
        <Ticket className="w-4 h-4" />
        <span>₹{event?.ticket_price}</span>
      </div>
      {/* QR Code Scanner */}
      <div className="bg-gray-100 rounded-xl p-6 flex flex-col items-center mb-6">
        <div className="w-full flex flex-col items-center">
          <QrCode className="w-10 h-10 text-gray-400 mb-2" />
          <div className="w-full max-w-xs">
            <QrReader
              constraints={{ facingMode: "environment" }}
              onResult={(result, error) => {
                if (result?.getText()) handleScan(result.getText());
                if (error) handleError(error);
              }}
            />
          </div>
          {scanMessage && (
            <div className="mt-2 text-center text-sm font-semibold text-blue-700">{scanMessage}</div>
          )}
        </div>
      </div>
      <h2 className="text-lg font-semibold mb-2">Attendees</h2>
      <div className="space-y-2">
        {attendees.map(att => (
          <div key={att.ticket_id} className="flex items-center justify-between bg-white rounded-lg border p-3">
            <div>
              <div className="font-medium">{att.name}</div>
              <div className="text-xs text-gray-500">{att.email}</div>
              <div className="text-xs text-gray-500">{att.ticket_id}</div>
            </div>
            <button
              className={`flex items-center gap-1 px-3 py-1 rounded text-xs font-semibold ${att.status === 'entered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}
              disabled={att.status === 'entered'}
              onClick={() => markAsEntered(att.ticket_id)}
            >
              <CheckCircle className="w-4 h-4" />
              {att.status === 'entered' ? 'Entered' : 'Mark as Entered'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 