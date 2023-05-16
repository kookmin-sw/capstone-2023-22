import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { FeedInfo } from "../@types/FeedInfo";
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
export const GET_MY_FEED_LIST_REQUEST = 'GET_MY_FEED_LIST_REQUEST' as const;
export const GET_MY_FEED_LIST_SUCCESS = 'GET_MY_FEED_LIST_SUCCESS' as const;
export const GET_MY_FEED_LIST_FAILURE = 'GET_MY_FEED_LIST_FAILURE' as const;
export const GET_MY_FAVORITE_LIST_REQUEST = 'GET_MY_FAVORITE_LIST_REQUEST' as const;
export const GET_MY_FAVORITE_LIST_SUCCESS = 'GET_MY_FAVORITE_LIST_SUCCESS' as const;
export const GET_MY_FAVORITE_LIST_FAILURE = 'GET_MY_FAVORITE_LIST_FAILURE' as const;

export const setUserInfo = (userInfo:UserInfo)=>{
    return {
        type: SET_USER_INFO,
        userInfo
    }
}

export const getMyFeedListRequest = ()=>{
    return {
        type:GET_MY_FEED_LIST_REQUEST
    }
}

export const getMyFeedListSuccess = (list:FeedInfo[])=>{
    return {
        type:GET_MY_FEED_LIST_SUCCESS,
        list
    }
}

export const getMyFeedListFailure = ()=>{

    return {
        type: GET_MY_FEED_LIST_FAILURE
    }
}
export const getMyFavoriteListRequest = ()=>{
    return {
        type:GET_MY_FAVORITE_LIST_REQUEST
    }
}

export const getMyFavoriteListSuccess = (list:FeedInfo[])=>{
    return {
        type:GET_MY_FAVORITE_LIST_SUCCESS,
        list
    }
}

export const getMyFavoriteListFailure = ()=>{

    return {
        type: GET_MY_FAVORITE_LIST_FAILURE
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
    AsyncStorage.getItem('@token').then(async (token) => {
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

export const getMyFeedList = ():UserThunkAction => async (dispatch)=>{
    dispatch(getMyFeedListRequest());
    await axios.get(`${Config.server}/posts/my-posts`)
    .then((res) => {
        dispatch(getMyFeedListSuccess(res.data.data.feeds));
    }).catch(err =>{
        console.log(err);
    });

    // dispatch(getMyFeedListSuccess([
    //     {
    //         id:'ID_01',
    //         content:'CONTENT_01',
    //         writer:'WRITER_01',
    //         writerImg:'https://docs.expo.dev/static/images/tutorial/background-image.png',
    //         likeCount:10,
    //         imageUrl:'https://docs.expo.dev/static/images/tutorial/background-image.png',
    //     },{
    //         id:'ID_02',
    //         content:'CONTENT_02',
    //         writer:'WRITER_02',
    //         writerImg:'https://docs.expo.dev/static/images/tutorial/background-image.png',
    //         likeCount:10,
    //         imageUrl:'https://docs.expo.dev/static/images/tutorial/background-image.png',
    //     },{
    //         id:'ID_03',
    //         content:'CONTENT_03',
    //         writer:'WRITER_03',
    //         writerImg:'https://docs.expo.dev/static/images/tutorial/background-image.png',
    //         likeCount:10,
    //         imageUrl:'https://docs.expo.dev/static/images/tutorial/background-image.png',
    //     }]
    // ))
}
export const getMyFavoriteList = ():UserThunkAction => async (dispatch)=>{
    dispatch(getMyFavoriteListRequest());

    await sleep(2000);
    dispatch(getMyFavoriteListSuccess([
        {
            id:'ID_01',
            content:'CONTENT_01',
            writer:'WRITER_01',
            writerImg:'https://docs.expo.dev/static/images/tutorial/splash.png',
            likeCount:10,
            imageUrl:'https://mlops-models-bucket.s3.ap-northeast-2.amazonaws.com/wordcloud/%EC%97%AC%EC%9D%98%EB%8F%84/%EC%97%AC%EC%9D%98%EB%8F%84.jpg',
        },{
            id:'ID_02',
            content:'CONTENT_02',
            writer:'WRITER_02',
            writerImg:'https://docs.expo.dev/static/images/tutorial/splash.png',
            likeCount:10,
            imageUrl:'https://docs.expo.dev/static/images/tutorial/splash.png',
        },{
            id:'ID_03',
            content:'CONTENT_03',
            writer:'WRITER_03',
            writerImg:'https://docs.expo.dev/static/images/tutorial/splash.png',
            likeCount:10,
            imageUrl:'https://docs.expo.dev/static/images/tutorial/splash.png',
        }]
    ))
}




export type UserThunkAction = ThunkAction<Promise<void>, RootReducer, undefined, UserInfoActions>;
export type TypeUserDispatch = ThunkDispatch<RootReducer, undefined, UserInfoActions>;
export type UserInfoActions =
    | ReturnType<typeof setUserInfo>
    | ReturnType<typeof getMyFeedListRequest>
    | ReturnType<typeof getMyFeedListSuccess>
    | ReturnType<typeof getMyFeedListFailure>
    | ReturnType<typeof getMyFavoriteListRequest>
    | ReturnType<typeof getMyFavoriteListSuccess>
    | ReturnType<typeof getMyFavoriteListFailure>
    | ReturnType<typeof updateNickname>
    | ReturnType<typeof updateBirth>;
