import { storageService } from './async-storage.service'
import { showErrorMsg } from './event-bus.service'
import { httpService } from './http.service'
import { utilService } from './util.service'

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
    formatDateForTimeAgo
}

window.userService = userService


function getUsers() {
    // return storageService.query(STORAGE_KEY)
    return httpService.get(`user`)
}



async function getById(userId) {
    // const user = await storageService.get(STORAGE_KEY, userId)
    const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    // return storageService.remove(STORAGE_KEY, userId)
    return httpService.delete(`user/${userId}`)
}

async function update({_id, imgUrl }) {
    // const user = await storageService.get(STORAGE_KEY, _id);

   
    const userToUpdate={_id,imgUrl}
    const user = await httpService.put(`user/${_id}`,userToUpdate);

    // Optionally, update the imgUrl if provided
    // if (imgUrl) {
    //     user.imgUrl = imgUrl;
    // }

    // await storageService.put(STORAGE_KEY, user);
    // await httpService.put(user);


    // const user = await httpService.put(user/${_id}, { _id, score, imgUrl });
    // // Handle the case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user);
    return user;

}

async function login(userCred) {
    console.log('userCred:', userCred)
    
    try {
        // const users = await storageService.query(STORAGE_KEY)
        // const user = users.find(user => user.username === userCred.username)
        const user = await httpService.post('auth/login', userCred)
        console.log('user:', user)
        if (user) {
            return saveLocalUser(user)
        }
        //emitosetchattopic of user id 
    } catch (err) {
        console.log('Had issues in login', err)
        showErrorMsg('Cannot login')
    }
}
async function signup(userCred) {
        // if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
        if (!userCred.imgUrl && userCred.username) {
            userCred.imgUrl = `https://via.placeholder.com/128/A866EC/fff?text=${userCred.username[0].toUpperCase()}`;
        } else if (!userCred.imgUrl) {
            userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png';
        }


        // userCred.score = 10000
        const flag = utilService.makeFlag();
        console.log();
        userCred = {
            _id: userCred._id,
            email: userCred.email,
            username: userCred.username,
            password: userCred.password,
            createdAt:new Date(),
            imgUrl: userCred.imgUrl,
            from: flag[1],
            level: userCred.level,
            store: `@${userCred.username}shop`,
            level: utilService.makeLevel(),
            response: utilService.getRandomIntInclusive(1, 7),
            delivery: utilService.getRandomIntInclusive(1, 14),
            queue: utilService.getRandomIntInclusive(1, 45),
            reviews: utilService.getRandomIntInclusive(150, 450),
            languages: utilService.makeRandomLanguages(),
            aboutMe: utilService.makeRandomUserAbout()
        }
        console.log('userCred:', userCred)
        // const user = await storageService.post(STORAGE_KEY, userCred)
        // const user = await httpService.post('auth/signup', userCred)
        try {
            const registeredUser = await httpService.post(`auth/signup`, userCred)
            console.log('registeredUser:', registeredUser)
            // const user = await storageService.post(STORAGE_KEY, userCred)
            
            if (registeredUser) {
                return saveLocalUser(registeredUser)
            }
        } catch (err) {
            console.log('Had issues in signup', err)
            showErrorMsg('Cannot sign up')
        }
    }

    async function logout() {
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
        return await httpService.post('auth/logout')
    }

    // async function changeScore(by) {
    //     const user = getLoggedinUser()
    //     if (!user) throw new Error('Not loggedin')
    //     user.score = user.score + by || by
    //     await update(user)
    //     return user.score
    // }

    function formatDateForTimeAgo(date) {
        return date.toISOString();
    }
    function saveLocalUser(user) {


        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
        return user
    }

    function getLoggedinUser() {
        return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
    }


    // (async () => {
    //     // await userService.signup({email: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
    //     // await userService.signup({email: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
    //     // await userService.signup({email: 'Muki G', username: 'muki', password:'123', score: 10000})
    // })()



