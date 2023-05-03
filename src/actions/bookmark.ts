import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { BookmarkInfo } from "../@types/BookmarkInfo";
import { RootReducer } from "../store";
import { sleep } from "../utils/utils";

export const GET_BOOKMARK_LIST_REQUEST = 'GET_BOOKMARK_LIST_REQUEST' as const;
export const GET_BOOKMARK_LIST_SUCCESS = 'GET_BOOKMARK_LIST_SUCCESS' as const;
export const GET_BOOKMARK_LIST_FAILURE = 'GET_BOOKMARK_LIST_FAILURE' as const;

export const getBookmarkListRequest = ()=>{
    return {
        type:GET_BOOKMARK_LIST_REQUEST,
    }
}
export const getBookmarkListSuccess = (list:BookmarkInfo[])=>{

    return {
        type:GET_BOOKMARK_LIST_SUCCESS,
        list
    }
}

export const getBookmarkListFailure = ()=>{
    return {
        type:GET_BOOKMARK_LIST_FAILURE
    }
}


export const getBookmarkList = ():BookmarkListThunkAction=> async (dispatch)=>{
    dispatch(getBookmarkListRequest());
// TODO: 서버 api로부터 받아오기, axios
    await sleep(2000)
    dispatch(
        getBookmarkListSuccess([
            {
                id:'ID_01',
                category:'restaurants',
                name:'용용선생1'
            },
            {
                id:'ID_02',
                category:'restaurants',
                name:'용용선생2'
            },
            {
                id:'ID_03',
                category:'restaurants',
                name:'용용선생3'
            },
            {
                id:'ID_04',
                category:'restaurants',
                name:'용용선생4'
            }
        ]
    ))
}



export type BookmarkListThunkAction = ThunkAction<void, RootReducer, undefined, BookmarkListActions>;
export type TypeBookmarkListDispatch = ThunkDispatch<RootReducer, undefined, BookmarkListActions>;
export type BookmarkListActions = 
    | ReturnType<typeof getBookmarkListRequest> 
    | ReturnType<typeof getBookmarkListSuccess>
    | ReturnType<typeof getBookmarkListFailure>;
