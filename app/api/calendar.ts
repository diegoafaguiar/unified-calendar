import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import { Client } from '@microsoft/microsoft-graph-client';
import { supabase } from '../../lib/supabaseClient';

const getGoogleCalendarEvents = async (accessToken: string) => {
  const calendar = google.calendar({ version: 'v3', auth: accessToken });
  const res = await calendar.events.list({
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  });
  return res.data.items || [];
};

const getOutlookCalendarEvents = async (accessToken: string) => {
  const client = Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    },
  });
  const res = await client
    .api('/me/events')
    .select('subject,start,end')
    .orderby('start/dateTime DESC')
    .top(10)
    .get();
  return res.value || [];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { googleAccessToken, outlookAccessToken } = req.body;

  try {
    const [googleEvents, outlookEvents] = await Promise.all([
      getGoogleCalendarEvents(googleAccessToken),
      getOutlookCalendarEvents(outlookAccessToken),
    ]);

    const events = [...googleEvents, ...outlookEvents];
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch calendar events' });
  }
}
