import { IEvent } from "@/database"
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions"
import { cacheLife } from "next/cache"
import Image from "next/image"
import { notFound } from "next/navigation"
import { IconType } from "react-icons"
import { CgProfile } from "react-icons/cg"
import { FaCalendar, FaClock } from "react-icons/fa"
import { FaComputer, FaLocationPin } from "react-icons/fa6"
import BookEvent from "./BookEvent"
import EventCard from "./EventCard"

const EventDetailItem = ({ Icon, alt, label }: { Icon: IconType, alt: string, label: string }) => {
    return (
        <div className="flex flex-row gap-2 items-center">
            {/* <Image src={'/'} alt={alt} width={17} height={17} /> */}
            <Icon aria-description={alt} width={17} height={17} />
            <p>{label}</p>
        </div>
    )
}

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => {
    return (
        <div className="agenda">
            <h2>Agenda</h2>
            <ul>
                {agendaItems.map((item) => (
                    <li key={item} >{item}</li>
                ))}
            </ul>
        </div>
    )
}

const EventTags = ({ tags }: { tags: string[] }) => {
    return (
        <div className="flex flex-row gap-2 flex-wrap">
            {tags.map((tag) => (
                <div className="pill" key={tag}>{tag}</div>
            ))}
        </div>
    )
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
if (!BASE_URL) {
    throw new Error('Please inlcude base url in env file.')
}

const EventDetials = async ({ params }: { params: Promise<string> }) => {
    'use cache'
    cacheLife('minutes')
    const slug = await params

    let event;
    try {
        const request = await fetch(`${BASE_URL}/api/events/${slug}`)
        if (!request.ok) {
            if (request.status === 404) {
                return notFound()
            }
            throw new Error(`Failed to fetch event: ${request.statusText}`)
        }

        const response = await request.json()
        event = response.event

        if (!event) return notFound()
    } catch (error) {
        console.error('Error fetching event:', error)
        return notFound();
    }

    const bookings = 10
    const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug)

    return (
        <section id="event">
            <div className="header">
                <h1>Event Description:</h1>
                <p>{event.description}</p>
            </div>
            <div className="details">
                {/* left side event content */}
                <div className="content">
                    <Image src={event.image} alt='Event Banner' className="banner" width={800} height={800} />
                    <section className="flex-col gap-2">
                        <h2>Overview</h2>
                        <p>{event.overview}</p>
                    </section>
                    <section className="flex flex-col gap-2">
                        <h2>Event Details</h2>
                        <EventDetailItem Icon={FaCalendar} alt='calender' label={event.date} />
                        <EventDetailItem Icon={FaClock} alt='time' label={event.time} />
                        <EventDetailItem Icon={FaLocationPin} alt='pin' label={event.location} />
                        <EventDetailItem Icon={FaComputer} alt='mode' label={event.mode} />
                        <EventDetailItem Icon={CgProfile} alt='audience' label={event.audience} />
                    </section>
                    <EventAgenda agendaItems={event.agenda} />
                    <section className="flex flex-col gap-2">
                        <h2>About the Organizer</h2>
                        <p>{event.organizer}</p>
                    </section>
                    <EventTags tags={event.tags} />
                </div>
                {/* right side booking form */}
                <aside className="booking">
                    <div className="signup-card">
                        <h2>Book Your Spot</h2>
                        {bookings > 0 ? (
                            <p className="text-sm">Join, {bookings} people have already booked their spot!</p>
                        ) : (
                            <p className="text-sm">Be the first to book your spot!</p>
                        )}
                        <BookEvent eventId={event._id.toString()} slug={slug} />
                    </div>
                </aside>
            </div>
            <div className="flex w-full flex-col gap-4 pt-20">
                <h2>Similar Events</h2>
                <div className="events">
                    {similarEvents.length > 0 && similarEvents.map((similarEvent: IEvent) => (
                        <EventCard
                            key={similarEvent.slug}
                            {...similarEvent}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default EventDetials