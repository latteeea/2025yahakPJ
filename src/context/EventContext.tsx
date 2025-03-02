import React, { createContext, useState } from "react";

export type Event = {
    id: string;
    title: string;
    date: string;
    description?: string; // description 추가
};

export type EventContextType = {
    events: Event[];
    updateEvent: (event: Event) => void;
};

export const EventContext = createContext<EventContextType | null>(null);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [events, setEvents] = useState<Event[]>([
        { id: "1", title: "이벤트1", date: "2025-03-01", description: "첫 번째 이벤트" },
    ]);

    const updateEvent = (updatedEvent: Event) => {
        setEvents((prevEvents) =>
            prevEvents.map((e) => (e.id === updatedEvent.id ? updatedEvent : e))
        );
    };

    return (
        <EventContext.Provider value={{ events, updateEvent }}>
            {children}
        </EventContext.Provider>
    );
};
