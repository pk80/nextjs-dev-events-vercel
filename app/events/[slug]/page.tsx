import { Suspense } from "react"

import EventDetials from "@/components/EventDetials"
import {  RouteParams } from "@/lib/constants"

const EventDetailsPage = async ({ params }: RouteParams) => {
    const slug = params.then((p) => p.slug)

    return (
        <section>
            <Suspense fallback={<div>Loading...</div>}>
                <EventDetials params={slug} />
            </Suspense>
        </section>
    )

}

export default EventDetailsPage