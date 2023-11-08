import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import { userService } from './user.service'

const STORAGE_KEY = 'reviewDB'
const BASE_URL = 'review/'

export const reviewService = {
  add,
  query,
  remove
}

async function query(gig = {}) {
  return httpService.get(BASE_URL, gig);
  // const reviews = await httpService.query();

  // // Filter reviews by gigId if provided
  // if (filterBy.gigId) {
  //   return reviews.filter((review) => review.gigId === filterBy.gigId);
  // }

  // return reviews;
}

async function remove(reviewId) {
  // await httpService.delete(`review/${reviewId}`)
  await httpService.remove(BASE_URL, reviewId)
}
function formatDateForTimeAgo(date) {
  return date.toISOString();
}

async function add({txt, starRating,gigId,flag }) {
  // const addedReview = await httpService.post(`review`, {txt, aboutUserId})
  
  // const aboutUser = await userService.getById(aboutUserId)

  const reviewToAdd = {
    txt,
     byUser: userService.getLoggedinUser(),
     starRating:starRating,
     createdAt: formatDateForTimeAgo(new Date()),
     gigId: gigId,
     flag:flag

    // aboutUser: {
    //   _id: aboutUser._id,
    //   fullname: aboutUser.fullname,
    //   imgUrl: aboutUser.imgUrl
    // }
  }
console.log('reviewToAdd:', reviewToAdd)
  // reviewToAdd.byUser.score += 10
  // await userService.update(reviewToAdd.txt)
  const addedReview = await httpService.post(BASE_URL, reviewToAdd)
  return addedReview
}