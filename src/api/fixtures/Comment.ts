import Comment from "../../model/type/Comment"
import {fetchRandomUser} from "./User"

const Comments = [
   {
       _id: "01234",
       isPinned: true,
       likes: 234,
       replies: 2,
       reelId: "01234",
       comment: "some content text here"
   },
   {
        _id: "01235",
        isPinned: false,
        likes: 89,
        replies: 0,
        reelId: "01234",
        comment: "second message in comments"
    },
    {
        _id: "01236",
        likes: 10,
        commentId: "01234",
        comment: "reply to first comment"
    },
    {
        _id: "01237",
        likes: 12,
        commentId: "01234",
        comment: "second reply to first comment"
    }
]

interface CommentsResponse {
    _id: String
    isPinned?: Boolean
    likes: Number
    replies?: Number
    reelId?: String
    commentId?: String
    comment: String
}

export default (function () {
    const fetchCommentsByReel = (reelId: String): Comment[] => {
        return Comments.filter(_c => _c.reelId === reelId).map((_c: CommentsResponse) => {
            return {
                ..._c,
                author: fetchRandomUser()
            }
        })
    }
    let _offset = 0
    let _limit = 5
    const fetchReplies = (commentId: String, offset: Number, limit: Number): Comment[] => {
        const comments = Comments.filter(_c => _c.commentId === commentId).map((_c: CommentsResponse) => {
            return {
                ..._c,
                author: fetchRandomUser()
            }
        })
        if (offset > comments.length) return []
        _offset = +offset
        _limit = +limit
        return comments.slice(_offset, _offset + _limit)
    }
    return {
        fetchCommentsByReel,
        fetchReplies
    }
})()