import { AreaMarkerInfo } from "../@types/AreaMarkerInfo"
import { AreaMarkerListActions, GET_AREAMARKER_LIST_SUCCESS } from "../actions/areaMarker"


export type TypeAreaMarkerListReducer ={
    areaMarkerList: AreaMarkerInfo[]
}
const defaultAreaMarkerListState: TypeAreaMarkerListReducer = {
    areaMarkerList:[]
}

export const areaMarkerListReducer = (state:TypeAreaMarkerListReducer = defaultAreaMarkerListState, action: AreaMarkerListActions)=>{
    switch(action.type){
        case GET_AREAMARKER_LIST_SUCCESS:{
            return {
                ...state,
                areaMarkerList: action.list
            }
        }
    }

    return {
        ...state,
    }
}
