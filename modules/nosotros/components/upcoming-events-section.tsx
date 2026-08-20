"use client";

import { useEffect, useState } from "react";
import type { WeddingData } from "@/lib/services";
import {
  formatCoupleEventDate,
  formatEventDaysRemaining,
} from "@/lib/data/utils";

type UpcomingEventsSectionProps = {
  events: WeddingData["upcomingEvents"];
};

export function UpcomingEventsSection({ events }: UpcomingEventsSectionProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(interval);
  }, []);

  const upcoming = now
    ? events.filter(
        (event) => formatEventDaysRemaining(event.date, now) !== null,
      )
    : events;

  if (upcoming.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col gap-6">
      <h2 className="px-1 text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-white/30">
        ❤️ Próximamente
      </h2>

      <div className="flex flex-col gap-8">
        {upcoming.map((event) => {
          const daysLabel = now
            ? formatEventDaysRemaining(event.date, now)
            : null;

          return (
            <article key={event.id} className="flex flex-col gap-2 px-1">
              <h3 className="text-lg font-light tracking-[-0.02em] text-white/85 sm:text-xl">
                <span aria-hidden className="mr-2">
                  {event.icon}
                </span>
                {event.title}
              </h3>

              <p className="text-sm font-light tabular-nums tracking-[-0.01em] text-white/45">
                {formatCoupleEventDate(event.date)}
              </p>

              {daysLabel ? (
                <p className="text-sm font-light tracking-[-0.01em] text-white/35">
                  {daysLabel}
                </p>
              ) : null}

              {event.detail ? (
                <p className="text-sm font-light leading-relaxed tracking-[-0.01em] text-white/30">
                  {event.detail}
                </p>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
