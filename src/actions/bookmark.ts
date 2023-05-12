import axios from "axios";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { BookmarkInfo } from "../@types/BookmarkInfo";
import { RootReducer } from "../store";
import qs from 'qs';
import { sleep } from "../utils/utils";

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
        axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNCIsInJvbGUiOiJST0xFX1VTRVIiLCJpc3MiOiJkZWJyYWlucyIsImV4cCI6MTY4NjMzMjIwM30.miHHbQyHEHcSGNcnN65hjCoIUpfjOuHUkpYW9qq9VH7f_JJcYdQSnv_PUA1r9FUUdNc5xIGMN3mOPzTw1IqnWg`;
        const res = await axios.post('http://127.0.0.1:8080/bookmark', 
        JSON.stringify({
            id: 325016,
            type: 'cafe'
        }), {headers: {"Content-Type": `application/json`}});
        if (res.status == 200) {
            console.log("bookmark Posting OK");
            console.log(res.data.data)
            dispatch(postBookmarkSuccess({
                "bookmarkId": res.data.data.id,
                "placeId": 325016,
                "placeName":res.data.data.placeName
        }))
        }
    } catch(err) {
        console.log(err.response);
    }
    

}


export const getBookmarkList = ():BookmarkListThunkAction=> async (dispatch)=>{
    dispatch(getBookmarkListRequest());
// TODO: 서버 api로부터 받아오기, axios
    axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNCIsInJvbGUiOiJST0xFX1VTRVIiLCJpc3MiOiJkZWJyYWlucyIsImV4cCI6MTY4NjMzMjIwM30.miHHbQyHEHcSGNcnN65hjCoIUpfjOuHUkpYW9qq9VH7f_JJcYdQSnv_PUA1r9FUUdNc5xIGMN3mOPzTw1IqnWg`;
    axios.get('http://127.0.0.1:8080/bookmark').then(res => {
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
