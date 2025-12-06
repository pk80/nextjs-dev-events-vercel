'use client'

import { Button } from "./ui/button"
import { FaArrowDown } from "react-icons/fa"

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