import React from "react"
import {CoreIcon} from 'core-ui'

interface AudioProps {
    audio: String,
    audioProfile?: String | null
}

const ReelAudio:React.FC<AudioProps> = ({ audio, audioProfile }) => {
    return (
        <div className="mt-1 text-white flex">
            <CoreIcon icon="MicrophoneIcon" className="w-6 fill-white mr-1" />
            <div className="line-clamp-1 leading-8">
                | {audio}
            </div>
            <span className="flex-1 min-w-fit">
                {
                    audioProfile &&
                    (<img
                        className="w-8 rounded border-2 border-white float-right"
                        src={audioProfile.toString()}
                        alt=""
                    />)
                }
            </span>
        </div>
    )
}

export default ReelAudio
