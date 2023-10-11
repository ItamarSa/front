import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import { userService } from './user.service'

const STORAGE_KEY = 'reviewDB'

export const reviewService = {
  add,
  query,
  remove
}

function query() {
  // var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
  // return httpService.get(`review${queryStr}`)
  return storageService.query(STORAGE_KEY)
}

async function remove(reviewId) {
  // await httpService.delete(`review/${reviewId}`)
  await storageService.remove(STORAGE_KEY, reviewId)
}
function formatDateForTimeAgo(date) {
  return date.toISOString();
}

async function add({txt, starRating }) {
  // const addedReview = await httpService.post(`review`, {txt, aboutUserId})
  
  // const aboutUser = await userService.getById(aboutUserId)

  const reviewToAdd = {
    txt,
     byUser: userService.getLoggedinUser(),
     starRating:starRating,
     createdAt: formatDateForTimeAgo(new Date()),

    // aboutUser: {
    //   _id: aboutUser._id,
    //   fullname: aboutUser.fullname,
    //   imgUrl: aboutUser.imgUrl
    // }
  }

  // reviewToAdd.byUser.score += 10
  // await userService.update(reviewToAdd.txt)
  const addedReview = await storageService.post(STORAGE_KEY, reviewToAdd)
  return addedReview
}