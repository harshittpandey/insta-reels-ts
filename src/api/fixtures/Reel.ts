// import Reel from "@/model/type/Reel"
import Videos from "./Reels.json"
import {fetchRandomUser, totalUsers} from "./User"
import Reel from "../../model/type/Reel"

interface ReelResponse {
    _id: String
    source: String
    description: String
    thumbnail: String
}

export default (function () {
    let start: Number = 0
    // implement hasNext here
    const nextReel = (nextCounter: Number): Reel[] => {
        const videos = Videos.videos.slice(+start, (+start) + (+nextCounter))
        start = (+start) + (+nextCounter)
        return videos.map((_video: ReelResponse) => {
            return {
                ..._video,
                author: fetchRandomUser(),
                likes: Math.floor(Math.random() * 10) % totalUsers,
                comments: 0
            }
        });
    }
    const getReelById = (id: String): Reel | undefined => {
        const _video: ReelResponse | undefined = Videos.videos.find(_video => _video._id === id)
        if (_video) {
            return {
                ..._video,
                author: fetchRandomUser(),
                audio: null,
                likes: 0,
                comments: 0
            }
        }
    }
    return {
        nextReel,
        getReelById
    }
})()
