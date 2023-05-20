import { useSelector } from "react-redux";
import { FeedInfo } from "../@types/FeedInfo";
import { RootReducer } from "../store";

export const useTotalFeedList = () => useSelector<RootReducer, FeedInfo[]>((state)=> state.feedList.list)
export const useFeedCount = () => useSelector<RootReducer, number>((state)=> state.feedList.count)
export const useHasNext = () => useSelector<RootReducer, number>((state)=> state.feedList.hasNext)
export const useSelectedFeed = (feedId:number) => useSelector<RootReducer, FeedInfo>((state)=> {
    const found = state.feedList.list.find(item => item.id === feedId);
    if (found === undefined){
        return <FeedInfo>{};
    }
    return found;
})
export const useMyFeedList = () => useSelector<RootReducer, FeedInfo[]>((state)=>{
    return state.feedList.myFeedList;
})
export const useSelectedMyFeedList = (id:number) => useSelector<RootReducer, FeedInfo|undefined>((state)=>{{
    return state.feedList.myFeedList.find(item => item.id === id);
}})

export const useMyFavoriteList = () => useSelector<RootReducer, FeedInfo[]>((state)=>{
    return state.feedList.myFavoriteList;
})

export const useSelectedMyFavoriteList = (id:number) => useSelector<RootReducer, FeedInfo>((state)=>{
    {   const found = state.feedList.myFavoriteList.find(item => item.id === id);
        if (found === undefined){
            return <FeedInfo>{};
        }
        return found;
    }
})