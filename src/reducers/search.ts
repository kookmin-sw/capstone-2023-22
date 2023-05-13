import { PlaceInfo } from "../@types/PlaceInfo";
import { GET_SEARCH_SUCCESS, CHANGE_SEARCH_KEYWORD_SUCCESS, SearchActions } from "../actions/search";

export type TypeSearchReducer = {
    keyword:string;
    searchResult:PlaceInfo[];
    popularArea:PlaceInfo[];
    wordCloud:string;
}
const defaultSearchState:TypeSearchReducer = {
    keyword: "",
    searchResult:[],
    popularArea:[],
    wordCloud:"",
}
//{uid:string, name:string, profileImage:string}
export const searchReducer = (state:TypeSearchReducer = defaultSearchState, action: SearchActions)=>{
    switch(action.type){
        case GET_SEARCH_SUCCESS:{
            return {
                ...state,
                searchResult: action.list
            }
        }
        case CHANGE_SEARCH_KEYWORD_SUCCESS:{
            return {
                ...state,
                keword: action.keyword
            }
        }
    }
    return {
        ...state,
    }
}