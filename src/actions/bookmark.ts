import axios from "axios";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { BookmarkInfo } from "../@types/BookmarkInfo";
import { RootReducer } from "../store";
import qs from 'qs';
import { sleep } from "../utils/utils";
import { Config } from "../config";

export const GET_BOOKMARK_LIST_REQUEST = 'GET_BOOKMARK_LIST_REQUEST' as const;
export const GET_BOOKMARK_LIST_SUCCESS = 'GET_BOOKMARK_LIST_SUCCESS' as const;
export const GET_BOOKMARK_LIST_FAILURE = 'GET_BOOKMARK_LIST_FAILURE' as const;

export const POST_BOOKMARK_REQUEST = 'POST_BOOKMARK_REQUEST' as const;
export const POST_BOOKMARK_SUCCESS = 'POST_BOOKMARK_SUCCESS' as const;
export const POST_BOOKMARK_FAILURE = 'POST_BOOKMARK_FAILURE' as const;

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
export const postBookmarkRequest = ()=>{
    return {
        type: POST_BOOKMARK_REQUEST,
    }
}

export const postBookmarkSuccess = (newBookmark:BookmarkInfo)=>{
    return {
        type:POST_BOOKMARK_SUCCESS,
        bookmarkInfo: newBookmark
    }
}

export const postBookmarkFailure = ()=>{
    return {
        type: POST_BOOKMARK_FAILURE
    }
}
export const postBookmark = (id:number):BookmarkListThunkAction => async (dispatch) =>{
    try { 
        console.log(id);
        dispatch(postBookmarkRequest());
        const res = await axios.post(`${Config.server}/bookmark`, 
        JSON.stringify({
            // TODO: id 변경
            placeId: id
        }), {headers: {"Content-Type": `application/json`}});
        if (res.status === 200) {
            console.log("bookmark Posting OK");
            console.log(res.data.data)
            dispatch(postBookmarkSuccess({
                "bookmarkId": res.data.data.bookmarkId,
                "placeId": id,
                "placeName": res.data.data.placeName,
        }))
        }
    } catch (err) {
        if (err.response.status === 400 ) {
            return alert("이미 추가한 장소입니다");
        }
        console.log(err);
    }
    

}


export const getBookmarkList = ():BookmarkListThunkAction=> async (dispatch)=>{
    dispatch(getBookmarkListRequest());
// TODO: 서버 api로부터 받아오기, axios
    axios.get(`${Config.server}/bookmark`).then(res => {
        console.log(res.data);
        dispatch(
            getBookmarkListSuccess(res.data.result))    
    }).catch(err => {console.log(err.response)});
    
}



export type BookmarkListThunkAction = ThunkAction<void, RootReducer, undefined, BookmarkListActions>;
export type TypeBookmarkListDispatch = ThunkDispatch<RootReducer, undefined, BookmarkListActions>;
export type BookmarkListActions = 
    | ReturnType<typeof getBookmarkListRequest> 
    | ReturnType<typeof getBookmarkListSuccess>
    | ReturnType<typeof getBookmarkListFailure>
    | ReturnType<typeof postBookmarkRequest>
    | ReturnType<typeof postBookmarkSuccess>
    | ReturnType<typeof postBookmarkFailure>;
