import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { UserInfo } from "../@types/UserInfo";
import { RootReducer } from "../store";
import { sleep } from "../utils/utils";
import dayjs from "dayjs";
import axios from "axios";
import { Config } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SET_USER_INFO = 'SET_USER_INFO' as const;
export const UPDATE_USER_NICKNAME = 'UPDATE_USER_NICKNAME' as const;
export const UPDATE_USER_BIRTH = 'UPDATE_USER_BIRTH' as const;

export const setUserInfo = (userInfo:UserInfo)=>{
    return {
        type: SET_USER_INFO,
        userInfo
    }
}


export const updateNickname = (payload:string) => {
    return {
        type: UPDATE_USER_NICKNAME,
        payload
    }
}

export const updateUserNickname = (nickname:string):UserThunkAction => async (dispatch) => {
    console.log(nickname);
    axios.interceptors.request.clear();
    axios.put(`${Config.server}/user/username`,JSON.stringify({
        userName:nickname
    }),{
        headers:
        {
            "Content-Type":"application/json"
        }
    }).then(res => console.log(res.data)).catch(err => console.log(err))
    dispatch(updateNickname(nickname))
}

export const updateBirth = (payload:string) => {
    return {
        type: UPDATE_USER_BIRTH,
        payload
    }
}

export const updateUserBirth = (birth:string):UserThunkAction => async (dispatch) => {
    console.log(birth);
    dispatch(updateBirth(birth));
}

export const signIn = ():UserThunkAction => async (dispatch)=>{
    await sleep(1000);

    dispatch(
        setUserInfo({
            id:'TEST',
            name:'TEST_NAME',
            profileImage:'PROFILE',
            birth: dayjs().format('YY-MM-DD')
        })
    )
}
export const getUserInfo = ():UserThunkAction => async (dispatch)=>{
    AsyncStorage.getItem('@token').then(async () => {
    await axios.get(`${Config.server}/user`)
    .then((res) => {
        dispatch(setUserInfo({
            id: res.data.data.userId,
            name: res.data.data.userName,
            profileImage: res.data.data.profileImage,
            birth: "23-05-01"
        }));
    }).catch(err =>{
        console.log(err);
    });
    }).catch(err => console.log(err));
}






export type UserThunkAction = ThunkAction<Promise<void>, RootReducer, undefined, UserInfoActions>;
export type TypeUserDispatch = ThunkDispatch<RootReducer, undefined, UserInfoActions>;
export type UserInfoActions =
    | ReturnType<typeof setUserInfo>
    | ReturnType<typeof updateNickname>
    | ReturnType<typeof updateBirth>;
