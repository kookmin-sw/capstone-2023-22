import axios from "axios";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AreaCultureInfo } from "../@types/AreaCultureInfo";
import { RootReducer } from "../store";
import { Config } from "../config";

export const GET_AREACULTURE_LIST_REQUEST = 'GET_AREACULTURE_LIST_REQUEST' as const;
export const GET_AREACULTURE_LIST_SUCCESS = 'GET_AREACULTURE_LIST_SUCCESS' as const;
export const GET_AREACULTURE_LIST_FAILURE = 'GET_AREACULTURE_LIST_FAILURE' as const;

export const getAreaCultureListRequest = ()=>{
    return {
        type:GET_AREACULTURE_LIST_REQUEST,
    }
}

export const getAreaCultureListSuccess = (list:AreaCultureInfo[])=>{
    return {
        type:GET_AREACULTURE_LIST_SUCCESS,
        list
    }
}

export const getAreaCultureListFailure = ()=>{
    return {
        type:GET_AREACULTURE_LIST_FAILURE
    }
}

export const getAreaCultureList = (areaNum: number):AreaCultureListThunkAction=> async (dispatch)=>{
    dispatch(getAreaCultureListRequest());
    await axios.get(`${Config.server}/area/${areaNum}/culture`).then(res => {
        dispatch(
            getAreaCultureListSuccess(res.data.result));
            console.log("HERE:", res.data.result)
    }).catch(err => {console.log(err.response)});
}


export type AreaCultureListThunkAction = ThunkAction<void, RootReducer, undefined, AreaCultureListActions>;
export type TypeAreaCultureListDispatch = ThunkDispatch<RootReducer, undefined, AreaCultureListActions>;
export type AreaCultureListActions =
    | ReturnType<typeof getAreaCultureListRequest>
    | ReturnType<typeof getAreaCultureListSuccess>
    | ReturnType<typeof getAreaCultureListFailure>;
