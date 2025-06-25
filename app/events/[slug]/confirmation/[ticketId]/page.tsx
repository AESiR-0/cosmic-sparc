'use client'

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { QRCode } from 'qrcode.react';

export default function RegistrationConfirmationPage() {
  const { slug, ticketId } = useParams();
  const [registration, setRegistration] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRegistration();
  }, [slug, ticketId]);

  const fetchRegistration = async () => {
    setLoading(true);
    setError('');
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .eq('ticket_id', ticketId)
        .single();
      if (error) throw error;
      setRegistration(data);
    } catch (err) {
      setError('Registration not found.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-12">Loading ticket...</div>;
  if (error || !registration) return <div className="text-center text-red-600 py-12">{error || 'Ticket not found.'}</div>;

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-orange-50/30 px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Registration Confirmed!</h1>
        <p className="mb-2">Thank you, <span className="font-semibold">{registration.name}</span>!</p>
        <p className="mb-2">Your ticket ID:</p>
        <div className="text-lg font-mono bg-gray-100 rounded p-2 mb-4">{registration.ticket_id}</div>
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="font-semibold">Show this QR code at entry:</div>
          <QRCode value={registration.ticket_id} size={160} />
        </div>
        <p className="text-gray-600">Show this page at the event for entry.</p>
      </div>
    </main>
  );
} 