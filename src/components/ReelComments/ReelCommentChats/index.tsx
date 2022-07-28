import React, { useEffect, useState } from "react"
import UserProfile from "components/UserProfile"
import ReelCommentInput from "../ReelCommentInput"
import User from "model/type/User"
import Comment from "model/type/Comment"
import { ReelProp } from "model/type/Reel"
import {CoreIcon} from 'core-ui'
import ReelCommentChatStyles from "./ReelCommentChats.module.css"

import API from "api"

interface CommentInterface {
    author: User
    text: string
    createdOn: string
    pinned: Boolean
    likes: Number
}

const ReelCommentChats: React.FC<ReelProp> = ({ reel }) => {
    const [comments, setComments] = useState<Comment[]>([])

    useEffect(() => {
        setComments(API.getCommentsOnReel(reel))
    }, [reel])

    const addComment = (comment: string) => {
        const author: User = API.getMyUser() as User
        const commentObj = {
            _id: Math.random().toString(16).slice(2),
            author,
            isPinned: false,
            likes: 0,
            comment,
            createdOn: "20221121"
        }
        setComments((prev) => [commentObj, ...prev])
        console.log('adding comment', comment)
    }

    return (
        <div className={"text-white text-sm absolute overflow-y-auto w-full relative " + ReelCommentChatStyles['container']}>
            <div className="p-4">
            {
                comments.map((comment: Comment) => (
                    <div className="mb-4">
                        <UserProfile author={comment.author}>
                            {comment.comment}
                            <div className="mt-1 text-sm text-gray-500 flex space-x-4">
                                <span>2h</span>
                                {
                                    comment.isPinned &&
                                    <span className="flex">
                                        <CoreIcon icon="FireIcon" className="w-4 fill-gray-300 mr-1" />
                                        Pinned
                                    </span>
                                }
                                {
                                    comment.likes > 0 &&
                                    <span> {comment.likes + ' likes'} </span>
                                }
                            </div>
                        </UserProfile>
                    </div>
                ))
            }
            </div>
            <div className={"absolute bottom-20 w-full " + ReelCommentChatStyles['comment-input']}>
                <div>
                </div>
                <ReelCommentInput addCommentHandler={addComment} />
            </div>
        </div>
    )
}

export default ReelCommentChats