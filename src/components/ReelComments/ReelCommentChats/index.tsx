import React from "react"
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

const ReelCommentChats: React.FC = () => {
    const comments: CommentInterface[] = [
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
                                <span className="flex">
                                    <CoreIcon icon="FireIcon" className="w-4 fill-gray-300 mr-1" />
                                    Pinned
                                </span>
                                <span> {comment.likes + ' likes'} </span>
                            </div>
                        </UserProfile>
                    </div>
                ))
            }
            </div>
            <div className={"sticky bottom-4 w-full" + ReelCommentChatStyles['comment-input']}>
                <ReelCommentInput />
            </div>
        </div>
    )
}

export default ReelCommentChats