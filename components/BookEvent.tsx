'use client'

import { useState } from "react"
import { Button } from "./ui/button"
import { createBooking } from "@/lib/actions/booking.actions"

const BookEvent = ({ eventId, slug }: { eventId: string, slug: string }) => {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const { success } = await createBooking({ eventId, slug, email })
        if (success) {
            setSubmitted(true)
            // capture count for bookings
        } else {
            console.error('Booking creation failed')
            // capture exceptions
        }
    }

    return (
        <div id="book-event">
            {submitted ? (
                <p className="text-sm">Thank you for signing up!</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" />
                    </div>
                    <Button type="submit" className="button-submit">Submit</Button>
                </form>
            )}
        </div>
    )
}

export default BookEvent