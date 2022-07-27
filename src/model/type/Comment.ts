import User from "./User"

export interface Comment {
    _id: String
    author: User
    isPinned?: Boolean
    likes: Number
    reelId?: String
    comment: String
    createdOn?: String
}

export default Comment