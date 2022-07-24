import React, { useEffect, useRef } from "react"
import User from "model/type/User"
import ProfileImage from "components/UserProfile/ProfileImage"

interface CommentInputProps {
    addCommentHandler: (comment: string) => void
}

const ReelCommentInput: React.FC<CommentInputProps> = ({ addCommentHandler }) => {

    const myAuthor: User = {
        _id: '124',
        name: 'user 1',
        profileUrl: 'https://rb.gy/34qker',
        following: false,
        follows: []
    }

    // comment input handlers
    const commentInput = useRef<HTMLInputElement>(null)
    const updateCommentInput = (text: string) => (commentInput.current && (commentInput.current.value += text))
    const clearCommentInput = () => (commentInput.current && (commentInput.current.value = ''))
    const focusCommentInput = () => commentInput.current && commentInput.current.focus()
    const postComment = () => {
        if (commentInput.current) {
            addCommentHandler(commentInput.current.value)
            clearCommentInput()
        }
    }

    const handleEmojiSelect = (emoji: string) => {
        updateCommentInput(`${String.fromCodePoint(parseInt (emoji, 16))} `)
        focusCommentInput()
    }

    const handleEnterClick = (e: KeyboardEvent) => (e.keyCode == 13 && postComment())

    useEffect(() => {
        if (commentInput.current) {
            commentInput.current.addEventListener('keydown', handleEnterClick)
        }
        return () => {
            commentInput.current?.removeEventListener('keydown', handleEnterClick)
        }
    }, [commentInput])

    const emojisList = [
        "1F496", // hearts
        "1F64C", // raising hands
        "1F525", // fire
        "1F44F", // claps
        "1F622", // crying face
        "1F60D", // smiling face with heart-eyes
        "1F62E", // face with open mouth
        "1F602" // face with tears of joy
    ]

    return (
        <>
            <div className="text-2xl flex align-center justify-between px-3 py-2 bg-zinc-800 border-b-1 border-zinc-900">
                {
                    emojisList.map(emoji => {
                        return (
                            <span onClick={() => handleEmojiSelect(emoji)}>
                                {String.fromCodePoint(parseInt (emoji, 16))}
                            </span>
                        )
                    })
                }
            </div>
            <div className="flex bg-zinc-800 px-2">
                <ProfileImage {...myAuthor} />
                <input
                    type="text"
                    name="text"
                    ref={commentInput}
                    className="my-2 px-3 py-2 bg-zinc-800 h-10 placeholder-slate-400 focus:outline-none block w-full"
                    placeholder="Add a comment..."
                />
                <button className="text-sky-400 text-md self-center" onClick={postComment}>Post</button>
            </div>
        </>
    )
}

export default ReelCommentInput