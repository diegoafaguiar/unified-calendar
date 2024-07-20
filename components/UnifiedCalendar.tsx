import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useCalendarStore } from "../store/calendarStore";

const fetchCalendarEvents = async () => {
  const res = await fetch("/api/calendar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      googleAccessToken: process.env.NEXT_PUBLIC_GOOGLE_ACCESS_TOKEN,
      outlookAccessToken: process.env.NEXT_PUBLIC_OUTLOOK_ACCESS_TOKEN,
    }),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch calendar events");
  }
  return res.json();
};

const UnifiedCalendar: React.FC = () => {
  const { data, error, isLoading } = useQuery(
    "calendarEvents",
    fetchCalendarEvents,
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    }
  );
  const { events, setEvents } = useCalendarStore();

  useEffect(() => {
    if (data) {
      setEvents(data);
    }
  }, [data, setEvents]);

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error loading events:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );

  return (
    <div className="calendar">
      {events.length > 0 ? (
        events.map(
          (
            event: {
              subject: any;
              summary: any;
              start: { dateTime: any; date: any };
              end: { dateTime: any; date: any };
            },
            index: React.Key | null | undefined
          ) => (
            <div key={index} className="event">
              <h3>{event.subject || event.summary}</h3>
              <p>{event.start?.dateTime || event.start?.date}</p>
              <p>{event.end?.dateTime || event.end?.date}</p>
            </div>
          )
        )
      ) : (
        <div>No events found</div>
      )}
    </div>
  );
};

export default UnifiedCalendar;
