import axios from "axios";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AreaMarkerInfo } from "../@types/AreaMarkerInfo";
import { RootReducer } from "../store";
import { Config } from "../config";

export const GET_AREAMARKER_LIST_REQUEST = 'GET_AREAMARKER_LIST_REQUEST' as const;
export const GET_AREAMARKER_LIST_SUCCESS = 'GET_AREAMARKER_LIST_SUCCESS' as const;
export const GET_AREAMARKER_LIST_FAILURE = 'GET_AREAMARKER_LIST_FAILURE' as const;

export const getAreaMarkerListRequest = ()=>{
    return {
        type:GET_AREAMARKER_LIST_REQUEST,
    }
}

export const getAreaMarkerListSuccess = (list:AreaMarkerInfo[])=>{
    return {
        type:GET_AREAMARKER_LIST_SUCCESS,
        list
    }
}

export const getAreaMarkerListFailure = ()=>{
    return {
        type:GET_AREAMARKER_LIST_FAILURE
    }
}

export const getAreaMarkerList = ():AreaMarkerListThunkAction=> async (dispatch)=>{
    dispatch(getAreaMarkerListRequest());
    await axios.get(`${Config.server}/area`).then(res => {
        console.log("This is the result:", res.data.result);
        dispatch(
            getAreaMarkerListSuccess(res.data.result))
    }).catch(err => {console.log(err.response)});
}


export type AreaMarkerListThunkAction = ThunkAction<void, RootReducer, undefined, AreaMarkerListActions>;
export type TypeAreaMarkerListDispatch = ThunkDispatch<RootReducer, undefined, AreaMarkerListActions>;
export type AreaMarkerListActions =
    | ReturnType<typeof getAreaMarkerListRequest>
    | ReturnType<typeof getAreaMarkerListSuccess>
    | ReturnType<typeof getAreaMarkerListFailure>;
