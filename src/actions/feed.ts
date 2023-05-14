import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { FeedInfo } from "../@types/FeedInfo";
import { RootReducer } from "../store";
import { sleep } from "../utils/utils";
import axios from "axios";
import { Config } from "../config";

const BASE_URL = 'http://127.0.0.1:8080' 

export const GET_FEED_LIST_REQUEST = 'GET_FEED_LIST_REQUEST' as const;
export const GET_FEED_LIST_SUCCESS = 'GET_FEED_LIST_SUCCESS' as const;
export const GET_FEED_LIST_FAILURE = 'GET_FEED_LIST_FAILURE' as const;

export const CREATE_FEED_REQUEST = 'CREATE_FEED_REQUEST' as const;
export const CREATE_FEED_SUCCESS = 'CREATE_FEED_SUCCESS' as const;
export const CREATE_FEED_FAILURE = 'CREATE_FEED_FAILURE' as const;


export const FAVORITE_FEED_REQUEST = 'FAVORITE_FEED_REQUEST' as const;
export const FAVORITE_FEED_SUCCESS = 'FAVORITE_FEED_SUCCESS' as const;
export const FAVORITE_FEED_FAILURE = 'FAVORITE_FEED_FAILURE' as const;

export const getFeedListRequest = ()=>{
    return {
        type:GET_FEED_LIST_REQUEST,
    }
}
export const getFeedListSuccess = (list:FeedInfo[])=>{

    return {
        type:GET_FEED_LIST_SUCCESS,
        list
    }
}

export const getFeedListFailure = ()=>{
    return {
        type:GET_FEED_LIST_FAILURE
    }
}

export const createFeedRequest = ()=>{
    return {
        type: CREATE_FEED_REQUEST,
    }
}

export const createFeedSuccess = (item:FeedInfo)=>{
    return {
        type:CREATE_FEED_SUCCESS,
        item:item
    }
}

export const createFeedFailure = ()=>{
    return {
        type: CREATE_FEED_FAILURE
    }
}

export const favoriteFeedRequest = ()=>{
    return {
        type:FAVORITE_FEED_REQUEST
    }
}
export const favoriteFeedSuccess = (feedId:FeedInfo['id'])=>{
    return {
        type:FAVORITE_FEED_SUCCESS,
        feedId,
    }
}

export const favoriteFeedFailure = ()=>{
    return {
        type:FAVORITE_FEED_FAILURE
    }
}

export const getFeedList = ():FeedListThunkAction=> async (dispatch)=>{
    dispatch(getFeedListRequest());
    axios.get(`${Config.server}/posts`).then(res => {
        console.log(res.data.data.feeds);
        // TODO: 피드 좋아요 상태 조회 추가 
        // const feedList:FeedInfo[] = res.data.data.feeds;
        // const feedsWithLike:FeedInfo[] = feedList.map(f => {
        //     axios.get(`${Config.server}/posts/${f.id}/heart`)
        //     .then(res_like => {return res_like.data.data})
        //     .catch(err_like => console.log(err_like));
        //     return 
        // });
        // console.log(feedsWithLike);
        dispatch(
            getFeedListSuccess(res.data.data.feeds))    
    }).catch(err => {console.log(err.response)});
    
}

export const createFeed = (item:Omit<FeedInfo, 'id'|'writer'|'likeCount'>):FeedListThunkAction => async (dispatch, getState)=>{
    dispatch(createFeedRequest());

    await sleep(2000);
    dispatch(createFeedSuccess({
        id:'ID_001',
        content:item.content,
        writer:getState().userInfo.userInfo?.name ||'Unkown Wirter',
        writerImg: item.writerImg,
        imageUrl:item.imageUrl,
        likeCount:0,
    }));
}

export const favoriteFeed = (item:FeedInfo):FeedListThunkAction => async (dispatch)=>{
    dispatch(favoriteFeedRequest());

    await sleep(2000);

    dispatch(favoriteFeedSuccess(item.id))
}


export type FeedListThunkAction = ThunkAction<void, RootReducer, undefined, FeedListActions>;
export type TypeFeedListDispatch = ThunkDispatch<RootReducer, undefined, FeedListActions>;
export type FeedListActions = 
    | ReturnType<typeof getFeedListSuccess> 
    | ReturnType<typeof getFeedListRequest>
    | ReturnType<typeof getFeedListFailure>
    | ReturnType<typeof createFeedRequest>
    | ReturnType<typeof createFeedSuccess>
    | ReturnType<typeof createFeedFailure>
    | ReturnType<typeof favoriteFeedRequest>
    | ReturnType<typeof favoriteFeedSuccess>
    | ReturnType<typeof favoriteFeedFailure>
