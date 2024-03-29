import User from "./User"

export interface Reel {
    _id: String
    author: User
    source: String
    audio?: String | null
    audioProfile?: String | null
    thumbnail: String | null
    description: String
    likes: String[] // user ids
    comments: Number
}

export interface ReelProp {
    reel: Reel
}

export default Reel

