import create from 'zustand';

interface CalendarState {
  events: any[];
  setEvents: (events: any[]) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  events: [],
  setEvents: (events) => set({ events }),
}));
