import React, { useRef, useEffect } from "react"
import ReelCommentLayout from 'components/ReelComments'
import ReelDescription from '../ReelHandler/ReelDescription/layout2'
import ReelCommentChats from 'components/ReelComments/ReelCommentChats'

import {ReelProp} from 'model/type/Reel'

import ReelStyles from "components/Reel/Reel.module.css"

const ReelCommentWrapper:React.FC<ReelProp> = ({reel}) => {
    const reelCommentWrapper = useRef<HTMLDivElement>(null)
    function findAncestor (el: Element | null, cls = "") {
        while ((el = el?.parentElement || null) && !el.classList.contains(cls));
        return el;
    }
    useEffect(() => {
        const ignoreScroll = (e: Event) => {
            const target = e.target as Element
            const parentScrollable = findAncestor(target, "comment-chats")
            if (!parentScrollable) e.preventDefault()
        }
        reelCommentWrapper.current && reelCommentWrapper.current.addEventListener("wheel", ignoreScroll);
    }, [reelCommentWrapper]);

    return (
        <>
            <div ref={reelCommentWrapper} className="">
                <div className="fixed inset-0 bg-gray-800 bg-opacity-0 transition-opacity snap-none"></div>
                <div className={"absolute z-10 w-full h-full bg-black-200 " + ReelStyles.commentContainer}>
                    <ReelCommentLayout>
                        <ReelDescription reel={reel} />
                        <div className="text-white text-xs ml-12 mt-1">3h</div>
                    </ReelCommentLayout>
                    <div className="comment-chats">
                        <ReelCommentChats reel={reel} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReelCommentWrapper