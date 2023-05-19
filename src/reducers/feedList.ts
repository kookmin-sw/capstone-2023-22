import { FeedInfo } from "../@types/FeedInfo"
import { CREATE_FEED_SUCCESS, FAVORITE_FEED_SUCCESS, FeedListActions, GET_FEED_LIST_SUCCESS, DELETE_FAVORITE_FEED_SUCCESS, GET_MY_FEED_LIST_SUCCESS, GET_MY_FAVORITE_LIST_SUCCESS} from "../actions/feed"

export type TypeFeedListReducer ={
    list:FeedInfo[];
    myFeedList:FeedInfo[];
    myFavoriteList:FeedInfo[];
}
const defaultFeedListState:TypeFeedListReducer = {
    list:[],
    myFeedList:[],
    myFavoriteList:[]
}

export const feedListReducer = (state:TypeFeedListReducer = defaultFeedListState, action:FeedListActions)=>{

    switch(action.type){
        case GET_FEED_LIST_SUCCESS:{
            return {
                ...state,
                list:action.list,
            }
        }
        // TODO: 뒤로 넘어가는 문제 발생 -> 당연 로직 변경을 생각
        case CREATE_FEED_SUCCESS:{
            return {
                ...state,
                list: [...state.list, action.item]
            }
        }

        case FAVORITE_FEED_SUCCESS:{
                return {
                    ...state,
                    list:state.list.map((item)=>{
                        if(item.id === action.feedId){
                            return {
                                ...item,
                                heartCount:item.heartCount+1,
                                isHeart: true
                            }
                        }
                        return {
                            ...item
                        }
                    })
                }
            
        }

        case DELETE_FAVORITE_FEED_SUCCESS:{
            return {
                ...state,
                list:state.list.map((item)=>{
                    if(item.id === action.feedId){
                        return {
                            ...item,
                            heartCount:item.heartCount-1,
                            isHeart: false
                        }
                    }
                    return {
                        ...item
                    }
                })
            }
        }
        case GET_MY_FEED_LIST_SUCCESS:{
            return {
                ...state,
                myFeedList: action.list
            }
        }
        case GET_MY_FAVORITE_LIST_SUCCESS:{
            return {
                ...state,
                myFavoriteList: action.list
            }
        }
    }

    return {
        ...state,
    }
}