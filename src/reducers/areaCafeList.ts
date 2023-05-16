import { AreaCafeInfo } from "../@types/AreaCafeInfo"
import { AreaCafeListActions, GET_AREACAFE_LIST_SUCCESS } from "../actions/areaCafe"


export type TypeAreaCafeListReducer ={
    areaCafeList: AreaCafeInfo[]
}
const defaultAreaCafeListState: TypeAreaCafeListReducer = {
    areaCafeList:[]
}

export const areaCafeListReducer = (state:TypeAreaCafeListReducer = defaultAreaCafeListState, action: AreaCafeListActions)=>{
    switch(action.type){
        case GET_AREACAFE_LIST_SUCCESS:{
            return {
                ...state,
                areaCafeList: action.list
            }
        }
    }

    return {
        ...state,
    }
}
