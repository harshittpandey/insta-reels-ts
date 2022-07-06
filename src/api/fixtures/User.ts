import User from "../../model/type/User"

export const Users: User[] = [
    {
        _id: '103547991597142817347',
        name: 'John Foo',
        profileUrl: 'https://lh4.googleusercontent.com/-OdsbOXom9qE/AAAAAAAAAAI/AAAAAAAAADU/_j8SzYTOJ4I/photo.jpg',
        following: true,
        follows: []
    },
    {
        _id: '103547991597142817348',
        name: 'Michael Dam',
        profileUrl: 'https://rb.gy/rpl1rl',
        following: false,
        follows: []
    },
    {
        _id: '103547991597142817349',
        name: 'Julian Wan',
        profileUrl: 'https://rb.gy/34qker',
        following: false,
        follows: []
    },
    {
        _id: '103547991597142817350',
        name: 'Christopher Campbell',
        profileUrl: 'https://rb.gy/xpc4my',
        following: true,
        follows: []
    },
    {
        _id: '103547991597142817351',
        name: 'Aiony Haust',
        profileUrl: 'https://rb.gy/nohoot',
        follows: [
            "103547991597142817348"
        ],
        following: false
    }
]

export const totalUsers = Users.length

export const fetchRandomUser = (): User => {
    const randomIdx = Math.floor(Math.random() * 10) % (Users.length)
    return Users[randomIdx]
}

export const fetchXRandomUsers = (count: Number): User[] => {
    return [...Array(count)].map((_) => {
        const randomIdx = Math.floor(Math.random() * 10) % (Users.length)
        return Users[randomIdx]
    })
}

export const isFollowing = (user1: User, user2: User): Boolean => {
    return user1.follows.includes(user2._id)
}