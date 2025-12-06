'use client'

import { FaArrowDown } from "react-icons/fa"

import { Button } from "@/components/ui/button"

const ExploreBtn = () => {
    return (
        <Button
            className="mx-auto mt-7"
            onClick={() => console.log(`Clicked explore btn`)}>
            <a href="#events" className="flex justify-between gap-10">
                Explore Events
                <FaArrowDown />
            </a>
        </Button>
    )
}

export default ExploreBtn