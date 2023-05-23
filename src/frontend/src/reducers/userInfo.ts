import { UserInfo } from "../@types/UserInfo";
import { SET_USER_INFO, UPDATE_USER_BIRTH, UPDATE_USER_NICKNAME, UserInfoActions } from "../actions/user"

export type typeUserInfoReducer = {
    userInfo:UserInfo | null;
}
const defaultUserInfoState:typeUserInfoReducer = {
    userInfo: null
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