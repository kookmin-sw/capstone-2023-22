import { AreaCultureInfo } from "../@types/AreaCultureInfo"
import { AreaCultureListActions, GET_AREACULTURE_LIST_SUCCESS } from "../actions/areaCulture"


export type TypeAreaCultureListReducer ={
    areaCultureList: AreaCultureInfo[]
}
const defaultAreaCultureListState: TypeAreaCultureListReducer = {
    areaCultureList:[]
}

export const areaCultureListReducer = (state:TypeAreaCultureListReducer = defaultAreaCultureListState, action: AreaCultureListActions)=>{
    switch(action.type){
        case GET_AREACULTURE_LIST_SUCCESS:{
            return {
                ...state,
                areaCultureList: action.list
            }
        }
    }

    return {
        ...state,
    }
}
