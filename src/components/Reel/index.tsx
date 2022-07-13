import React, { useRef, useEffect, useState, RefObject } from 'react'
import ReelVideo from '../ReelVideo'
import ReelHandler from '../ReelHandler'
import ReelCommentLayout from 'components/ReelComments'
import ReelDescription from '../ReelHandler/ReelDescription/layout2'
import {ReelProp} from 'model/type/Reel'
import ReelStyles from './Reel.module.css'

import {IntersectionObserverHandler} from 'core-ui/intersection-observer/v2'

interface reelPropUpdated {
    reelObserver: IntersectionObserverHandler
    isCurrentReel: Boolean
}

const Reel:React.FC<reelPropUpdated & ReelProp> = ({ reel, reelObserver, isCurrentReel }) => {
    const node = useRef<HTMLDivElement>(null)
    const [commentVisible, setCommentVisible] = useState(true)

    useEffect(() => {
        node.current && reelObserver.observeNode(node.current)
    }, [])

    return (
        <div className={`${ReelStyles.reel} w-full h-full`}>
            <span className="absolute text-blue-400 right-0">{'isShown: ' + isCurrentReel}</span>
            <div className={"w-full h-full " + (commentVisible && ReelStyles.videoOnCommentLayout)} >
                <ReelVideo reel={ reel } isCurrentReelVisible={ isCurrentReel } />
                <ReelHandler reel={ reel } isCurrentReelVisible={ isCurrentReel } />
            </div>
            {
                commentVisible &&
                (
                    <div className={"w-full h-full bg-black-200 " + ReelStyles.commentContainer}>
                        <ReelCommentLayout>
                            <ReelDescription reel={reel} />
                            <div className="text-white text-xs ml-12 mt-1">3h</div>
                        </ReelCommentLayout>
                    </div>
                )
            }
            <div id="screenTop" className="-translate-y-2" ref={node} data-reel-id={reel._id}></div>
        </div>
    )
}

export default Reel