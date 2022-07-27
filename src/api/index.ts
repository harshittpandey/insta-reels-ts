import Reel from "../model/type/Reel"
import Comment from "../model/type/Comment"
import ReelsFixture from "./fixtures/Reel"
import CommentsFixture from "./fixtures/Comment"
import {Users, fetchUserById, isFollowing} from "./fixtures/User"
import User from "model/type/User"

export default {
    /**
     * @param nextCounter, fetch next N reels
     * @returns Reel[nextCounter]
     */
    getNextReel: async function (nextCounter:Number = 3): Promise<Reel[]> {
        const reels:Reel[] = ReelsFixture.nextReel(nextCounter)
        return reels
    },

    /**
     * to fetch on demand Reel. 
     * use case = we can save a mapper of reels id that user scrolled.
     * @param reelId
     * @returns Reel
    */
    getReel: async function (reelId: String) {
        return ReelsFixture.getReelById(reelId)
    },

    /**
     * @param reel
     * @returns User[], list of users who liked the reel
    */
    getLikesOnReel: function (reel: Reel) {
        return reel.likes.map(userId => fetchUserById(userId))
    },

    /**
     * @param reel 
     * @returns Comment[], list of floor comments on a reel
     */
    getCommentsOnReel: function (reel: Reel): Comment[] {
        return CommentsFixture.fetchCommentsByReel(reel._id)
    },

    /**
     * @param reelId 
     * @param commentId 
     * @returns Comment[], list of replies on a comment. 
     */
    getCommentReplies: function (reelId = '', commentId: String, offset: Number = 0, limit: Number = 5): Comment[] {
        return CommentsFixture.fetchReplies(commentId, offset, limit)
    },

    getMyUser: function () {
        return fetchUserById(Users[0]._id) as User
    },

    isFollowing: function(myUserId: String, targetUserId: String) {
        const myUser = Users.find(user => user._id === myUserId) as User
        const targetUser = Users.find(user => user._id === targetUserId) as User
        return isFollowing(myUser, targetUser)
    }
}
