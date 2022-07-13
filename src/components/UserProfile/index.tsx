import React, { useState, useEffect, DOMAttributes } from "react"
import ProfileImage from "./ProfileImage"
import User from "model/type/User"
import { UserProp } from "model/type/User"
import API from "api"

interface UserProfile {
    author: User
    showFollowStatus?: Boolean
}

interface ChildrenProps {
    children?: DOMAttributes<string>
}

const UserProfile: React.FC<React.PropsWithChildren<UserProfile & ChildrenProps>> = ({author, children}) => {
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
        <div className="flex items-center text-md text-white">
            <ProfileImage {..._author} />
            <div className="ml-3 font-medium">
                <div className="flex items-center">
                    {_author.name}
                    <span className="mx-2 text-2xl">&#8226;</span>
                    {
                        showFollowStatus && 
                        (
                            <div className="font-normal text-base">
                                {following ? 'Following' : 'Follow'}
                            </div>
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
