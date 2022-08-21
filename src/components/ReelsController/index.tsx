import React from 'react';
import {CoreIcon} from '../../core-ui'

interface ReelsControllerProps {
    isPlaceholder: Boolean
}

const ReelsController:React.FC<ReelsControllerProps> = ({isPlaceholder}) => {
    return (
        <>
        {
            !isPlaceholder &&
            <div className="flex px-4 py-4 absolute w-full z-10">
                <CoreIcon icon="ArrowLeftIcon" className="w-6 fill-white" />
                <p className="ml-6 text-xl text-white flex-1">Reels</p>
                <CoreIcon icon="CameraIcon" outline className="w-7 stroke-white" />
            </div>
        }
        </>
    )
}

export default ReelsController