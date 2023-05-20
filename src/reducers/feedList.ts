import { FeedInfo } from "../@types/FeedInfo"
import { CREATE_FEED_SUCCESS, FAVORITE_FEED_SUCCESS, FeedListActions, GET_FEED_LIST_SUCCESS, DELETE_FAVORITE_FEED_SUCCESS, GET_MY_FEED_LIST_SUCCESS, GET_MY_FAVORITE_LIST_SUCCESS} from "../actions/feed"

export type TypeFeedListReducer ={
    list:FeedInfo[];
    count:number;
    hasNext:boolean;
    myFeedList:FeedInfo[];
    myFavoriteList:FeedInfo[];
}
const defaultFeedListState:TypeFeedListReducer = {
    list:[],
    count:0,
    hasNext:true,
    myFeedList:[],
    myFavoriteList:[]
}

export const feedListReducer = (state:TypeFeedListReducer = defaultFeedListState, action:FeedListActions)=>{

    switch(action.type){
        case GET_FEED_LIST_SUCCESS:{
            if (action.isRefresh) {
                if (action.count < 5){
                    return {
                        ...state,
                        list: action.list,
                        count: 0,
                        hasNext: false
                    }
                }
                return {
                    ...state,
                    list: action.list,
                    count: action.count,
                    hasNext: true
                }
            }
            else if (action.count < 5){
                return {
                    ...state,
                    list:state.list.concat(action.list),
                    count: 0,
                    hasNext:false
                }
            }
            return {
                ...state,
                list: state.list.concat(action.list),
                count: state.count+action.count,
                hasNext:true
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
            if (action.feedtype === 'feed') {
                console.log(`------------reducer-----------`)
                return {
                    ...state,
                    list: state.list.map((item) => {
                        if (item.id === action.feedId){
                            return {
                                ...item,
                                heartCount: item.heartCount+1,
                                isHeart: true
                            }
                        }
                        return {
                            ...item
                        }
                    })
                }
            }
            else if (action.feedtype === 'mylist') {
                return {
                    ...state,
                    myFeedList: state.myFeedList.map((item) => {
                        if (item.id === action.feedId){
                            return {
                                ...item,
                                heartCount: item.heartCount+1,
                                isHeart: true
                            }
                        }
                        return {
                            ...item
                        }
                    })
                }
            }
            else if (action.feedtype === 'myfavorite') {
                return {
                    ...state,
                    myFavoriteList: state.myFavoriteList.map((item) => {
                        if (item.id === action.feedId){
                            return {
                                ...item,
                                heartCount: item.heartCount+1,
                                isHeart: true
                            }
                        }
                        return {
                            ...item
                        }
                    })
                }
            }
            return {
                ...state
            }
        }

        case GET_MY_FAVORITE_LIST_SUCCESS:{
            return {
                ...state,
                myFavoriteList:action.list
            }
        }
        case DELETE_FAVORITE_FEED_SUCCESS:{
            if (action.feedtype === 'feed') {
                return {
                    ...state,
                    list: state.list.map((item) => {
                        if (item.id === action.feedId){
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
            else if (action.feedtype === 'mylist') {
                return {
                    ...state,
                    myFeedList: state.myFeedList.map((item) => {
                        if (item.id === action.feedId){
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
            else if (action.feedtype === 'myfavorite') {
                return {
                    ...state,
                    myFavoriteList: state.myFavoriteList.map((item) => {
                        if (item.id === action.feedId){
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
            return {
                ...state
            }

        }
        case GET_MY_FEED_LIST_SUCCESS:{
            return {
                ...state,
                myFeedList: action.list
            }
        }
    }
    return {
            ...state,
    }
    
}