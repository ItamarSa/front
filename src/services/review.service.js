import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import { userService } from './user.service'

const STORAGE_KEY = 'reviewDB'

export const reviewService = {
  add,
  query,
  remove
}

async function query(filterBy = {}) {
  const reviews = await storageService.query(STORAGE_KEY);

  // Filter reviews by gigId if provided
  if (filterBy.gigId) {
    return reviews.filter((review) => review.gigId === filterBy.gigId);
  }

  return reviews;
}

async function remove(reviewId) {
  // await httpService.delete(`review/${reviewId}`)
  await storageService.remove(STORAGE_KEY, reviewId)
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

  // reviewToAdd.byUser.score += 10
  // await userService.update(reviewToAdd.txt)
  const addedReview = await storageService.post(STORAGE_KEY, reviewToAdd)
  return addedReview
}