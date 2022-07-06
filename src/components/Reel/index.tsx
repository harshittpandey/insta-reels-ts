import React, { useRef, useEffect, useState, RefObject } from 'react'
import ReelVideo from '../ReelVideo'
import ReelHandler from '../ReelHandler'
import {ReelProp} from 'model/type/Reel'
import ReelStyles from './Reel.module.css'

interface reelPropUpdated {
    reelObserver?: RefObject<IntersectionObserver>
    isCurrentReel: Boolean
}

const Reel:React.FC<reelPropUpdated & ReelProp> = ({ reel, reelObserver, isCurrentReel }) => {
    const node = useRef<HTMLDivElement>(null)
    // const [isCurrentReel, updateisCurrentReel] = useState(false)
    // const observer = useRef<IntersectionObserver>(
        // new window.IntersectionObserver(([entry]) => {
            // console.log(reel, entry.isIntersecting)
            // updateisCurrentReel(entry.isIntersecting)
        // })
    // );

    useEffect(() => {
        if (node.current) {
            if (reelObserver && reelObserver.current) {
                reelObserver.current.observe(node.current)
            }
            // observer.current.observe(node.current)
        }
    }, [])

    return (
        <div className={`${ReelStyles.reel} w-full h-full`}>
            <span className="absolute text-blue-400 right-0">{'isShown: ' + isCurrentReel}</span>
            <ReelVideo reel={ reel } isCurrentReelVisible={ isCurrentReel } />
            <ReelHandler reel={ reel } />
            <div id="screenTop" className="-translate-y-2" ref={node} data-reel-id={reel._id}></div>
        </div>
    )
}

export default Reel