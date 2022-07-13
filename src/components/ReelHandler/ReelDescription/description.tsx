import React, {useState} from "react"

import { ReelProp } from "model/type/Reel"

const ReelDescription: React.FC<ReelProp> = ({reel}) => {
    // const { author,  } = reel || {}
    const [extendedView, setExtendedView] = useState(false)
    const toggleExtendedView = () => setExtendedView(!extendedView)

    return (
        <div
            className={`text-sm text-white ${!extendedView && "line-clamp-1"}`}
            onClick={toggleExtendedView}
            dangerouslySetInnerHTML={{__html: String(reel.description)}}>
        </div>
    )
}

export default ReelDescription
