"use client";
import { Calendar, MapPin, Ticket } from "lucide-react";

const attendedEvents = [
  {
    name: "Cosmic Conclave 2025",
    date: "2025-07-28",
    venue: "Rajkot Convention Center, Rajkot",
    ticket: "VIP Pass",
  },
  {
    name: "TechXpo 2025",
    date: "2025-09-02",
    venue: "Vadodara Expo Hall, Vadodara",
    ticket: "General Admission",
  },
];

export default function EventsAttendedPage() {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow border border-gray-100 p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Events You Have Been To</h2>
      {attendedEvents.length === 0 ? (
        <div className="text-gray-500 text-center py-12">You haven't attended any events yet.</div>
      ) : (
        <div className="space-y-6">
          {attendedEvents.map((event, idx) => (
            <div key={idx} className="flex items-center gap-6 p-4 bg-gray-50 rounded-xl">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#006D92] mb-1">{event.name}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {event.venue}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Ticket className="w-4 h-4" />
                  {event.ticket}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 