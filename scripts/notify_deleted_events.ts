// scripts/notify_deleted_events.ts
import { supabase } from '@/lib/supabase';
import { notifyRegistrantsOfDeletedEvent } from '@/lib/notifications';

// This script should be run as a daily cron job (e.g., with Vercel Cron or GitHub Actions)
// It finds events soft-deleted more than 2 days ago and notifies all registrants

async function main() {
  const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();
  // Find events with deleted_at older than 2 days
  const { data: events, error } = await supabase
    .from('events')
    .select('*')
    .not('deleted_at', 'is', null)
    .lt('deleted_at', twoDaysAgo);
  if (error) {
    console.error('Error fetching deleted events:', error);
    return;
  }
  for (const event of events || []) {
    // Fetch all registrants for this event
    const { data: registrants, error: regError } = await supabase
      .from('registrations')
      .select('*')
      .eq('event_id', event.id);
    if (regError) {
      console.error(`Error fetching registrants for event ${event.id}:`, regError);
      continue;
    }
    if (registrants && registrants.length > 0) {
      console.log(`Notifying ${registrants.length} registrants for deleted event ${event.name}`);
      await notifyRegistrantsOfDeletedEvent(event, registrants);
    }
  }
}

// Run the script if called directly
if (require.main === module) {
  main().then(() => process.exit(0));
} 