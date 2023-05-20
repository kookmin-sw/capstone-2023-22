import { BookmarkInfo } from "../@types/BookmarkInfo"
import { BookmarkListActions, GET_BOOKMARK_LIST_SUCCESS, POST_BOOKMARK_SUCCESS } from "../actions/bookmark"


export type TypeBookmarkListReducer ={
    bookmarkList:BookmarkInfo[]
}
const defaultBookmarkListState:TypeBookmarkListReducer = {
    bookmarkList:[]
}

export const bookmarkListReducer = (state:TypeBookmarkListReducer = defaultBookmarkListState, action:BookmarkListActions)=>{
    switch(action.type){
        case GET_BOOKMARK_LIST_SUCCESS:{
            return {
                ...state,
                bookmarkList: action.list
            }
        }
        case POST_BOOKMARK_SUCCESS: {
            if (state.bookmarkList.some(item => item.placeId === action.bookmarkInfo.placeId)){
                return {
                    ...state
                }
            }
            return {
                ...state,
                bookmarkList: [action.bookmarkInfo, ...state.bookmarkList]
            }
        }
    }

    return {
        ...state,
    }
}