import React from 'react'
import {CoreIcon} from '../../../core-ui'

interface ActionItemInterface {
    iconEl: JSX.Element | JSX.Element[],
    statsEl?: JSX.Element | JSX.Element[],
    id: string,
    className: string
}

const actionItemGenerator = ({ iconEl, statsEl, id, className }: ActionItemInterface): JSX.Element => {
    return (
        <span id={id} className={className} key={id}>
            {iconEl}{statsEl}
        </span>
    )
}

const ReelActions: React.FC = () => {
    const actions: {[key: string]: ActionItemInterface} = {
        heart: {
            iconEl: <CoreIcon icon="HeartIcon" outline className="text-white w-9 stroke-1.5" />,
            statsEl: <span className="text-white font-light">{'20'}</span>,
            id: 'heart',
            className: 'flex flex-col items-center py-2'
        },
        comment: {
            iconEl: <CoreIcon icon="ChatIcon" outline className="text-white w-9 py-2 stroke-1.5" />,
            statsEl: <span className="text-white font-light">{'20'}</span>,
            id: 'comment',
            className: 'flex flex-col items-center py-2'
        },
        share: {
            iconEl: <CoreIcon icon="ShareIcon" outline className="text-white w-9 py-2 stroke-1.5" />,
            id: 'share',
            className: 'flex flex-col items-center py-2'
        }
    }
    return (
        <div className="reel-actions">
            {/* w-fit mx-3 fixed bottom-0 right-0 */}
            {
                Object.values(actions).map((action: ActionItemInterface) => actionItemGenerator(action))
            }
            <CoreIcon icon="DotsVerticalIcon" outline className="text-white w-8 py-2 stroke-1" />
        </div>
    )
}

export default ReelActions