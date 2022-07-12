import React, { useRef, useEffect, useState, RefObject } from 'react'
import ReelVideo from '../ReelVideo'
import ReelHandler from '../ReelHandler'
import {ReelProp} from 'model/type/Reel'
import ReelStyles from './Reel.module.css'

import {IntersectionObserverHandler} from 'core-ui/intersection-observer/v2'

interface reelPropUpdated {
    reelObserver: IntersectionObserverHandler
    isCurrentReel: Boolean
}

const Reel:React.FC<reelPropUpdated & ReelProp> = ({ reel, reelObserver, isCurrentReel }) => {
    const node = useRef<HTMLDivElement>(null)

    useEffect(() => {
        node.current && reelObserver.observeNode(node.current)
    }, [])

    return (
        <div className={`${ReelStyles.reel} w-full h-full`}>
            <span className="absolute text-blue-400 right-0">{'isShown: ' + isCurrentReel}</span>
            <div className="w-full h-full">
                <ReelVideo reel={ reel } isCurrentReelVisible={ isCurrentReel } />
                <ReelHandler reel={ reel } isCurrentReelVisible={ isCurrentReel } />
            </div>
            <div id="screenTop" className="-translate-y-2" ref={node} data-reel-id={reel._id}></div>
        </div>
    )
}

export default Reel