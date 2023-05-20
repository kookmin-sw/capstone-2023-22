import { AreaInfo } from "../@types/AreaInfo";
import { PlaceInfo } from "../@types/PlaceInfo";
import { GET_SEARCH_SUCCESS, CHANGE_SEARCH_KEYWORD_SUCCESS, SearchActions, GET_WORDCLOUD_SUCCESS, GET_AREA_RANKING_SUCCESS } from "../actions/search";
import { Config } from "../config";

export type TypeSearchReducer = {
    keyword:string;
    searchResult:PlaceInfo[];
    popularArea:AreaInfo[];
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
        case GET_WORDCLOUD_SUCCESS:{
            return {
                ...state,
                wordCloud:`${Config.wordcloudBaseUrl}`+ action.uri + '/' + action.uri +'.jpg'
            }
        }
        case GET_AREA_RANKING_SUCCESS:{
            return {
                ...state,
                popularArea: action.ranking
            }
        }
    }
    return {
        ...state,
    }
}