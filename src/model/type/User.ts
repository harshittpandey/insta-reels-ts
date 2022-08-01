export interface User {
    _id: String
    name: String
    username?: String
    profileUrl: String
    followers: String[]
    following: String[]
}

export interface UserProp {
    author: User
}

export default User