import React, { useRef, useEffect, useState } from "react"
import {ReelProp} from "model/type/Reel"

interface updatedProp extends ReelProp {
    isCurrentReelVisible: Boolean
}

const ReelVideo:React.FC<updatedProp> = ({ reel, isCurrentReelVisible }) => {
    const videoRef = useRef<HTMLVideoElement>(null)

    const isVideoPlaying = (video: HTMLVideoElement) => {
        return !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2)
    }

    const handleVideoClick = () => {
        if (videoRef.current && isCurrentReelVisible) {
            if (isVideoPlaying(videoRef.current)) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
        } else {
            videoRef.current && videoRef.current.pause()
        }
    }

    let [source, setSource] = useState('')
    let [thumbnail, setThumbnail] = useState('')

    useEffect(() => {
        if (isCurrentReelVisible) {
            // setSource(reel.source.toString())
            reel.thumbnail && setThumbnail(reel.thumbnail.toString())
            document.addEventListener('click', () => {
                if (videoRef.current) {
                    videoRef.current.play()
                }
            })
        } else {
            if (videoRef.current) {
                videoRef.current.pause()
            }
        }
    }, [isCurrentReelVisible]);

    return (
        <div className="bg-gray-600 w-full h-full">
            <span className="absolute top-2 left-2 text-red-800">{reel._id}</span>
            {
                !!source ?
                (
                    <video
                        ref={videoRef}
                        autoPlay
                        className="w-full h-full object-fill"
                        src={source}
                        onClick={handleVideoClick}
                        loop
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
