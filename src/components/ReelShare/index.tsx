import React, { useEffect, useState } from "react"
import ReelShareStyles from "./ReelShare.module.css"
import { useDispatch } from "react-redux"
import UserProfile from "components/UserProfile"
import User from "model/type/User"
import {LAYOUTS} from 'redux/constant'

import {getFollowings, fetchUserById} from "api/fixtures/User"
import Reel from "api/fixtures/Reel"


interface ReelShareProps {
    author: User
}

const ReelShare:React.FC<ReelShareProps> = ({ author }) => {
    const dispatch = useDispatch()
    const [sentTo, setSentTo] = useState<String[]>([])
    const [following, setFollowing] = useState<(User | null)[]>([])
    useEffect(() => {
        const userId = author._id
        const followings = getFollowings(userId) || []
        const users = followings.map(userId => fetchUserById(userId))
        setFollowing(users)
    }, [author])

    const sendToUser = (userId = "") => {
        const removeFromSentTo = (userId = "") => {
            const idx = sentTo.indexOf(userId)
            if (idx > -1) {
                const _sentTo = [...sentTo]
                _sentTo.splice(idx, 1)
                setSentTo(_sentTo)
            }
        }
        sentTo.includes(userId) ? removeFromSentTo(userId) : setSentTo([...sentTo, userId])
    }

    const closeShareScreen = () => {
        dispatch({
            type: 'UPDATE_LAYOUT',
            value: LAYOUTS.DEFAULT
        })
    }

    return (
        <div className="">
            <div className="fixed inset-0 bg-gray-800 bg-opacity-30 transition-opacity" onClick={closeShareScreen}></div>
            <div className={"absolute z-10 bottom-0 w-screen bg-zinc-700 rounded-t-2xl p-4 " + ReelShareStyles['reel-share-container'] }>
                <UserProfile author={author} hideFollowStatus={true} />
                <input
                    className={"mt-5 placeholder:text-gray-500 placeholder:text-lg text-white block bg-zinc-800 w-full rounded-lg py-2 px-4 focus:outline-none " + ReelShareStyles["reel-share-input"]}
                    placeholder="Search"
                    type="text"
                    name="search"
                ></input>
                <div className="pt-4">
                {
                    following.map(user => (
                        user && (
                            <div className="flex py-3 items-center">
                                <div className="flex flex-1">
                                    <img className="w-10 h-10 rounded-full" src={user.profileUrl + ''} />
                                    <div className="text-sm ml-4">
                                        <p className="text-white">{user.name}</p>
                                        <p className="text-gray-400 font-semibold">{user.username}</p>
                                    </div>
                                </div>
                                <button
                                    className={"text-white text-base py-1 px-3 rounded " + (sentTo.includes(user._id) ? "bg-gray-500 " : "bg-blue-500 ")}
                                    onClick={() => sendToUser(user._id + '')}>
                                    {
                                        sentTo.includes(user._id) ? "Undo" : "Send"
                                    }
                                </button>
                            </div>
                        )
                    ))
                }
                </div>
            </div>
        </div>
    )
}

export default ReelShare