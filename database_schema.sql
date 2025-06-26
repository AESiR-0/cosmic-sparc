-- Create event_ticketeers table
CREATE TABLE IF NOT EXISTS event_ticketeers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(event_id, user_id)
);

-- Create registrations table if it doesn't exist
CREATE TABLE IF NOT EXISTS registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    form_data JSONB DEFAULT '{}',
    ticket_id TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'registered' CHECK (status IN ('registered', 'entered')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_event_ticketeers_event_id ON event_ticketeers(event_id);
CREATE INDEX IF NOT EXISTS idx_event_ticketeers_user_id ON event_ticketeers(user_id);
CREATE INDEX IF NOT EXISTS idx_registrations_event_id ON registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_registrations_ticket_id ON registrations(ticket_id);

-- Add RLS policies for event_ticketeers
ALTER TABLE event_ticketeers ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view ticketeer assignments for events they created
CREATE POLICY "Users can view event ticketeers for their events" ON event_ticketeers
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM events 
            WHERE events.id = event_ticketeers.event_id 
            AND events.created_by = auth.uid()
        )
    );

-- Policy: Users can insert ticketeer assignments for events they created
CREATE POLICY "Users can assign ticketeers to their events" ON event_ticketeers
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM events 
            WHERE events.id = event_ticketeers.event_id 
            AND events.created_by = auth.uid()
        )
    );

-- Policy: Users can delete ticketeer assignments for events they created
CREATE POLICY "Users can remove ticketeers from their events" ON event_ticketeers
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM events 
            WHERE events.id = event_ticketeers.event_id 
            AND events.created_by = auth.uid()
        )
    );

-- Policy: Ticketeers can view their own assignments
CREATE POLICY "Ticketeers can view their own assignments" ON event_ticketeers
    FOR SELECT USING (user_id = auth.uid());

-- Add RLS policies for registrations
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view registrations for events they created
CREATE POLICY "Users can view registrations for their events" ON registrations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM events 
            WHERE events.id = registrations.event_id 
            AND events.created_by = auth.uid()
        )
    );

-- Policy: Users can insert registrations for their events
CREATE POLICY "Users can create registrations for their events" ON registrations
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM events 
            WHERE events.id = registrations.event_id 
            AND events.created_by = auth.uid()
        )
    );

-- Policy: Users can update registrations for their events
CREATE POLICY "Users can update registrations for their events" ON registrations
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM events 
            WHERE events.id = registrations.event_id 
            AND events.created_by = auth.uid()
        )
    );

-- Policy: Ticketeers can view registrations for events they're assigned to
CREATE POLICY "Ticketeers can view registrations for assigned events" ON registrations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM event_ticketeers 
            WHERE event_ticketeers.event_id = registrations.event_id 
            AND event_ticketeers.user_id = auth.uid()
        )
    );

-- Policy: Ticketeers can update registrations for events they're assigned to
CREATE POLICY "Ticketeers can update registrations for assigned events" ON registrations
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM event_ticketeers 
            WHERE event_ticketeers.event_id = registrations.event_id 
            AND event_ticketeers.user_id = auth.uid()
        )
    );

-- Policy: Public can insert registrations (for event registration)
CREATE POLICY "Public can register for events" ON registrations
    FOR INSERT WITH CHECK (true); 