import {combineReducers, createStore, applyMiddleware} from 'redux';
import { feedListReducer, TypeFeedListReducer } from './reducers/feedList';
import { typeUserInfoReducer, userInfoReducer } from './reducers/userInfo';
import { bookmarkListReducer, TypeBookmarkListReducer } from './reducers/bookmarkList';

import logger from 'redux-logger'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    userInfo:userInfoReducer,
    feedList:feedListReducer,
    bookmarkList:bookmarkListReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk, logger))

export type RootReducer = {userInfo:typeUserInfoReducer, feedList:TypeFeedListReducer, bookmarkList:TypeBookmarkListReducer};
