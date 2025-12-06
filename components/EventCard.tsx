'use client'

import Image from "next/image";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";
import { SlCalender, SlClock } from "react-icons/sl";

interface Props {
    title: string;
    image: string;
    slug: string;
    location: string;
    date: string;
    time: string;
}

const EventCard = ({ title, image, slug, location, date, time }: Props) => {
    return (
        <Link href={`/events/${slug}`} id="event-card">
            <Image
                src={image}
                alt={title}
                width={410}
                height={300}
                className="poster"
            />
            <div className="flex flex-row gap-2" >
                <FaLocationDot />
                <p>{location}</p>
            </div>
            <p className="title">{title}</p>
            <div className="datetime">
                <div>
                    <SlCalender />
                    <p>{date}</p>
                </div>
                <div>
                    <SlClock />
                    <p>{time}</p>
                </div>
            </div>
        </Link>
    );
};

export default EventCard;
