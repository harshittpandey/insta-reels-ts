import React, { useState, useEffect, DOMAttributes } from "react"
import ProfileImage from "./ProfileImage"
import User from "model/type/User"
import API from "api"

import {DEFAULT_STATE_INTERFACE} from 'redux/state'
import { useSelector } from 'react-redux'

interface UserProfile {
    author: User
    hideFollowStatus?: Boolean
}

interface ChildrenProps {
    children?: DOMAttributes<string>
}

const UserProfile: React.FC<React.PropsWithChildren<UserProfile & ChildrenProps>> = ({author, children, hideFollowStatus}) => {
    const currentUser = useSelector((state: DEFAULT_STATE_INTERFACE) => state.currentUser)
    let [_author, setAuthor] = useState<User>(author)
    const [following, setFollowing] = useState<Boolean>(false)

    useEffect(() => {
        if (author && author._id !== author._id) {
            setAuthor(author)
        }
        if (currentUser) {
            const isFollowing =  API.isFollowing(currentUser?._id, _author._id)
            setFollowing(isFollowing)
        }
    }, [author, currentUser])

    return (
        <div className="flex items-center text-md text-white">
            <ProfileImage {..._author} />
            <div className="ml-3 font-medium">
                <div className="flex items-center">
                    {_author.name}
                    {
                        !(hideFollowStatus) && 
                        (
                            <>
                                <span className="mx-2 text-2xl">&#8226;</span>
                                <div className="font-normal text-base">
                                    {following ? 'Following' : 'Follow'}
                                </div>
                            </>
                        )
                    }
                </div>
                <div>
                    { children }
                </div>
            </div>
        </div>
    )
}

export default UserProfile
