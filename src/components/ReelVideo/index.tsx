import React, { useRef, useEffect, useState } from "react"
import {ReelProp} from "model/type/Reel"
import ReactPlayer from "react-player"
import {CoreIcon} from 'core-ui'
import ReelVideoStyles from "./ReelVideo.module.css"

interface updatedProp extends ReelProp {
    isCurrentReelVisible: Boolean
}

const ReelVideo:React.FC<updatedProp> = ({ reel, isCurrentReelVisible }) => {
    const videoPlayer = useRef<HTMLDivElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [muteIconVisible, setMuteIconVisibility] = useState(false)

    useEffect(() => {
        if (isCurrentReelVisible) {
            reel.thumbnail && setThumbnail(reel.thumbnail.toString())
            setSource(reel.source.toString())
        }
        setIsPlaying(!!isCurrentReelVisible)
        setIsMuted(!isCurrentReelVisible)
        const videoHandler = () => {
            if (isCurrentReelVisible) {
                startVideo()
            }
        }
        document.addEventListener('mouseenter', videoHandler)
        return () => {
            document.removeEventListener('mouseenter', videoHandler)
        }
    }, [isCurrentReelVisible])

    const handleVideoClick = () => {
        toggleVideoMute()
        setMuteIconVisibility(true)
        setTimeout(() => setMuteIconVisibility(false), 1000)
    }

    // video controls
    const startVideo = () => setIsPlaying(true)
    const toggleVideo = () => setIsPlaying(!isPlaying)
    const stopVideo = () => setIsPlaying(false)
    // audio controls
    const muteVideo = () => setIsMuted(true)
    const toggleVideoMute = () => setIsMuted(!isMuted)
    const unMuteVideo = () => setIsMuted(false)

    let [source, setSource] = useState('')
    let [thumbnail, setThumbnail] = useState('')

    return (
        <div className="bg-gray-600 w-full h-full" ref={videoPlayer} onClick={handleVideoClick}>
            {/* <span className="absolute top-2 left-2 text-red-800">{reel._id}</span> */}
            {
                muteIconVisible &&
                (
                    <div className="absolute top-2/4 left-0 right-0 flex items-center justify-center">
                        <CoreIcon
                            icon={isMuted ? "VolumeOffIcon" : "VolumeUpIcon"}
                            className={"fill-white opacity-50 rounded-full bg-gray-800 p-6 " + ReelVideoStyles['volume-icon']}
                        />
                    </div>
                )
            }
            {
                !!source ?
                (
                    <ReactPlayer
                        url={source}
                        loop={true}
                        muted={isMuted}
                        playing={isPlaying}
                        className={"object-fill " + ReelVideoStyles['reel-video']}
                    />
                ) :
                (
                    <img
                    className="w-full h-full object-fill"
                    src={thumbnail}
                    />
                )
            }
        </div>
    )
}

export default ReelVideo

// https://frontend-digest.com/responsive-and-progressive-video-loading-in-react-e8753315af51
