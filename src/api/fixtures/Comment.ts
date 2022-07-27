import User from "model/type/User"
import Comment from "../../model/type/Comment"
import {fetchUserById} from "./User"

export const Comments = [
   {
       _id: "01234",
       isPinned: true,
       likes: 234,
       replies: 2,
       reelId: "01234",
       comment: "some content text here",
       author_id: "103547991597142817347"
   },
   {
        _id: "01235",
        isPinned: false,
        likes: 89,
        replies: 0,
        reelId: "01234",
        comment: "second message in comments",
        author_id: "103547991597142817348"
    },
    {
        _id: "01236",
        likes: 10,
        commentId: "01234",
        comment: "reply to first comment",
        author_id: "103547991597142817349"
    },
    {
        _id: "01237",
        likes: 12,
        commentId: "01234",
        comment: "second reply to first comment",
        author_id: "103547991597142817350"
    }
]

interface CommentsResponse {
    _id: String
    isPinned?: Boolean
    likes: Number
    reelId?: String
    comment: String
    author_id: String
}

export default (function () {
    const fetchCommentsByReel = (reelId: String): Comment[] => {
        return Comments.filter(_c => _c.reelId === reelId)
        .map(({_id, isPinned, likes, reelId, comment, author_id}: CommentsResponse) => {
            const author = fetchUserById(author_id) as User
            return {
                _id, isPinned, likes, reelId, comment,
                author
            }
        })
    }
    let _offset = 0
    let _limit = 5
    const fetchReplies = (commentId: String, offset: Number, limit: Number): Comment[] => {
        const comments = Comments
        .filter(_c => _c.commentId === commentId)
        .map(({_id, isPinned, likes, reelId, comment, author_id}: CommentsResponse) => {
            const author = fetchUserById(author_id) as User
            return {
                _id, isPinned, likes, reelId, comment,
                author
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