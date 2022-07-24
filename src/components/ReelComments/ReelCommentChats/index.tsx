import React, { useState } from "react"
import UserProfile from "components/UserProfile"
import ReelCommentInput from "../ReelCommentInput"
import User from "model/type/User"
import {CoreIcon} from 'core-ui'
import ReelCommentChatStyles from "./ReelCommentChats.module.css"

interface CommentInterface {
    author: User
    text: string
    createdOn: string
    pinned: Boolean
    likes: Number
}

const defaultComments = [
    {
        author: {
            _id: '124',
            name: 'user 1',
            profileUrl: 'https://rb.gy/34qker',
            following: false,
            follows: []
        },
        text: 'some text written here which is not written anywhere.some text written here which is not written anywhere.some text written here which is not written anywhere.some text written here which is not written anywhere.',
        createdOn: '202012121102',
        pinned: false,
        likes: 23
    },
    {
        author: {
            _id: '124',
            name: 'user 1',
            profileUrl: 'https://rb.gy/34qker',
            following: false,
            follows: []
        },
        text: 'some text written here which is not written anywhere.some text written here which is not written anywhere.some text written here which is not written anywhere.some text written here which is not written anywhere.',
        createdOn: '202012121102',
        pinned: false,
        likes: 23
    },
    {
        author: {
            _id: '124',
            name: 'user 1',
            profileUrl: 'https://rb.gy/34qker',
            following: false,
            follows: []
        },
        text: 'some text written here which is not written anywhere.some text written here which is not written anywhere.some text written here which is not written anywhere.some text written here which is not written anywhere.',
        createdOn: '202012121102',
        pinned: false,
        likes: 23
    },
    {
        author: {
            _id: '124',
            name: 'user 1',
            profileUrl: 'https://rb.gy/34qker',
            following: false,
            follows: []
        },
        text: 'some text written here which is not written anywhere.some text written here which is not written anywhere.some text written here which is not written anywhere.some text written here which is not written anywhere.',
        createdOn: '202012121102',
        pinned: false,
        likes: 23
    },
    {
        author: {
            _id: '124',
            name: 'user 1',
            profileUrl: 'https://rb.gy/34qker',
            following: false,
            follows: []
        },
        text: 'some text written here which is not written anywhere.some text written here which is not written anywhere.some text written here which is not written anywhere.some text written here which is not written anywhere.',
        createdOn: '202012121102',
        pinned: false,
        likes: 23
    },
    {
        author: {
            _id: '124',
            name: 'user 1',
            profileUrl: 'https://rb.gy/34qker',
            following: false,
            follows: []
        },
        text: 'some text written here which is not written anywhere.some text written here which is not written anywhere.some text written here which is not written anywhere.some text written here which is not written anywhere.',
        createdOn: '202012121102',
        pinned: false,
        likes: 23
    }
]

const ReelCommentChats: React.FC = () => {
    const [comments, setComments] = useState<CommentInterface[]>(defaultComments)

    const addComment = (comment: string) => {
        const myAuthor: User = {
            _id: '124',
            name: 'user 1',
            profileUrl: 'https://rb.gy/34qker',
            following: false,
            follows: []
        }
        const commentObj = {
            author: myAuthor,
            text: comment,
            createdOn: '',
            pinned: false,
            likes: 0
        }
        setComments((prev) => [commentObj, ...prev])
        console.log('adding comment', comment)
    }

    return (
        <div className={"text-white text-sm absolute overflow-y-auto " + ReelCommentChatStyles['container']}>
            <div className="p-4">
            {
                comments.map((comment: CommentInterface) => (
                    <div className="mb-4">
                        <UserProfile author={comment.author}>
                            {comment.text}
                            <div className="mt-1 text-sm text-gray-500 flex space-x-4">
                                <span>2h</span>
                                {
                                    comment.pinned &&
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
            <div className={"sticky bottom-4 w-full" + ReelCommentChatStyles['comment-input']}>
                <div>
                </div>
                <ReelCommentInput addCommentHandler={addComment} />
            </div>
        </div>
    )
}

export default ReelCommentChats