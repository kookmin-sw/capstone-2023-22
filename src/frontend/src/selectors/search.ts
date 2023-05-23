
import { useSelector } from "react-redux";
import { RootReducer } from "../store";
import { PlaceInfo } from "../@types/PlaceInfo";

export const useSearchResult = () => useSelector<RootReducer, PlaceInfo[]>((state)=>{
    return state.search.searchResult;
})
export const useSearchKeyword = () => useSelector<RootReducer, string>((state)=>{
    return state.search.keyword;
})
export const useWordCloudUri = () => useSelector<RootReducer, string>((state)=>{
    return state.search.wordCloud;
})
export const useAreaRanking = () => useSelector<RootReducer, string>((state)=>{
    return state.search.popularArea;
})

// keyword:string;
// searchResult:PlaceInfo[];
// popularArea:PlaceInfo[];
// wordCloud:string;