import Image from "next/image"
import { IconType } from "react-icons"
import { notFound } from "next/navigation"
import { CgProfile } from "react-icons/cg"
import { FaCalendar, FaClock } from "react-icons/fa"
import { FaComputer, FaLocationPin } from "react-icons/fa6"

import { IEvent } from "@/database"
import { BASE_URL } from "@/lib/constants"
import BookEvent from "@/components/BookEvent"
import EventCard from "@/components/EventCard"
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions"
import { cacheLife } from "next/cache"

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
            <ul className="list-disc ml-5">
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

const EventAudience = ({ audience }: { audience: string[] }) => {
    return (
        <div className="flex flex-row gap-1 flex-wrap">
            {audience.map((person) => (
                <div className="text-xs bg-dark-100 rounded py-1 px-2" key={person}>{person}</div>
            ))}
        </div>
    )
}


const EventDetials = async ({ params }: { params: Promise<string> }) => {
    'use cache'
    cacheLife('days')
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

    const { description, image, overview, date, time, venue, location, mode, audience, agenda, organizer, tags } = event

    const bookings = 10
    const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug)

    return (
        <section id="event">
            <div className="header">
                <h1>Event Description:</h1>
                <p>{description}</p>
            </div>
            <div className="details">
                {/* left side event content */}
                <div className="content">
                    <Image src={image} alt='Event Banner' className="banner" width={800} height={800} />
                    <section className="flex-col gap-2">
                        <h2>Overview</h2>
                        <p>{overview}</p>
                    </section>
                    <section className="flex flex-col gap-2">
                        <h2>Event Details</h2>
                        <EventDetailItem Icon={FaCalendar} alt='calender' label={date} />
                        <EventDetailItem Icon={FaClock} alt='time' label={time} />
                        <EventDetailItem Icon={FaLocationPin} alt='pin' label={`${venue}, ${location}`} />
                        <EventDetailItem Icon={FaComputer} alt='mode' label={mode} />
                        <div className="flex">
                            <EventDetailItem Icon={CgProfile} alt='audience' label="" />
                            {audience.length > 0
                                ? (<EventAudience audience={audience} />)
                                : (<p>None</p>)
                            }
                        </div>
                    </section>
                    <EventAgenda agendaItems={agenda} />
                    <section className="flex flex-col gap-2">
                        <h2>About the Organizer</h2>
                        <p>{organizer}</p>
                    </section>
                    <EventTags tags={tags} />
                </div >
                {/* right side booking form */}
                < aside className="booking" >
                    <div className="signup-card">
                        <h2>Book Your Spot</h2>
                        {bookings > 0 ? (
                            <p className="text-sm">Join, {bookings} people have already booked their spot!</p>
                        ) : (
                            <p className="text-sm">Be the first to book your spot!</p>
                        )}
                        <BookEvent eventId={event._id.toString()} slug={event.slug} />
                    </div>
                </aside >
            </div >
            {/* left side at down side */}
            {<div className="flex w-full flex-col gap-4 pt-20">
                <h2>Similar Events</h2>
                <div className="events">
                    {similarEvents.length > 0 && similarEvents.map((similarEvent: IEvent) => (
                        <EventCard
                            key={similarEvent.slug}
                            {...similarEvent}
                        />
                    ))}
                </div>
            </div>}
        </section >
    )
}

export default EventDetials