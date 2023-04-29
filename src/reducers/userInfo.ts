import { FeedInfo } from "../@types/FeedInfo";
import { UserInfo } from "../@types/UserInfo";
import { GET_MY_FAVORITE_LIST_SUCCESS, GET_MY_FEED_LIST_SUCCESS, SET_USER_INFO, UPDATE_USER_BIRTH, UPDATE_USER_NICKNAME, UserInfoActions } from "../actions/user"

export type typeUserInfoReducer = {
    userInfo:UserInfo | null;
    myFeedList:FeedInfo[];
    myFavoriteList:FeedInfo[];
}
const defaultUserInfoState:typeUserInfoReducer = {
    userInfo: null,
    myFeedList:[],
    myFavoriteList:[]
}
//{uid:string, name:string, profileImage:string}
export const userInfoReducer = (state:typeUserInfoReducer = defaultUserInfoState, action: UserInfoActions)=>{
    switch(action.type){
        case SET_USER_INFO:{
            return {
                ...state,
                userInfo: action.userInfo
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
        case UPDATE_USER_NICKNAME: {
            return {
                ...state,
                userInfo:{
                    ...state.userInfo,
                    name: action.payload
                }
            }
        }
        case UPDATE_USER_BIRTH: {
            return {
                ...state,
                userInfo:{
                    ...state.userInfo,
                    birth: action.payload
                }
            }
        }
    }
    return {
        ...state,
    }
}