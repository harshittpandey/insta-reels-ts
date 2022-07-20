import React, { useEffect, useState } from "react"
import ReelDesc from "./description"
import UserProfile from "../../UserProfile"

import { ReelProp } from "model/type/Reel"

const ReelDescriptionV2: React.FC<ReelProp> = ({reel}) => {
    // const { author,  } = reel || {}
    const [author, setAuthor] = useState(reel.author)

    useEffect(() => {
        setAuthor(reel.author)
    }, [reel.author])

    return (
        <div className="reel-description flex-1 self-end">
            {
                author &&
                (
                    <UserProfile author={author}>
                        <ReelDesc reel={reel} />
                    </UserProfile>
                )
            }
        </div>
    )
}

export default ReelDescriptionV2