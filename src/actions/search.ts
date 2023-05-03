import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { BookmarkInfo } from "../@types/BookmarkInfo";
import { RootReducer } from "../store";
import { sleep } from "../utils/utils";

export const GET_SEARCH_REQUEST = 'GET_SEARCH_REQUEST' as const;
export const GET_SEARCH_SUCCESS = 'GET_SEARCH_SUCCESS' as const;
export const GET_SEARCH_FAILURE = 'GET_SEARCH_FAILURE' as const;

export const getSearchRequest = ()=>{
    return {
        type:GET_SEARCH_REQUEST,
    }
}
export const getSearchSuccess = (list:BookmarkInfo[])=>{

    return {
        type:GET_SEARCH_SUCCESS,
        list
    }
}

export const getSearchFailure = ()=>{
    return {
        type:GET_SEARCH_FAILURE
    }
}


export const getSearch = ():SearchThunkAction=> async (dispatch)=>{
    dispatch(getSearchRequest());
// TODO: 서버 api로부터 받아오기, axios
    await sleep(2000)
    dispatch(
        getSearchSuccess([
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



export type SearchThunkAction = ThunkAction<void, RootReducer, undefined, SearchActions>;
export type TypeSearchDispatch = ThunkDispatch<RootReducer, undefined, SearchActions>;
export type SearchActions = 
    | ReturnType<typeof getSearchRequest> 
    | ReturnType<typeof getSearchSuccess>
    | ReturnType<typeof getSearchFailure>;
