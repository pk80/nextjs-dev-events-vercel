import { IEvent } from "@/database"
import { BASE_URL } from "@/lib/constants"
import { cacheLife } from "next/cache"
import { Suspense } from "react"

const EventsPage = async () => {
    'use cache'
    cacheLife('days')
    const response = await fetch(`${BASE_URL}/api/events`)
    const { events } = await response.json()
    const eventKeys = Object.keys(events[0]) as (keyof IEvent)[]

    return (
        <section >
            <h2>EventsPage</h2>
            <p>Filters :</p>
            <p>- order by</p>
            <p>- completed events</p>
            <p>- upcoming events</p>
            <Suspense fallback={<div>Loading...</div>}>
                <div className="text-sm grid grid-cols-5 gap-2 text-center">
                    {eventKeys.map((k, i) => <p className="bg-dark-100 py-2 rounded" key={i}>{k}</p>)}
                </div>
            </Suspense>
        </section>
    )
}

export default EventsPage