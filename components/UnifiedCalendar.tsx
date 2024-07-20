import React from 'react';
import { useQuery } from 'react-query';
import { useCalendarStore } from '../store/calendarStore';

const fetchCalendarEvents = async () => {
  const res = await fetch('/api/calendar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      googleAccessToken: 'your-google-access-token',
      outlookAccessToken: 'your-outlook-access-token',
    }),
  });
  if (!res.ok) {
    throw new Error('Failed to fetch calendar events');
  }
  return res.json();
};

const UnifiedCalendar: React.FC = () => {
  const { data, error, isLoading } = useQuery('calendarEvents', fetchCalendarEvents);
  const { events, setEvents } = useCalendarStore();

  React.useEffect(() => {
    if (data) {
      setEvents(data);
    }
  }, [data, setEvents]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading events</div>;

  return (
    <div className="calendar">
      {events.map((event, index) => (
        <div key={index} className="event">
          <h3>{event.subject || event.summary}</h3>
          <p>{event.start.dateTime || event.start.date}</p>
          <p>{event.end.dateTime || event.end.date}</p>
        </div>
      ))}
    </div>
  );
};

export default UnifiedCalendar;
