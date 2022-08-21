import React, { useEffect, useState } from "react"
import ReelActions from "./ReelActions"
import ReelDescription from "./ReelDescription"
import ReelHanlderStyles from "./ReelHandler.module.css"
import ReelAudio from "./ReelDescription/ReelAudio"
import {PLACEHOLDER_REEL_ID} from "api/fixtures/Reel"

import { ReelProp } from "../../model/type/Reel"

interface updatedReelProps extends ReelProp {
    isCurrentReelVisible: Boolean
}

const ReelHandler: React.FC<updatedReelProps> = ({reel, isCurrentReelVisible}) => {
    const [showReelHandler, setReelHandleView] = useState(reel._id !== PLACEHOLDER_REEL_ID)
    useEffect(() => {
        setReelHandleView(reel._id !== PLACEHOLDER_REEL_ID)
    }, [reel._id])
    return (
        <>
            {
                showReelHandler &&
                <div className={"reel-handler mx-3 my-3 flex flex-wrap absolute bottom-0 " + ReelHanlderStyles.reelHandler}>
                    <ReelDescription reel={reel} />
                    <ReelActions isCurrentReelVisible={isCurrentReelVisible} reel={reel} />
                    {
                        reel.audio &&
                        (
                            <div className="basis-full">
                                <ReelAudio audio={reel.audio} audioProfile={reel.audioProfile} />
                            </div>
                        )
                    }
                </div>
            }
        </>
    )
}

export default ReelHandler