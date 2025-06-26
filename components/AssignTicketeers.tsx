"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

interface AssignTicketeersProps {
  eventId: string;
}

export default function AssignTicketeers({ eventId }: AssignTicketeersProps) {
  const [email, setEmail] = useState("");
  const [ticketeers, setTicketeers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchTicketeers();
  }, [eventId]);

  const fetchTicketeers = async () => {
    setLoading(true);
    setError("");
    const { data, error } = await supabase
      .from("event_ticketeers")
      .select("id, user:users(email, id)")
      .eq("event_id", eventId);
    if (error) setError(error.message);
    else setTicketeers(data || []);
    setLoading(false);
  };

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    // Check if user exists
    let { data: user, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();
    if (!user) {
      // Auto-create user (email only, role ticketeer)
      const { data: newUser, error: createUserError } = await supabase
        .from("users")
        .insert({ email, role: "ticketeer" })
        .select()
        .single();
      if (createUserError) {
        setError("Failed to create user: " + createUserError.message);
        setLoading(false);
        return;
      }
      user = newUser;
    }
    // Assign ticketeer
    const { error: assignError } = await supabase
      .from("event_ticketeers")
      .insert({ event_id: eventId, user_id: user?.id });
    if (assignError) setError(assignError.message);
    else {
      setSuccess("Ticketeer assigned!");
      setEmail("");
      fetchTicketeers();
    }
    setLoading(false);
  };

  const handleRemove = async (ticketeerId: string) => {
    setLoading(true);
    setError("");
    setSuccess("");
    const { error } = await supabase
      .from("event_ticketeers")
      .delete()
      .eq("id", ticketeerId);
    if (error) setError(error.message);
    else {
      setSuccess("Ticketeer removed.");
      fetchTicketeers();
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleAssign} className="flex gap-2 mb-4">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Ticketeer email"
          required
          className="border rounded px-2 py-1 flex-1"
        />
        <Button type="submit" disabled={loading || !email} className="bg-cosmic-blue text-white">
          Assign
        </Button>
      </form>
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      {success && <div className="text-green-600 text-sm mb-2">{success}</div>}
      <div>
        <h3 className="font-semibold mb-2">Assigned Ticketeers</h3>
        {ticketeers.length === 0 ? (
          <div className="text-gray-500 text-sm">No ticketeers assigned.</div>
        ) : (
          <ul className="space-y-2">
            {ticketeers.map(t => (
              <li key={t.id} className="flex items-center justify-between bg-gray-50 rounded px-3 py-2">
                <span>{t.user?.email}</span>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleRemove(t.id)}
                  disabled={loading}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 