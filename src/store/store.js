import { createStore, combineReducers } from 'redux'

import { gigReducer } from './reducer/gig.reducer.js'
import { userReducer } from './reducer/user.reducer.js'
import { reviewReducer } from './reducer/review.reducer'
import { systemReducer } from './reducer/system.reducer'

const rootReducer = combineReducers({
    gigModule: gigReducer,
    userModule: userReducer,
    systemModule: systemReducer,
    reviewModule: reviewReducer,
})


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)


store.subscribe(() => {
    // console.log('**** Store state changed: ****')
    // console.log('storeState:\n', store.getState())
    // console.log('*******************************')
})



