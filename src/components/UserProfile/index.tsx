import React, { useState, useEffect } from "react"
import ProfileImage from "./ProfileImage"
import User from "model/type/User"
import { UserProp } from "model/type/User"
import API from "api"

interface UserProfile {
    author?: User
    showFollowStatus?: Boolean
}

const UserProfile: React.FC<UserProp> = ({author}) => {
    const showFollowStatus = true
    let [_author, setAuthor] = useState<User>(author)
    const [following, setFollowing] = useState<Boolean>(API.isFollowing('103547991597142817351', author._id))

    useEffect(() => {
        if (author && author._id !== author._id) {
            setAuthor(author)
        }
        const isFollowing =  API.isFollowing('103547991597142817351', author._id)
        setFollowing(isFollowing)
    }, [author])

    return (
        <div className="flex items-center text-lg text-white">
            <ProfileImage {..._author} />
            <div className="ml-3 font-medium">{_author.name}</div>
            <span className="mx-2 text-2xl">&#8226;</span>
            {
                showFollowStatus && 
                (
                    <div className="font-normal">
                        {following ? 'Following' : 'Follow'}
                    </div>
                )
            }
        </div>
    )
}

export default UserProfile
