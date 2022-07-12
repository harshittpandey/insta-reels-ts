import React, { useEffect } from "react"
import ReelActions from "./ReelActions"
import ReelDescription from "./ReelDescription"
import ReelHanlderStyles from "./ReelHandler.module.css"
import ReelAudio from "./ReelDescription/ReelAudio"

import { ReelProp } from "../../model/type/Reel"

interface updatedReelProps extends ReelProp {
    isCurrentReelVisible: Boolean,
    isLikedByMe?: Boolean
}

const ReelHandler: React.FC<updatedReelProps> = ({reel, isCurrentReelVisible, isLikedByMe = true}) => {
    useEffect(() => {
        // console.log(reel.audio)
    }, [])
    return (
        <div className={"reel-handler mx-3 my-3 flex flex-wrap absolute bottom-0 " + ReelHanlderStyles.reelHandler}>
            <ReelDescription reel={reel} />
            <ReelActions isCurrentReelVisible={isCurrentReelVisible} isLikedByMe={isLikedByMe} />
            {
                reel.audio &&
                (
                    <div className="basis-full">
                        <ReelAudio audio={reel.audio} audioProfile={reel.audioProfile} />
                    </div>
                )
            }
        </div>
    )
}

export default ReelHandler