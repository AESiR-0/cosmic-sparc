import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import { sendRegistrationNotifications } from '@/lib/notifications';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventId, userId, name, email, phone, formData } = body;
    const ticketId = uuidv4();
    // Check for duplicate registration
    if (userId) {
      const { data: existing, error: dupError } = await supabase
        .from('registrations')
        .select('id')
        .eq('event_id', eventId)
        .eq('user_id', userId)
        .single();
      if (existing) {
        return NextResponse.json({ error: 'You are already registered for this event.' }, { status: 400 });
      }
      if (dupError && dupError.code !== 'PGRST116') {
        return NextResponse.json({ error: dupError.message }, { status: 400 });
      }
    }
    // TODO: Generate QR code for ticketId
    const { data, error } = await supabase
      .from('registrations')
      .insert({
        event_id: eventId,
        user_id: userId || null,
        name,
        email,
        phone,
        form_data: formData || {},
        ticket_id: ticketId,
        status: 'registered',
        created_at: new Date().toISOString(),
      })
      .select()
      .single();
    if (error) {
      console.error('Registration insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Fetch the event from the database for notifications
    const { data: eventData, error: eventError } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single();
    if (eventError) {
      console.error('Event fetch error for notification:', eventError);
      return NextResponse.json({ error: eventError.message }, { status: 400 });
    }
    await sendRegistrationNotifications(data, eventData);

    return NextResponse.json({ success: true, ticketId, registration: data });
  } catch (err) {
    return NextResponse.json({ error: 'Registration failed.' }, { status: 500 });
  }
} 