import React, { useEffect, useState } from "react"
import UserProfile from "../../UserProfile"

import { ReelProp } from "../../../model/type/Reel"

const ReelDescription: React.FC<ReelProp> = ({reel}) => {
    // const { author,  } = reel || {}
    const [author, setAuthor] = useState(reel.author)
    const [extendedView, setExtendedView] = useState(false)

    const toggleExtendedView = () => setExtendedView(!extendedView)

    useEffect(() => {
        setAuthor(reel.author)
    }, [reel.author])

    return (
        <div className="reel-description flex-1 self-end">
            {   author && (  <UserProfile author={author} /> )  }
            <div
                className={`text-md text-white ${!extendedView && "line-clamp-1"}`}
                onClick={toggleExtendedView}
                dangerouslySetInnerHTML={{__html: String(reel.description)}}>
            </div>
        </div>
    )
}

export default ReelDescription