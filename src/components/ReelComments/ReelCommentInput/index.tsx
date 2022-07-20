import React from "react"
import User from "model/type/User"
import ProfileImage from "components/UserProfile/ProfileImage"

const ReelCommentInput: React.FC = () => {
    const myAuthor: User = {
        _id: '124',
        name: 'user 1',
        profileUrl: 'https://rb.gy/34qker',
        following: false,
        follows: []
    }

    const handleCommentPost = () => {
        console.log('post comment')
    }

    return (
        <div className="flex bg-zinc-800 px-2">
            <ProfileImage {...myAuthor} />
            <input
                type="email"
                name="email"
                className="my-2 px-3 py-2 bg-zinc-800 h-10 placeholder-slate-400 focus:outline-none block w-full"
                placeholder="Add a comment..."
            />
            <button className="text-sky-400 text-md self-center" disabled onClick={handleCommentPost}>Post</button>
        </div>
    )
}

export default ReelCommentInput