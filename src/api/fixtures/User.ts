import User from "../../model/type/User"

interface UserResponse {
    _id: String
    name: String
    username?: String
    profileUrl: String
}

export const Users: UserResponse[] = [
    {
        _id: '103547991597142817347',
        name: 'John Foo',
        username: 'john-foooo',
        profileUrl: 'https://lh4.googleusercontent.com/-OdsbOXom9qE/AAAAAAAAAAI/AAAAAAAAADU/_j8SzYTOJ4I/photo.jpg'
    },
    {
        _id: '103547991597142817348',
        name: 'Michael Dam',
        username: 'michael-ddamn',
        profileUrl: 'https://rb.gy/rpl1rl'
    },
    {
        _id: '103547991597142817349',
        name: 'Julian Wan',
        username: 'julian',
        profileUrl: 'https://rb.gy/34qker'
    },
    {
        _id: '103547991597142817350',
        name: 'Christopher Campbell',
        username: 'chris-campbell',
        profileUrl: 'https://rb.gy/xpc4my'
    },
    {
        _id: '103547991597142817351',
        name: 'Aiony Haust',
        username: '___aiony',
        profileUrl: 'https://rb.gy/nohoot'
    }
]

export const Followings: {[key: string]: String[]} = {
    "103547991597142817351": [
        "103547991597142817347",
        "103547991597142817348",
        "103547991597142817349",
        "103547991597142817350"
    ],
    "103547991597142817350": [
        "103547991597142817347",
        "103547991597142817348",
        "103547991597142817349"
    ],
    "103547991597142817349": [
        "103547991597142817347",
        "103547991597142817348"
    ],
    "103547991597142817348": [
        "103547991597142817347"
    ]
}

export const Followers: {[key: string]: String[]} = {
    "103547991597142817347": [
        "103547991597142817348",
        "103547991597142817349",
        "103547991597142817350",
        "103547991597142817351"
    ],
    "103547991597142817348": [
        "103547991597142817349",
        "103547991597142817350",
        "103547991597142817351"
    ],
    "103547991597142817349": [
        "103547991597142817350",
        "103547991597142817351"
    ],
    "103547991597142817350": [
        "103547991597142817351"
    ],
    "103547991597142817351": []
}

export const totalUsers = Users.length

export const getFollowers = (userId: String): String[] => {
    return Followers[userId + ''] || []
}

export const getFollowings = (userId: String): String[] => {
    return Followings[userId + ''] || []
}

export const fetchUserById = (userId: String): User | null => {
    const user = Users.find(user => user._id === userId)
    if (user) {
        const followers = getFollowers(userId)
        const following = getFollowings(userId)
        return {
            ...user,
            followers,
            following
        }
    }
    return null
}

export const fetchRandomUser = (): User => {
    const randomIdx = Math.floor(Math.random() * 10) % (Users.length)
    const user = Users[randomIdx]
    return {
        ...user,
        followers: getFollowers(user._id),
        following: getFollowings(user._id)
    }
}

export const isFollowing = (user1: User, user2: User): Boolean => {
    return (user1 && user2) ? user1.following?.includes(user2._id) : false
    // return (user1 && user2) ? user1.follows.includes(user2._id) : false
}