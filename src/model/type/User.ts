export interface User {
    _id: String
    name: String
    profileUrl: String
    following: Boolean
    follows: String[]
}

export interface UserProp {
    [key: string]: User
}

export default User