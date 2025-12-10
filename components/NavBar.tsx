'use client'

import Image from 'next/image'
import Link from 'next/link'

const NavBar = () => {
    return (
        <header>
            <nav>
                <Link href={'/'} className='logo'>
                    <Image src='/vercel.svg' alt='logo' width={24} height={24} />
                    <p className='hidden md:block'>DevEvent</p>
                </Link>
                <ul>
                    <Link href={'/'}>Home</Link>
                    <Link href={'/events'}>Events</Link>
                    <Link href={'/events/new'}>Create Event</Link>
                </ul>
            </nav>
        </header>
    )
}

export default NavBar