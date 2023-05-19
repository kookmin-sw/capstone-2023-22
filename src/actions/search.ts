import axios from "axios";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Config } from "../config";
import { RootReducer } from "../store";
import { PlaceInfo } from "../@types/PlaceInfo";

export const GET_SEARCH_REQUEST = 'GET_SEARCH_REQUEST' as const;
export const GET_SEARCH_SUCCESS = 'GET_SEARCH_SUCCESS' as const;
export const GET_SEARCH_FAILURE = 'GET_SEARCH_FAILURE' as const;

export const CHANGE_SEARCH_KEYWORD_REQUEST = 'CHANGE_SEARCH_KEYWORD_REQUEST' as const;
export const CHANGE_SEARCH_KEYWORD_SUCCESS = 'CHANGE_SEARCH_KEYWORD_SUCCESS' as const;
export const CHANGE_SEARCH_KEYWORD_FAILURE = 'CHANGE_SEARCH_KEYWORD_FAILURE' as const;

export const GET_WORDCLOUD_REQUEST = 'GET_WORDCLOUD_REQUEST' as const;
export const GET_WORDCLOUD_SUCCESS = 'GET_WORDCLOUD_SUCCESS' as const;
export const GET_WORDCLOUD_FAILURE = 'GET_WORDCLOUD_FAILURE' as const;

export const getSearchRequest = ()=>{
    return {
        type:GET_SEARCH_REQUEST,
    }
}
export const getSearchSuccess = (list:PlaceInfo[])=>{

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

export const changeSearchKeywordRequest = ()=>{
    return {
        type:CHANGE_SEARCH_KEYWORD_REQUEST,
    }
}
export const changeSearchKeywordSuccess = (keyword:string)=>{

    return {
        type:CHANGE_SEARCH_KEYWORD_SUCCESS,
        keyword
    }
}

export const changeSearchKeywordFailure = ()=>{
    return {
        type:CHANGE_SEARCH_KEYWORD_FAILURE
    }
}

export const changeSearchKeyword = (keyword:string):SearchThunkAction=> async (dispatch)=>{
    dispatch(changeSearchKeywordRequest());
    dispatch(changeSearchKeywordSuccess(keyword));
}

export const getSearch = (keyword:string):SearchThunkAction=> async (dispatch)=>{
    dispatch(getSearchRequest());
    console.log(keyword);
// TODO: 서버 api로부터 받아오기, axios
    axios.get(`${Config.server}/place?keyword=${keyword}`).then(res => {
        console.log(res.data.result);
        dispatch(getSearchSuccess(res.data.result))
    }).catch(err => console.log(err));
}

export const getWordcloudRequest = ()=>{
    return {
        type:GET_WORDCLOUD_REQUEST,
    }
}
export const getWordcloudSuccess = (uri:string)=>{

    return {
        type:GET_WORDCLOUD_SUCCESS,
        uri
    }
}

export const getWordcloudFailure = ()=>{
    return {
        type:GET_WORDCLOUD_FAILURE
    }
}

export type SearchThunkAction = ThunkAction<void, RootReducer, undefined, SearchActions>;
export type TypeSearchDispatch = ThunkDispatch<RootReducer, undefined, SearchActions>;
export type SearchActions = 
    | ReturnType<typeof getSearchRequest> 
    | ReturnType<typeof getSearchSuccess>
    | ReturnType<typeof getSearchFailure>
    | ReturnType<typeof getWordcloudRequest> 
    | ReturnType<typeof getWordcloudSuccess>
    | ReturnType<typeof getWordcloudFailure>
    | ReturnType<typeof changeSearchKeywordRequest> 
    | ReturnType<typeof changeSearchKeywordSuccess>
    | ReturnType<typeof changeSearchKeywordFailure>;
