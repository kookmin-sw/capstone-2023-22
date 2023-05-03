import { BookmarkInfo } from "../@types/BookmarkInfo"
import { BookmarkListActions, GET_BOOKMARK_LIST_SUCCESS } from "../actions/bookmark"


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
    }

    return {
        ...state,
    }
}