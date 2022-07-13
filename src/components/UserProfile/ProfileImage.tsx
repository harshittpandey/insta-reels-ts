import React from "react"
import User from "model/type/User"

interface ProfileImage {
    url: String
    author: String
}

const ProfileImage: React.FC<User> = ({_id, profileUrl}) => {
    return (
        <div className="w-9 h-9 my-2 shrink-0">
            <img src={profileUrl.toString()} alt={_id.toString()} className="w-full h-full rounded-full" />
        </div>
    )
}

export default ProfileImage