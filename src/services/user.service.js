import { storageService } from './async-storage.service'
import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY = 'userDB'


export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
}

window.userService = userService


function getUsers() {
    return storageService.query(STORAGE_KEY)
    // return httpService.get(`user`)
}



async function getById(userId) {
    const user = await storageService.get(STORAGE_KEY, userId)
    // const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    return storageService.remove(STORAGE_KEY, userId)
    // return httpService.delete(`user/${userId}`)
}

async function update({ _id, score, imgUrl }) {
    const user = await storageService.get(STORAGE_KEY, _id);
    user.score = score;

    // Optionally, update the imgUrl if provided
    if (imgUrl) {
        user.imgUrl = imgUrl;
    }

    await storageService.put(STORAGE_KEY, user);

    // const user = await httpService.put(user/${_id}, { _id, score, imgUrl });
    // // Handle the case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user);
    return user;
}

async function login(userCred) {
    const users = await storageService.query(STORAGE_KEY)
    const user = users.find(user => user.username === userCred.username)
    // const user = await httpService.post('auth/login', userCred)
    if (user) {
        return saveLocalUser(user)
    }
}

async function signup(userCred) {
    // if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    // userCred.score = 10000
    const user = await storageService.post(STORAGE_KEY, userCred)
    // const user = await httpService.post('auth/signup', userCred)
    return saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // return await httpService.post('auth/logout')
}

// async function changeScore(by) {
//     const user = getLoggedinUser()
//     if (!user) throw new Error('Not loggedin')
//     user.score = user.score + by || by
//     await update(user)
//     return user.score
// }


function saveLocalUser(user) {
    user = { _id: user._id, email: user.email, userName: user.username, joined: user.createdAt, imgUrl: user.imgUrl }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}


(async () => {
    // await userService.signup({email: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
    // await userService.signup({email: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
    // await userService.signup({email: 'Muki G', username: 'muki', password:'123', score: 10000})
})()



