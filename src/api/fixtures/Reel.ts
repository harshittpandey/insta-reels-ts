// import Reel from "@/model/type/Reel"
import Videos from "./Reels.json"
import {fetchRandomUser, totalUsers, fetchUserById} from "./User"
import { Comments } from "./Comment"
import Reel from "../../model/type/Reel"
import User from "model/type/User"

interface ReelResponse {
    _id: String
    source: String
    description: String
    thumbnail: String
    author_id: String
}

interface ReelStats {
    likes: String[]
    comments: Number
}

export default (function () {
    let start: Number = 0
    // implement hasNext here
    const nextReel = (nextCounter: Number): Reel[] => {
        const videos = Videos.videos.slice(+start, (+start) + (+nextCounter))
        start = (+start) + (+nextCounter)
        return videos.map(({ _id, source, description, thumbnail, author_id }: ReelResponse) => {
            const author = fetchUserById(author_id) as User
            const {likes, comments} = fetchReelStats(_id)
            return {
                _id, source, description, thumbnail,
                author,
                likes, comments
            }
        })
    }
    const getReelById = (id: String): Reel | undefined => {
        const _video: ReelResponse | undefined = Videos.videos.find(_video => _video._id === id)
        if (_video) {
            const { _id, source, description, thumbnail, author_id } = _video
            const author = fetchUserById(author_id) as User
            const {likes, comments} = fetchReelStats(_id)
            return {
                _id, source, description, thumbnail,
                author,
                likes, comments,
                audio: null
            }
        }
    }
    const fetchReelStats = (reelId: String): ReelStats => {
        return {
            likes: [...Array(Math.floor(Math.random() * totalUsers))].map(() => fetchRandomUser()._id),
            comments: Comments.filter(comment => comment.reelId === reelId).length
        }
    }
    return {
        nextReel,
        getReelById
    }
})()
