import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { LAYOUTS } from 'redux/constant'
import {CoreIcon} from '../../../core-ui'

interface ActionItemInterface {
    iconEl: JSX.Element | JSX.Element[],
    iconElClicked?: JSX.Element | JSX.Element[],
    statsEl?: JSX.Element | JSX.Element[],
    id: string,
    className: string,
    isActionClickable?: Boolean
    clickCallback: () => void
}

interface ActionProps {
    isCurrentReelVisible: Boolean
    isLikedByMe: Boolean
}

const actionItemGenerator = ({ iconEl, statsEl, id, className, isActionClickable, clickCallback }: ActionItemInterface): JSX.Element => {
    const handleClick = () => isActionClickable && clickCallback()
    return (
        <span id={id} className={className} key={id} onClick={handleClick}>
            {iconEl}{statsEl}
        </span>
    )
}

const ReelActions: React.FC<ActionProps> = ({ isCurrentReelVisible, isLikedByMe }) => {
    const dispatch = useDispatch()
    const handleLikeClick = () => {
        console.log('like clickable')
    }
    const handleCommentClick = () => {
        dispatch({
            type: 'UPDATE_LAYOUT',
            value: LAYOUTS.COMMENT
        })
    }
    const handleShareClick = () => {}
    const actions: {[key: string]: ActionItemInterface} = {
        heart: {
            iconEl: <CoreIcon icon="HeartIcon" outline className="text-white w-9 stroke-1.5" />,
            iconElClicked: <CoreIcon icon="HeartIcon" className="fill-red-600 w-10 h-10" />,
            statsEl: <span className="text-white font-light">{'20'}</span>,
            id: 'heart',
            className: 'flex flex-col items-center py-2',
            clickCallback: handleLikeClick
        },
        comment: {
            iconEl: <CoreIcon icon="ChatIcon" outline className="text-white w-9 py-0 stroke-1.5" />,
            statsEl: <span className="text-white font-light">{'20'}</span>,
            id: 'comment',
            className: 'flex flex-col items-center py-2',
            clickCallback: handleCommentClick
        },
        share: {
            iconEl: <CoreIcon icon="ShareIcon" outline className="text-white w-9 py-2 stroke-1.5" />,
            id: 'share',
            className: 'flex flex-col items-center py-2',
            clickCallback: handleShareClick
        }
    }

    return (
        <div className="reel-actions">
            {/* w-fit mx-3 fixed bottom-0 right-0 */}
            {
                Object.values(actions).map((action: ActionItemInterface) => {
                    if (action.id === 'heart' && isLikedByMe && action.iconElClicked) {
                        action.iconEl = action.iconElClicked
                    }
                    return actionItemGenerator({...action, isActionClickable: isCurrentReelVisible})
                })
            }
            <CoreIcon icon="DotsVerticalIcon" outline className="text-white w-8 py-2 stroke-1" />
        </div>
    )
}

export default ReelActions