import { cacheLife } from "next/cache";

import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/database";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
if (!BASE_URL) {
  throw new Error('Please inlcude base url in env file.')
}

export default async function HomePage() {
  'use cache'
  cacheLife('hours')
  const response = await fetch(`${BASE_URL}/api/events`)
  const { events } = await response.json()

  return (
    <section className="text-center">
      <h1>The Hub for Every Dev<br />Event you can&apos;t miss.</h1>
      <h2 className="mt-5">Welcome to Dev Event Next.js Application!</h2>
      <p className="mt-5">Hackathons, Meetups, and Conferences.<br />All in one place.</p>
      <ExploreBtn />
      <div className="mt-10 space-y-7 text-start">
        <h3>Featured Events</h3>
        {(events && events.length > 0) ? (
          <ul className="events">
            {events && events.length > 0 && events.map((event: IEvent) => (
              <li key={event.slug} className="list-none">
                <EventCard {...event} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No events found!</p>
        )}

      </div>
    </section>
  );
}
