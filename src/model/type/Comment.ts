import User from "./User"

export interface Comment {
    _id: String
    author: User
    isPinned?: Boolean
    likes: Number
    replies?: Number
    reelId?: String
    commentId?: String
    comment: String
}

export default Comment