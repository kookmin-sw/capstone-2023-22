import {combineReducers, createStore, applyMiddleware} from 'redux';
import { feedListReducer, TypeFeedListReducer } from './reducers/feedList';
import { typeUserInfoReducer, userInfoReducer } from './reducers/userInfo';
import { bookmarkListReducer, TypeBookmarkListReducer } from './reducers/bookmarkList';

import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { searchReducer, TypeSearchReducer } from './reducers/search';
import { areaMarkerListReducer, TypeAreaMarkerListReducer } from './reducers/areaMarkerList';
import { areaCultureListReducer, TypeAreaCultureListReducer } from './reducers/areaCultureList';

const rootReducer = combineReducers({
    userInfo: userInfoReducer,
    feedList: feedListReducer,
    bookmarkList: bookmarkListReducer,
    search: searchReducer,
    areaMarker: areaMarkerListReducer,
    areaCulture: areaCultureListReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk, logger))

export type RootReducer = {
    userInfo: typeUserInfoReducer,
    feedList: TypeFeedListReducer,
    bookmarkList: TypeBookmarkListReducer,
    search: TypeSearchReducer,
    areaMarker: TypeAreaMarkerListReducer,
    areaCulture: TypeAreaCultureListReducer,
};
