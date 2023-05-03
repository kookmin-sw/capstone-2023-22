
import { useSelector } from "react-redux";
import { RootReducer } from "../store";
import { PlaceInfo } from "../@types/PlaceInfo";

export const useSearchResult = () => useSelector<RootReducer, PlaceInfo[]>((state)=>{
    return state.search.searchResult;
})

// keyword:string;
// searchResult:PlaceInfo[];
// popularArea:PlaceInfo[];
// wordCloud:string;