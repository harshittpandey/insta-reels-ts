import React, { DOMAttributes } from "react"
import {CoreIcon} from 'core-ui'
import { useDispatch } from "react-redux"
import { LAYOUTS } from "redux/constant"

interface ChildrenProps {
    children: DOMAttributes<string>
}

const ReelComments: React.FC<React.PropsWithChildren<ChildrenProps>> = ({ children }) => {
    const dispatch = useDispatch()
    const closeComments = () => {
        dispatch({
            type: 'UPDATE_LAYOUT',
            value: LAYOUTS.DEFAULT
        })
    }
    return (
        <div className="comment-container">
            <div className="comment-header text-gray-200 flex items-center py-4 px-4">
                <span className="mr-8" onClick={closeComments}>
                    <CoreIcon icon="ArrowLeftIcon" className="w-6 fill-white" />
                </span>
                <span className="text-xl font-medium flex-1">Comments</span>
                <span>
                    <CoreIcon icon="ShareIcon" outline={true} className="w-7 fill-white" />
                </span>
            </div>
            <div className="px-4 py-3 border-b-1 border-gray-600">
                { children }
            </div>
        </div>
    )
}

export default ReelComments