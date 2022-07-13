export interface User {
    _id: String
    name: String
    profileUrl: String
    following: Boolean
    follows: String[]
}

export interface UserProp {
    author: User
}

export default User