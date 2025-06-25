import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import { sendRegistrationNotifications } from '@/lib/notifications';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventId, userId, name, email, phone, formData } = body;
    const ticketId = uuidv4();
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
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    // Send notifications (email/WhatsApp)
    await sendRegistrationNotifications(data, event);

    return NextResponse.json({ success: true, ticketId, registration: data });
  } catch (err) {
    return NextResponse.json({ error: 'Registration failed.' }, { status: 500 });
  }
} 