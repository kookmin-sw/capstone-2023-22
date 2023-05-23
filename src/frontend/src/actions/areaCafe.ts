import axios from "axios";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AreaCafeInfo } from "../@types/AreaCafeInfo";
import { RootReducer } from "../store";
import { Config } from "../config";

export const GET_AREACAFE_LIST_REQUEST = 'GET_AREACAFE_LIST_REQUEST' as const;
export const GET_AREACAFE_LIST_SUCCESS = 'GET_AREACAFE_LIST_SUCCESS' as const;
export const GET_AREACAFE_LIST_FAILURE = 'GET_AREACAFE_LIST_FAILURE' as const;

export const getAreaCafeListRequest = ()=>{
    return {
        type: GET_AREACAFE_LIST_REQUEST,
    }
}

export const getAreaCafeListSuccess = (list:AreaCafeInfo[])=>{
    return {
        type: GET_AREACAFE_LIST_SUCCESS,
        list
    }
}

export const getAreaCafeListFailure = ()=>{
    return {
        type:GET_AREACAFE_LIST_FAILURE
    }
}

export const getAreaCafeList = (areaNum: number):AreaCafeListThunkAction=> async (dispatch)=>{
    dispatch(getAreaCafeListRequest());
    await axios.get(`${Config.server}/area/${areaNum}/cafe`).then(res => {
        dispatch(
            getAreaCafeListSuccess(res.data.result));
            console.log("HERE:", res.data.result)
    }).catch(err => {console.log(err.response)});
}


export type AreaCafeListThunkAction = ThunkAction<void, RootReducer, undefined, AreaCafeListActions>;
export type TypeAreaCafeListDispatch = ThunkDispatch<RootReducer, undefined, AreaCafeListActions>;
export type AreaCafeListActions =
    | ReturnType<typeof getAreaCafeListRequest>
    | ReturnType<typeof getAreaCafeListSuccess>
    | ReturnType<typeof getAreaCafeListFailure>;
